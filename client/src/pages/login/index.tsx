import AuthPageLayout from '@/pages/auth-page-layout';
import { Form, Typography } from 'antd';
import { Input } from '@/ui';

const LoginForm = () => {
  return (
    <>
      <div className="form-text">
        <Typography.Title level={2} className="secondary">
          Create an account
        </Typography.Title>
        <p>Enter your details below</p>
      </div>

      <Form layout="vertical" autoComplete="off">
        <Form.Item name="email" validateFirst rules={[{ type: 'email', message: 'Email is not valid' }]}>
          <Input placeholder="Your email" size="large" />
        </Form.Item>
      </Form>
    </>
  );
};

const LoginPage = () => {
  return <AuthPageLayout pageTitle={'Login'} pageDescription={''} form={<LoginForm />} />;
};

export default LoginPage;
