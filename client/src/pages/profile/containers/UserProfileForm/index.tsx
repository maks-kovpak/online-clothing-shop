import { Form, Skeleton, Flex, Badge } from 'antd';
import { Input, Button } from '@/ui';
import UploadImage from '@/components/features/UploadImage';
import useClientReady from '@/lib/hooks/useClientReady';
import { isFormValid } from '@/lib/utils';
import { useUnit } from 'effector-react';
import $user from '@/stores/user.store';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserRole } from '@server/lib/types/models';

import './index.scss';

const UserProfileFormSkeleton = () => {
  return <Skeleton paragraph={{ rows: 4 }} avatar active />;
};

const UserProfileForm = () => {
  const [form] = Form.useForm();
  const ready = useClientReady();
  const user = useUnit($user);
  const [readonlyMode, setReadonlyMode] = useState<boolean>(true);
  const { t } = useTranslation();

  return (
    <div className="user-profile-form-wrapper">
      {!user ? (
        <UserProfileFormSkeleton />
      ) : (
        <Form form={form} layout="vertical">
          <Flex gap={24}>
            {user.role == UserRole.ADMIN ? (
              <Badge.Ribbon text={t('ADMIN')} color="gold">
                <div className="upload-image-field">
                  <UploadImage defaultImage={user.profileImage} />
                </div>
              </Badge.Ribbon>
            ) : (
              <div className="upload-image-field">
                <UploadImage defaultImage={user.profileImage} />
              </div>
            )}

            <div className="name-fields-container">
              <Form.Item name="name" initialValue={user.name} label={t('NAME')} validateFirst>
                <Input autoComplete="name" readOnly={readonlyMode} />
              </Form.Item>

              <Form.Item name="username" initialValue={user.username} label={t('USERNAME')} validateFirst>
                <Input autoComplete="username" readOnly={readonlyMode} prefix="@" />
              </Form.Item>
            </div>
          </Flex>

          <Form.Item name="email" initialValue={user.email} label={t('EMAIL')} validateFirst>
            <Input autoComplete="email" readOnly={readonlyMode} />
          </Form.Item>

          <Form.Item className="submit-button-field" shouldUpdate style={{ display: 'flex', justifyContent: 'end' }}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={!ready || (!readonlyMode && !isFormValid(form))}
                onClick={() => setReadonlyMode(!readonlyMode)}
              >
                {t('EDIT_PROFILE')}
              </Button>
            )}
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default UserProfileForm;
