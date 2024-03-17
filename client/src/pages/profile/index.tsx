import { Flex } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import MetaTags from '@/components/features/MetaTags';
import UserProfileSidebar from './containers/UserProfileSidebar';
import UserProfileForm from './containers/UserProfileForm';
import Breadcrumbs from '@/components/features/Breadcrumbs';
import $user from '@/stores/user.store';

import './index.scss';

const ProfilePage = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string | null>(null);
  const user = useUnit($user);

  return (
    <>
      <MetaTags
        title={`SHOP.CO | ${t('PROFILE_PAGE_TITLE')}`}
        description={t('PROFILE_PAGE_DESCRIPTION')}
        imagePath="/opengraph/og-image-main.webp"
      />

      <main>
        <section className="primary-section" style={{ marginTop: '2rem' }}>
          <Flex justify="space-between">
            <Breadcrumbs />
            {user && (
              <p>
                {t('WELCOME')}, <span style={{ fontWeight: 600 }}>{user?.name}</span>
              </p>
            )}
          </Flex>
        </section>

        <section className="primary-section user-profile-form-section">
          <h2>{t(title ?? 'PROFILE')}</h2>

          <Flex gap={32}>
            <UserProfileSidebar setCurrentTitle={setTitle} />
            <UserProfileForm />
          </Flex>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
