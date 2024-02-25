import AuthPageLayout from '@/components/features/AuthPageLayout';
import { Form, type FormRule } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input } from '@/ui';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { PASSWORD_PATTERN } from '@/lib/constants/regex';

import loginBannerImage from '@/assets/img/login-page/page-bnr.webp';

const LoginForm = () => {
  const { t } = useTranslation();

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

  return (
    <Form layout="vertical">
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

      <Form.Item className="submit-button-field">
        <Button type="primary" htmlType="submit" size="large">
          {t('LOG_IN')}
        </Button>
      </Form.Item>

      <NavLink to={''} className="underlined-link">
        {t('FORGOT_PASSWORD')}
      </NavLink>
    </Form>
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
