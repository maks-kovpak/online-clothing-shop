import { Typography } from 'antd';
import { Button } from '@/ui';
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
        <Button type="primary" size="large">
          {t('SHOP_NOW')}
        </Button>
      </div>
      <div className="banner-image">
        <img src={bannerImage} alt="Shop.co" />
      </div>
    </section>
  );
};

export default HeroBanner;
