import HeroBanner from '@/components/features/HeroBanner';
import MetaTags from '@/components/features/MetaTags';

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
