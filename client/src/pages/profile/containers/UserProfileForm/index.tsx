import { Form, Skeleton, Flex, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@/ui';
import UploadImage, { type FileType } from '@/components/features/UploadImage';
import { formNotValid } from '@/lib/utils';
import { useUnit } from 'effector-react';
import $user, { resetUserEvent, updateUserEvent } from '@/stores/user.store';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useClientReady, useValidationRules, useLoadingMessage } from '@/lib/hooks';
import { UserRole } from '@server/lib/enums';
import UserApi from '@/lib/api/user';
import paths from '@/lib/paths';

import './index.scss';

const UserProfileFormSkeleton = () => {
  return <Skeleton paragraph={{ rows: 4 }} avatar active />;
};

type ProfileFormValues = {
  name: string;
  username: string;
  email: string;
};

const UserProfileForm = () => {
  const [form] = Form.useForm<ProfileFormValues>();
  const ready = useClientReady();
  const [user, resetUser, updateUser] = useUnit([$user, resetUserEvent, updateUserEvent]);
  const [readonlyMode, setReadonlyMode] = useState<boolean>(true);
  const { t } = useTranslation();
  const { rules: validationRules } = useValidationRules();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<FileType | undefined>(undefined);

  useEffect(() => {
    setImageUrl(user?.profileImage);
  }, [user]);

  const { loadAction, contextHolder } = useLoadingMessage({
    key: 'login-status-message',
    loadingMessage: t('LOADING'),
    successMessage: t('PROFILE_UPDATED_SUCCESSFULLY'),
    errorMessage: t('SOMETHING_WENT_WRONG'),
  });

  const onFinish = async (values: ProfileFormValues) => {
    if (!user) return;

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, value));

    if (file) {
      formData.append('avatar', file);
    }

    await loadAction(async () => {
      const response = await UserApi.update(user._id.toString(), formData);

      if (response.status == 200) {
        updateUser(response.data.user);
      }
    });
  };

  const uploadImageField = (
    <div className="upload-image-field">
      <UploadImage
        name="avatar"
        className="avatar-uploader"
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        disabled={readonlyMode}
        setFile={setFile}
      />
    </div>
  );

  return (
    <div className="user-profile-form-wrapper">
      {contextHolder}

      {!user ? (
        <UserProfileFormSkeleton />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish} encType="multipart/form-data">
          <Flex gap={24} className="profile-image-container">
            {user.role == UserRole.ADMIN ? (
              <Badge.Ribbon text={t('ADMIN')} color="gold">
                {uploadImageField}
              </Badge.Ribbon>
            ) : (
              uploadImageField
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
            <Form.Item>
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
                  htmlType="button"
                  disabled={!ready || formNotValid(form, false)}
                  onClick={() => {
                    if (!readonlyMode) form.submit();
                    setReadonlyMode(!readonlyMode);
                  }}
                >
                  {!readonlyMode ? t('SAVE') : t('EDIT_PROFILE')}
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
