import AuthPageLayout from '@/components/features/AuthPageLayout';
import { Form, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
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
        <Form.Item
          name="email"
          rules={[
            { type: 'email', message: 'Email is not valid' },
            { required: true, message: 'Email is required' },
          ]}
          validateFirst
        >
          <Input placeholder="Your email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { type: 'regexp', pattern: /fg/, message: 'Password does not match' },
            { required: true, message: 'Password is required' },
          ]}
          validateFirst
        >
          <Input.Password
            placeholder="Password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
      </Form>
    </>
  );
};

const LoginPage = () => {
  return <AuthPageLayout pageTitle={'Login'} pageDescription={''} form={<LoginForm />} />;
};

export default LoginPage;
