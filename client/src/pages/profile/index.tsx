import { useTranslation } from 'react-i18next';
import MetaTags from '@/components/features/MetaTags';
import UserProfileForm from './containers/UserProfileForm';

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
        <UserProfileForm />
      </main>
    </>
  );
};

export default ProfilePage;
