import type { FC, ReactElement } from 'react';
import MetaTags from '@/components/features/MetaTags';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

import './index.scss';

const AuthPageLayout: FC<{
  pageTitle: string;
  pageDescription: string;
  bannerImage: string;
  form: ReactElement;
  formTitle?: string;
}> = ({ pageTitle, pageDescription, bannerImage, form, formTitle }) => {
  const { t } = useTranslation();

  return (
    <>
      <MetaTags title={`${t(pageTitle)} | SHOP.CO`} description={t(pageDescription)} />

      <main>
        <section className="user-auth-section">
          <div className="bnr-image">
            <img src={bannerImage} alt="" />
          </div>

          <div className="form auth-form">
            <div className="inner">
              <div className="form-text">
                <Typography.Title level={2} className="secondary">
                  {t(formTitle ?? pageTitle)}
                </Typography.Title>

                <p>{t('ENTER_YOUR_DETAILS_BELOW')}</p>
              </div>

              {form}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AuthPageLayout;
