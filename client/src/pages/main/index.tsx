import MetaTags from '@/components/features/MetaTags';
import HeroBanner from './containers/HeroBanner';
import LogosCarousel from './containers/LogosCarousel';

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
    </main>
  );
};

export default MainPage;
