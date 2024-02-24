import AuthPageLayout from '@/components/features/AuthPageLayout';
import { Form, type FormRule, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input } from '@/ui';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import loginBannerImage from '@/assets/img/login-page/page-bnr.webp';
import { useMemo } from 'react';

const LoginForm = () => {
  const { t } = useTranslation();

  const validationRules: Record<string, FormRule[]> = useMemo(
    () => ({
      email: [
        { type: 'email', message: t('EMAIL_NOT_VALID') },
        { required: true, message: t('FIELD_REQUIRED') },
      ],
      password: [
        { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g, message: t('PASSWORD_NOT_VALID') },
        { required: true, message: t('FIELD_REQUIRED') },
      ],
    }),
    [t]
  );

  return (
    <>
      <div className="form-text">
        <Typography.Title level={2} className="secondary">
          {t('LOGIN_FORM_TITLE')}
        </Typography.Title>

        <p>{t('ENTER_YOUR_DETAILS_BELOW')}</p>
      </div>

      <Form layout="vertical">
        <Form.Item name="email" rules={validationRules.email} validateFirst>
          <Input placeholder={t('YOUR_EMAIL')} />
        </Form.Item>

        <Form.Item name="password" rules={validationRules.password} validateFirst>
          <Input.Password
            placeholder={t('YOUR_PASSWORD')}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item style={{ marginTop: '3rem' }}>
          <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
            {t('LOG_IN')}
          </Button>
        </Form.Item>

        <NavLink to={''} className="underlined-link">
          {t('FORGOT_PASSWORD')}
        </NavLink>
      </Form>
    </>
  );
};

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <AuthPageLayout
      pageTitle={t('LOGIN_PAGE_TITLE')}
      pageDescription={t('LOGIN_PAGE_DESCRIPTION')}
      bannerImage={loginBannerImage}
      form={<LoginForm />}
    />
  );
};

export default LoginPage;
