import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import bannerImage from '@/assets/img/main/main-bnr-image.webp';

import './index.scss';

const HeroBanner = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-banner">
      <div className="banner-content">
        <Typography.Title level={1}>{t('MAIN_BANNER_TITLE').toUpperCase()}</Typography.Title>
        <Typography.Paragraph>{t('MAIN_BANNER_DESCRIPTION')}</Typography.Paragraph>
      </div>
      <div className="banner-image">
        <img src={bannerImage} alt="Shop.co" />
      </div>
    </section>
  );
};

export default HeroBanner;
