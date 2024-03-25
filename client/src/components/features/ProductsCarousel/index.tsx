import { type FC } from 'react';
import type { FullProduct } from '@server/lib/types/models';
import ProductCard from '@/components/features/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';

import 'swiper/css';
import ProductCardSkeleton from '@/components/features/ProductCardSkeleton';

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
    <Swiper className="products-carousel-skeleton" {...swiperOptions}>
      {Array.from({ length: 4 }, (_, idx) => (
        <SwiperSlide key={idx}>
          <ProductCardSkeleton />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const ProductsCarousel: FC<{ products: FullProduct[] | undefined; pending?: boolean }> = ({ products, pending }) => {
  if (pending || products === undefined) return <ProductsCarouselSkeleton />;

  return (
    <Swiper className="products-carousel" {...swiperOptions}>
      {products.map((product) => (
        <SwiperSlide key={product._id.toString()}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductsCarousel;
