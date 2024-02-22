import type { FC, ReactElement } from 'react';
import MetaTags from '@/components/features/MetaTags';
import authBannerImage from '@/assets/img/auth-page/auth-page-bnr.webp';
import { useTranslation } from 'react-i18next';

import './index.scss';

const AuthPageLayout: FC<{
  pageTitle: string;
  pageDescription: string;
  form: ReactElement;
}> = ({ pageTitle, pageDescription, form }) => {
  const { t } = useTranslation();

  return (
    <>
      <MetaTags
        title={`${t(pageTitle)} | SHOP.CO`}
        description={t(pageDescription)}
        imagePath="/opengraph/og-image-main.webp"
      />

      <main>
        <section className="user-auth-section">
          <div className="bnr-image">
            <img src={authBannerImage} alt="" />
          </div>

          <div className="form auth-form">
            <div className="inner">{form}</div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AuthPageLayout;
