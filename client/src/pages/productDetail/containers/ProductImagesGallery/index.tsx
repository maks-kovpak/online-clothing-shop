import { FC, useState } from 'react';
import { Flex } from 'antd';
import { UPLOAD_URL } from '@/lib/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';
import type { FullProduct } from '@server/lib/types/models';
import join from 'url-join';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import './index.scss';

const ProductImagesGallery: FC<{ productOption: FullProduct['options'][number] }> = ({ productOption }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const imagesSlides = productOption.images.map((image) => (
    <SwiperSlide key={image}>
      <img src={join(UPLOAD_URL, image)} />
    </SwiperSlide>
  ));

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
        {imagesSlides}
      </Swiper>

      <Swiper
        loop={true}
        spaceBetween={14}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        direction="vertical"
        className="main-image-slider"
      >
        {imagesSlides}
      </Swiper>
    </Flex>
  );
};

export default ProductImagesGallery;
