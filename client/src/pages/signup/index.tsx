import AuthPageLayout from '@/components/features/AuthPageLayout';
import type { FormRule } from 'antd';
import { Flex, Form } from 'antd';
import { Button, Input } from '@/ui';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import paths from '@/lib/paths';
import { isFormValid } from '@/lib/utils';
import { PASSWORD_PATTERN } from '@/lib/constants/regex';
import useClientReady from '@/lib/hooks/useClientReady';
import useLoadingMessage from '@/lib/hooks/useLoadingMessage';
import UserApi from '@/lib/api/user';
import { UserRole } from '@server/lib/types/models';
import { kebabCase } from 'lodash';
import { useUnit } from 'effector-react';
import { updateUserEvent } from '@/stores/user.store';

import GoogleLogo from '@/assets/icons/google.svg?react';
import signupBannerImage from '@/assets/img/signup-page/page-bnr.webp';
import './index.scss';

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  [x: string]: unknown;
};

const RegistrationForm = () => {
  const { t } = useTranslation();

  const [form] = Form.useForm<RegistrationFormValues>();
  const ready = useClientReady();
  const navigate = useNavigate();
  const updateUser = useUnit(updateUserEvent);

  const { loadAction, contextHolder } = useLoadingMessage({
    key: 'signup-status-message',
    loadingMessage: t('LOADING'),
    successMessage: t('REGISTRATION_SUCCESSFUL'),
    errorMessage: t('SOMETHING_WENT_WRONG'),
  });

  const validationRules: Record<string, FormRule[]> = useMemo(
    () => ({
      name: [{ required: true, message: t('FIELD_REQUIRED') }],
      email: [
        { type: 'email', message: t('EMAIL_NOT_VALID') },
        { required: true, message: t('FIELD_REQUIRED') },
      ],
      password: [
        { pattern: PASSWORD_PATTERN, message: t('PASSWORD_NOT_VALID') },
        { required: true, message: t('FIELD_REQUIRED') },
      ],
    }),
    [t]
  );

  const onFinish = async (values: RegistrationFormValues) => {
    await loadAction(async () => {
      const response = await UserApi.register({
        name: values.name,
        username: kebabCase(values.name),
        email: values.email,
        password: values.password,
        role: UserRole.CLIENT,
      });

      if (response.status == 201) {
        localStorage.setItem('userId', response.data.user._id.toString());
        updateUser(response.data.user);
        setTimeout(() => navigate(paths.main), 1000);
      }
    });
  };

  return (
    <>
      {contextHolder}

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" rules={validationRules.name} validateFirst>
          <Input placeholder={t('YOUR_NAME')} autoComplete="name" />
        </Form.Item>

        <Form.Item name="email" rules={validationRules.email} validateFirst>
          <Input placeholder={t('YOUR_EMAIL')} autoComplete="email" />
        </Form.Item>

        <Form.Item name="password" rules={validationRules.password} validateFirst>
          <Input.Password placeholder={t('YOUR_PASSWORD')} autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          name="repeatPassword"
          rules={[
            ...validationRules.password,
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('The new password do not match!'));
              },
            }),
          ]}
          validateFirst
        >
          <Input.Password placeholder={t('REPEAT_PASSWORD')} autoComplete="new-password" />
        </Form.Item>

        <Form.Item className="submit-button-field" shouldUpdate>
          {() => (
            <Button type="primary" htmlType="submit" size="large" disabled={!ready || isFormValid(form)}>
              {t('SIGN_UP')}
            </Button>
          )}
        </Form.Item>

        <Form.Item className="google-signup-button-field">
          <Button type="default" size="large" icon={<GoogleLogo width={24} height={24} />} onClick={() => {}}>
            {t('SIGN_UP_WITH_GOOGLE')}
          </Button>
        </Form.Item>
      </Form>

      <Flex justify="space-between" gap="1rem" className="already-have-account">
        <p>{t('ALREADY_HAVE_ACCOUNT')}</p>
        <NavLink to={paths.login} className="underlined-link">
          {t('LOG_IN')}
        </NavLink>
      </Flex>
    </>
  );
};

const SignupPage = () => {
  return (
    <AuthPageLayout
      pageTitle="SIGNUP_PAGE_TITLE"
      pageDescription="SIGNUP_PAGE_DESCRIPTION"
      bannerImage={signupBannerImage}
      form={<RegistrationForm />}
      formTitle="SIGNUP_FORM_TITLE"
    />
  );
};

export default SignupPage;
