import { Form, Skeleton, Flex, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@/ui';
import UploadImage from '@/components/features/UploadImage';
import { isFormValid } from '@/lib/utils';
import { useUnit } from 'effector-react';
import $user, { resetUserEvent } from '@/stores/user.store';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useClientReady, useValidationRules } from '@/lib/hooks';
import { UserRole } from '@server/lib/types/models';
import UserApi from '@/lib/api/user';
import paths from '@/lib/paths';

import './index.scss';

const UserProfileFormSkeleton = () => {
  return <Skeleton paragraph={{ rows: 4 }} avatar active />;
};

const UserProfileForm = () => {
  const [form] = Form.useForm();
  const ready = useClientReady();
  const [user, resetUser] = useUnit([$user, resetUserEvent]);
  const [readonlyMode, setReadonlyMode] = useState<boolean>(true);
  const { t } = useTranslation();
  const { rules: validationRules } = useValidationRules();
  const navigate = useNavigate();

  return (
    <div className="user-profile-form-wrapper">
      {!user ? (
        <UserProfileFormSkeleton />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false}>
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
              <Form.Item
                name="name"
                initialValue={user.name}
                label={t('NAME')}
                rules={validationRules.requiredField}
                validateFirst
              >
                <Input autoComplete="name" readOnly={readonlyMode} />
              </Form.Item>

              <Form.Item
                name="username"
                initialValue={user.username}
                label={t('USERNAME')}
                rules={validationRules.username}
                validateFirst
              >
                <Input autoComplete="username" readOnly={readonlyMode} prefix="@" />
              </Form.Item>
            </div>
          </Flex>

          <Form.Item
            name="email"
            initialValue={user.email}
            label={t('EMAIL')}
            rules={validationRules.email}
            validateFirst
          >
            <Input autoComplete="email" readOnly={readonlyMode} />
          </Form.Item>

          <Flex justify="end" gap={16}>
            <Form.Item className="submit-button-field">
              <Button
                type="primary"
                onClick={() => {
                  UserApi.logout();
                  resetUser();
                  navigate(paths.main);
                }}
                danger={true}
              >
                {t('LOGOUT')}
              </Button>
            </Form.Item>

            <Form.Item className="submit-button-field" shouldUpdate>
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
          </Flex>
        </Form>
      )}
    </div>
  );
};

export default UserProfileForm;
