import join from 'url-join';
import { useState } from 'react';
import { Flex, Skeleton } from 'antd';
import { UPLOAD_URL } from '@/lib/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';
import type { FullProduct } from '@server/lib/types/models';
import type { FC, ReactNode } from 'react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import './index.scss';

const BaseGalleryCarousel: FC<{ children: ReactNode }> = ({ children }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <Flex className="product-images-gallery-carousel" gap={14}>
      <Swiper
        onSwiper={(sw) => setThumbsSwiper(sw)}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        direction="vertical"
        className="thumbnails-slider"
      >
        {children}
      </Swiper>

      <Swiper
        loop={true}
        spaceBetween={14}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        direction="vertical"
        className="main-image-slider"
      >
        {children}
      </Swiper>
    </Flex>
  );
};

export const ProductImagesGallery: FC<{ productOption: FullProduct['options'][number] }> = ({ productOption }) => {
  return (
    <BaseGalleryCarousel>
      {productOption.images.map((image) => (
        <SwiperSlide key={image}>
          <img src={join(UPLOAD_URL, image)} />
        </SwiperSlide>
      ))}
    </BaseGalleryCarousel>
  );
};

export const ProductImagesGallerySkeleton = () => {
  return (
    <BaseGalleryCarousel>
      {Array.from({ length: 4 }).map((_, idx) => (
        <SwiperSlide key={idx}>
          <Skeleton.Image active />
        </SwiperSlide>
      ))}
    </BaseGalleryCarousel>
  );
};
