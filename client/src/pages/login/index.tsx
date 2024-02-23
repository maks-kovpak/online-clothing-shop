import AuthPageLayout from '@/components/features/AuthPageLayout';
import { Form, type FormRule, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input } from '@/ui';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const validationRules: { email: FormRule[]; password: FormRule[] } = {
  email: [
    { type: 'email', message: 'Email is not valid' },
    { required: true, message: 'Email is required' },
  ],
  password: [
    { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g, message: 'Password is not valid' },
    { required: true, message: 'Password is required' },
  ],
};

const LoginForm = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="form-text">
        <Typography.Title level={2} className="secondary">
          Login to your account
        </Typography.Title>
        <p>Enter your details below</p>
      </div>

      <Form layout="vertical">
        <Form.Item name="email" rules={validationRules.email} validateFirst>
          <Input placeholder="Your email" />
        </Form.Item>

        <Form.Item name="password" rules={validationRules.password} validateFirst>
          <Input.Password
            placeholder="Password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item style={{ marginTop: '3rem' }}>
          <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
            {t('LOG_IN')}
          </Button>
        </Form.Item>

        <NavLink to={''}>Forgot password?</NavLink>
      </Form>
    </>
  );
};

const LoginPage = () => {
  return <AuthPageLayout pageTitle={'Login'} pageDescription={''} form={<LoginForm />} />;
};

export default LoginPage;
