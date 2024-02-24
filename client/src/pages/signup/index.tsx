import AuthPageLayout from '@/components/features/AuthPageLayout';
import type { FormRule } from 'antd';
import { Flex, Form, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input } from '@/ui';
import { useTranslation } from 'react-i18next';
import signupBannerImage from '@/assets/img/signup-page/page-bnr.webp';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import paths from '@/lib/paths.ts';

const SignupForm = () => {
  const { t } = useTranslation();

  const validationRules: Record<string, FormRule[]> = useMemo(
    () => ({
      name: [{ required: true, message: t('FIELD_REQUIRED') }],
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
          {t('SIGNUP_FORM_TITLE')}
        </Typography.Title>

        <p>{t('ENTER_YOUR_DETAILS_BELOW')}</p>
      </div>

      <Form layout="vertical">
        <Form.Item name="name" rules={validationRules.name} validateFirst>
          <Input placeholder={t('YOUR_NAME')} />
        </Form.Item>

        <Form.Item name="email" rules={validationRules.email} validateFirst>
          <Input placeholder={t('YOUR_EMAIL')} />
        </Form.Item>

        <Form.Item name="password" rules={validationRules.password} validateFirst>
          <Input.Password
            placeholder={t('YOUR_PASSWORD')}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item name="repeatPassword" rules={validationRules.password} validateFirst>
          <Input.Password
            placeholder={t('REPEAT_PASSWORD')}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item style={{ marginTop: '3rem' }}>
          <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
            {t('SIGN_UP')}
          </Button>
        </Form.Item>
      </Form>

      <Flex justify="space-between" gap="1rem" style={{ width: 'fit-content', margin: 'auto' }}>
        <p>Already have account?</p>
        <NavLink to={paths.login}>Log in</NavLink>
      </Flex>
    </>
  );
};

const SignupPage = () => {
  const { t } = useTranslation();

  return (
    <AuthPageLayout
      pageTitle={t('SIGNUP_PAGE_TITLE')}
      pageDescription={t('SIGNUP_PAGE_DESCRIPTION')}
      bannerImage={signupBannerImage}
      form={<SignupForm />}
    />
  );
};

export default SignupPage;
