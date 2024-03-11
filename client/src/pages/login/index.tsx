import AuthPageLayout from '@/components/features/AuthPageLayout';
import type { FormRule } from 'antd';
import { Form } from 'antd';
import { Button, Input } from '@/ui';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { PASSWORD_PATTERN } from '@/lib/constants/regex';
import UserApi from '@/lib/api/user';
import { isFormValid } from '@/lib/utils';
import useClientReady from '@/lib/hooks/useClientReady';
import useLoadingMessage from '@/lib/hooks/useLoadingMessage';

import loginBannerImage from '@/assets/img/login-page/page-bnr.webp';
import paths from '@/lib/paths.ts';

type LoginFormValues = {
  email: string;
  password: string;
  [x: string]: unknown;
};

const LoginForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<LoginFormValues>();
  const ready = useClientReady();
  const navigate = useNavigate();

  const { loadAction, contextHolder } = useLoadingMessage({
    key: 'login-status-message',
    loadingMessage: t('LOADING'),
    successMessage: t('LOGIN_SUCCESSFUL'),
    errorMessage: t('SOMETHING_WENT_WRONG'),
  });

  const validationRules: Record<string, FormRule[]> = useMemo(
    () => ({
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

  const onFinish = async (values: LoginFormValues) => {
    await loadAction(async () => {
      const response = await UserApi.login({
        email: values.email,
        password: values.password,
      });

      if (response.status == 200) {
        localStorage.setItem('isAuth', 'true');
        setTimeout(() => navigate(paths.main), 1000);
      }
    });
  };

  return (
    <>
      {contextHolder}

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" rules={validationRules.email} validateFirst>
          <Input placeholder={t('YOUR_EMAIL')} autoComplete="email" />
        </Form.Item>

        <Form.Item name="password" rules={validationRules.password} validateFirst>
          <Input.Password placeholder={t('YOUR_PASSWORD')} autoComplete="current-password" />
        </Form.Item>

        <Form.Item className="submit-button-field" shouldUpdate>
          {() => (
            <Button type="primary" htmlType="submit" size="large" disabled={!ready || isFormValid(form)}>
              {t('LOG_IN')}
            </Button>
          )}
        </Form.Item>

        <NavLink to={''} className="underlined-link">
          {t('FORGOT_PASSWORD')}
        </NavLink>
      </Form>
    </>
  );
};

const LoginPage = () => {
  return (
    <AuthPageLayout
      pageTitle="LOGIN_PAGE_TITLE"
      pageDescription="LOGIN_PAGE_DESCRIPTION"
      bannerImage={loginBannerImage}
      form={<LoginForm />}
      formTitle="LOGIN_FORM_TITLE"
    />
  );
};

export default LoginPage;
