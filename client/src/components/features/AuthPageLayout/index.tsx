import type { FC, ReactElement } from 'react';
import MetaTags from '@/components/features/MetaTags';
import { useTranslation } from 'react-i18next';

import './index.scss';

const AuthPageLayout: FC<{
  pageTitle: string;
  pageDescription: string;
  bannerImage: string;
  form: ReactElement;
}> = ({ pageTitle, pageDescription, bannerImage, form }) => {
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
            <img src={bannerImage} alt="" />
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
