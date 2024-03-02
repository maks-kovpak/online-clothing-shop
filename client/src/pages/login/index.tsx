import AuthPageLayout from '@/components/features/AuthPageLayout';
import type { FormRule } from 'antd';
import { Form, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input } from '@/ui';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { PASSWORD_PATTERN } from '@/lib/constants/regex';
import UserApi from '@/lib/api/user';
import { isFormValid } from '@/lib/utils';
import useClientReady from '@/lib/hooks/useClientReady';

import loginBannerImage from '@/assets/img/login-page/page-bnr.webp';

type LoginFormValues = {
  email: string;
  password: string;
  [x: string]: unknown;
};

const messageKey = 'login-status-message';

const LoginForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<LoginFormValues>();
  const [messageApi, contextHolder] = message.useMessage();
  const ready = useClientReady();

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
    try {
      messageApi.open({
        key: messageKey,
        type: 'loading',
        content: t('LOADING'),
      });

      const response = await UserApi.login({
        email: values.email,
        password: values.password,
      });

      console.log(response);

      messageApi.open({
        key: messageKey,
        type: 'success',
        content: t('LOGIN_SUCCESSFUL'),
        duration: 2,
      });
    } catch {
      messageApi.open({
        key: messageKey,
        type: 'error',
        content: t('SOMETHING_WENT_WRONG'),
        duration: 2,
      });
    }
  };

  return (
    <>
      {contextHolder}

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" rules={validationRules.email} validateFirst>
          <Input placeholder={t('YOUR_EMAIL')} autoComplete="email" />
        </Form.Item>

        <Form.Item name="password" rules={validationRules.password} validateFirst>
          <Input.Password
            placeholder={t('YOUR_PASSWORD')}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            autoComplete="current-password"
          />
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
