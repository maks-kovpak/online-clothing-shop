import { useTranslation } from 'react-i18next';
import MetaTags from '@/components/features/MetaTags';
import UserProfileSidebar from './containers/UserProfileSidebar';
import UserProfileForm from './containers/UserProfileForm';

import './index.scss';

const ProfilePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <MetaTags
        title={`SHOP.CO | ${t('PROFILE_PAGE_TITLE')}`}
        description={t('PROFILE_PAGE_DESCRIPTION')}
        imagePath="/opengraph/og-image-main.webp"
      />

      <main>
        <section className="primary-section user-profile-form-section">
          <UserProfileSidebar />
          <UserProfileForm />
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
