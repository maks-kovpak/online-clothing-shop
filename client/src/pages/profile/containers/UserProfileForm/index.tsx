import { Form, Skeleton } from 'antd';
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
          <Form.Item name="email" validateFirst initialValue={user?.email}>
            <Input
              autoComplete="email"
              size="middle"
              variant={readonlyMode ? 'borderless' : 'outlined'}
              readOnly={readonlyMode}
            />
          </Form.Item>

          <Form.Item className="submit-button-field" shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                size="middle"
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
