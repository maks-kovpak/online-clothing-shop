import { Flex } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MetaTags from '@/components/features/MetaTags';
import UserProfileSidebar from './containers/UserProfileSidebar';
import UserProfileForm from './containers/UserProfileForm';

import './index.scss';

const ProfilePage = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string | null>(null);

  return (
    <>
      <MetaTags
        title={`SHOP.CO | ${t('PROFILE_PAGE_TITLE')}`}
        description={t('PROFILE_PAGE_DESCRIPTION')}
        imagePath="/opengraph/og-image-main.webp"
      />

      <main>
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
