import Marquee from 'react-fast-marquee';
import './index.scss';

const logos = Object.values(
  import.meta.glob('@/assets/img/main/brands-logos/*', {
    eager: true,
    as: 'url',
  })
);

const LogosCarousel = () => {
  return (
    <Marquee autoFill={true}>
      {logos.map((img) => (
        <img src={img} alt="" key={img} />
      ))}
    </Marquee>
  );
};

export default LogosCarousel;
