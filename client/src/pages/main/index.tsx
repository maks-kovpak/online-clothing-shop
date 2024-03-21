import MetaTags from '@/components/features/MetaTags';
import HeroBanner from './containers/HeroBanner';
import LogosCarousel from './containers/LogosCarousel';
import DressStyleSection from './containers/DressStyleSection';
import { useTranslation } from 'react-i18next';
import NewArrivals from '@/pages/main/containers/NewArrivals';
import CustomersFeedbacks from './containers/CustomersFeedbacks';

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <MetaTags
        title={`SHOP.CO | ${t('MAIN_PAGE_TITLE')}`}
        description={t('MAIN_PAGE_DESCRIPTION')}
        imagePath="/opengraph/og-image-main.webp"
      />

      <main>
        <HeroBanner />
        <LogosCarousel />
        <NewArrivals />
        <DressStyleSection />
        <CustomersFeedbacks />
      </main>
    </>
  );
};

export default MainPage;
