import { Flex } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';
import MetaTags from '@/components/features/MetaTags';
import UserProfileSidebar from './containers/UserProfileSidebar';
import UserProfileForm from './containers/UserProfileForm';
import Breadcrumbs from '@/components/features/Breadcrumbs';
import $user, { fetchUserProfileFx } from '@/stores/user.store';
import NotFoundPage from '../notFound';

import './index.scss';

const ProfilePage = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string | null>(null);
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const [user, pending] = useUnit([$user, fetchUserProfileFx.pending]);

  if (!pending && !user) return <NotFoundPage />;

  return (
    <>
      <MetaTags title={`SHOP.CO | ${t('PROFILE_PAGE_TITLE')}`} description={t('PROFILE_PAGE_DESCRIPTION')} />

      <main>
        <section className="primary-section breadcrumbs-section">
          <Flex justify="space-between" wrap="wrap" gap="0.5rem">
            <Breadcrumbs />
            {user && (
              <p className="welcome-user">
                {t('WELCOME')}, <span style={{ fontWeight: 600 }}>{user?.name}</span>
              </p>
            )}
          </Flex>
        </section>

        <section className="primary-section user-profile-form-section">
          <Flex gap={32} justify="space-between" align="center" className="section-title">
            <h2>{t(title ?? 'PROFILE')}</h2>
            <Link className="underlined-link" to="" onClick={() => setDrawerOpened(true)}>
              {t('GO_TO')}
            </Link>
          </Flex>

          <Flex gap={32}>
            <UserProfileSidebar
              setCurrentTitle={setTitle}
              drawerOpened={drawerOpened}
              setDrawerOpened={setDrawerOpened}
            />
            <UserProfileForm />
          </Flex>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
