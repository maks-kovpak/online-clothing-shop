import AuthPageLayout from '@/components/features/AuthPageLayout';
import type { FormRule } from 'antd';
import { Flex, Form } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input } from '@/ui';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import paths from '@/lib/paths.ts';

import GoogleLogo from '@/assets/icons/google.svg?react';
import signupBannerImage from '@/assets/img/signup-page/page-bnr.webp';
import './index.scss';

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

        <Form.Item className="submit-button-field">
          <Button type="primary" htmlType="submit" size="large">
            {t('SIGN_UP')}
          </Button>
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
      form={<SignupForm />}
      formTitle="SIGNUP_FORM_TITLE"
    />
  );
};

export default SignupPage;
