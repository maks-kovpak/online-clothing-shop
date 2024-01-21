import HeroBanner from '@/components/HeroBanner';
import MetaTags from '@/components/MetaTags';

const MainPage = () => {
  return (
    <main>
      <MetaTags
        title="SHOP.CO | Clothes for you"
        description="Find clothes that matches your styles"
        imagePath="/opengraph/og-image-main.webp"
      />

      <HeroBanner />
    </main>
  );
};

export default MainPage;
