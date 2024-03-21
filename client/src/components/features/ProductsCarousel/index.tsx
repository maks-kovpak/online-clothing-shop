import { type FC } from 'react';
import type { FullProduct } from '@server/lib/types/models';
import ProductCard from '@/components/features/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

const ProductsCarousel: FC<{ products: FullProduct[] }> = ({ products }) => {
  return (
    <Swiper
      className="products-carousel"
      spaceBetween={16}
      breakpoints={{
        1200: { slidesPerView: 4 },
        992: { slidesPerView: 3.25 },
        576: { slidesPerView: 2.25 },
        0: { slidesPerView: 1.25 },
      }}
      centeredSlidesBounds={true}
    >
      {products.map((product) => (
        <SwiperSlide key={product._id.toString()}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductsCarousel;
