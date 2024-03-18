import AuthPageLayout from '@/components/features/AuthPageLayout';
import { Flex, Form } from 'antd';
import { Button, Input } from '@/ui';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import paths from '@/lib/paths';
import { formNotValid, resolve } from '@/lib/utils';
import { useClientReady, useLoadingMessage, useValidationRules } from '@/lib/hooks';
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

  const { rules: validationRules, confirmPassword, checkIfEmailExists } = useValidationRules();

  const onFinish = async (values: RegistrationFormValues) => {
    await loadAction(async () => {
      const randomId = (Math.random() + 1).toString(36).substring(7);

      const response = await UserApi.register({
        name: values.name,
        username: kebabCase(values.name) + '-' + randomId,
        email: values.email,
        password: values.password,
        role: UserRole.CLIENT,
      });

      if (response.status == 201) {
        updateUser(response.data.user);
        setTimeout(() => navigate(paths.main), 1000);
      }
    });
  };

  return (
    <>
      {contextHolder}

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" rules={validationRules.requiredField} validateFirst>
          <Input placeholder={t('YOUR_NAME')} autoComplete="name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[...validationRules.email, checkIfEmailExists]}
          validateDebounce={1000}
          validateFirst
        >
          <Input placeholder={t('YOUR_EMAIL')} autoComplete="email" />
        </Form.Item>

        <Form.Item name="password" rules={validationRules.password} validateFirst>
          <Input.Password placeholder={t('YOUR_PASSWORD')} autoComplete="new-password" />
        </Form.Item>

        <Form.Item name="repeatPassword" rules={[...validationRules.password, confirmPassword]} validateFirst>
          <Input.Password placeholder={t('REPEAT_PASSWORD')} autoComplete="new-password" />
        </Form.Item>

        <Form.Item className="submit-button-field" shouldUpdate>
          {() => (
            <Button type="primary" htmlType="submit" size="large" disabled={!ready || formNotValid(form)}>
              {t('SIGN_UP')}
            </Button>
          )}
        </Form.Item>

        <Form.Item className="google-signup-button-field">
          <NavLink to={resolve(import.meta.env.VITE_API_URL, '/api/auth/google')}>
            <Button type="default" size="large" icon={<GoogleLogo width={24} height={24} />}>
              {t('SIGN_IN_WITH_GOOGLE')}
            </Button>
          </NavLink>
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
