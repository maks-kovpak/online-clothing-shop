import { Form, Skeleton, Row, Col } from 'antd';
import { Input, Button } from '@/ui';
import useClientReady from '@/lib/hooks/useClientReady';
import { isFormValid } from '@/lib/utils';
import { useUnit } from 'effector-react';
import $user from '@/stores/user.store';
import { useState } from 'react';

import './index.scss';

const UserProfileFormSkeleton = () => {
  return <Skeleton paragraph={{ rows: 4 }} avatar active />;
};

const UserProfileForm = () => {
  const [form] = Form.useForm();
  const ready = useClientReady();
  const user = useUnit($user);
  const [readonlyMode, setReadonlyMode] = useState<boolean>(true);

  return (
    <div className="user-profile-form-wrapper">
      {!user ? (
        <UserProfileFormSkeleton />
      ) : (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" initialValue={user?.name} label="Name" validateFirst>
                <Input autoComplete="name" readOnly={readonlyMode} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="username" initialValue={user?.username} label="Username" validateFirst>
                <Input autoComplete="username" readOnly={readonlyMode} prefix={'@'} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="email" initialValue={user?.email} label="Email" validateFirst>
            <Input autoComplete="email" readOnly={readonlyMode} />
          </Form.Item>

          <Form.Item className="submit-button-field" shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={!readonlyMode && (!ready || isFormValid(form))}
                onClick={() => setReadonlyMode(!readonlyMode)}
              >
                Edit Profile
              </Button>
            )}
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default UserProfileForm;
