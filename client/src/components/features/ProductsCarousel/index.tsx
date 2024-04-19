import ProductCard from '@/components/features/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { FC } from 'react';
import type { SwiperOptions } from 'swiper/types';
import type { FullProduct } from '@server/lib/types/models';

import 'swiper/css';

const swiperOptions: SwiperOptions = {
  spaceBetween: 16,
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3.25,
    },
    576: {
      slidesPerView: 2.25,
      centeredSlidesBounds: true,
      centeredSlides: false,
    },
    0: {
      slidesPerView: 1.25,
      centeredSlidesBounds: false,
      centeredSlides: true,
    },
  },
};

const ProductsCarouselSkeleton = () => {
  return (
    <Swiper className="products-carousel" {...swiperOptions}>
      {Array.from({ length: 4 }, (_, idx) => (
        <SwiperSlide key={idx}>
          <ProductCard.Skeleton />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const ProductsCarousel: FC<{ products: FullProduct[] | undefined; pending?: boolean }> = ({ products, pending }) => {
  if (pending || !products) return <ProductsCarouselSkeleton />;

  return (
    <Swiper className="products-carousel" {...swiperOptions}>
      {products.map((product) => (
        <SwiperSlide key={product._id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductsCarousel;
