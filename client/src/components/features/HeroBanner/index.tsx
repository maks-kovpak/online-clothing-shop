import { Typography } from 'antd';
import { Button } from '@/ui';
import { useTranslation } from 'react-i18next';
import bannerImage from '@/assets/img/main/main-bnr-image.webp';

import './index.scss';

const HeroBanner = () => {
  const { t } = useTranslation();

  return (
    <section className="banner-wrapper">
      <div className="hero-banner">
        <div className="banner-content">
          <div>
            <Typography.Title level={1}>{t('MAIN_BANNER_TITLE').toUpperCase()}</Typography.Title>
            <Typography.Paragraph>{t('MAIN_BANNER_DESCRIPTION')}</Typography.Paragraph>

            <Button type="primary" size="large">
              {t('SHOP_NOW')}
            </Button>
          </div>

          <div className="company-info">
            <div className="info-item">
              <span className="number">200+</span>
              <p>{t('BANNER_COMPANY_INFO_1')}</p>
            </div>

            <div className="info-item">
              <span className="number">2 000+</span>
              <p>{t('BANNER_COMPANY_INFO_2')}</p>
            </div>

            <div className="info-item">
              <span className="number">30 000+</span>
              <p>{t('BANNER_COMPANY_INFO_3')}</p>
            </div>
          </div>
        </div>
        <div className="banner-image">
          <img src={bannerImage} alt="Shop.co" />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
