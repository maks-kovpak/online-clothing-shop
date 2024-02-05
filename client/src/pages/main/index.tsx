import MetaTags from '@/components/features/MetaTags';
import HeroBanner from './containers/HeroBanner';
import LogosCarousel from './containers/LogosCarousel';
import DressStyleSection from '@/pages/main/containers/DressStyleSection';

const MainPage = () => {
  return (
    <main>
      <MetaTags
        title="SHOP.CO | Clothes for you"
        description="Find clothes that matches your styles"
        imagePath="/opengraph/og-image-main.webp"
      />
      
      <HeroBanner />
      <LogosCarousel />
      <DressStyleSection />
    </main>
  );
};

export default MainPage;
