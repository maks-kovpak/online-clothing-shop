import AuthPageLayout from '@/components/layout/AuthPageLayout';
import { Form } from 'antd';
import { Button, Input } from '@/ui';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import { updateUserEvent } from '@/stores/user.store';
import UserApi from '@/lib/api/user';
import { formNotValid } from '@/lib/utils';
import { useClientReady, useLoadingMessage, useValidationRules } from '@/lib/hooks';
import paths from '@/lib/paths';

import loginBannerImage from '@/assets/img/login-page/page-bnr.webp';

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<LoginFormValues>();
  const ready = useClientReady();
  const navigate = useNavigate();
  const updateUser = useUnit(updateUserEvent);

  const { loadAction, contextHolder } = useLoadingMessage({
    key: 'login-status-message',
    loadingMessage: t('LOADING'),
    successMessage: t('LOGIN_SUCCESSFUL'),
    errorMessage: t('SOMETHING_WENT_WRONG'),
  });

  const { rules: validationRules } = useValidationRules();

  const onFinish = async (values: LoginFormValues) => {
    await loadAction(async () => {
      const response = await UserApi.login({
        email: values.email,
        password: values.password,
      });

      if (response.status == 200) {
        updateUser(response.data.user);
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
            <Button type="primary" htmlType="submit" size="large" disabled={!ready || formNotValid(form)}>
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
