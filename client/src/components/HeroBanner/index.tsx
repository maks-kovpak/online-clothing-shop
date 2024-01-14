import bannerImage from '@/assets/img/main/main-bnr-image.png';
import './index.scss';

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="banner-content">
        <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
      </div>
      <div className="banner-image">
        <img src={bannerImage} alt="Shop.co" />
      </div>
    </section>
  );
};

export default HeroBanner;
