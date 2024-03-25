import { useTranslation } from 'react-i18next';
import { Flex, Skeleton } from 'antd';
import { Button } from '@/ui';
import CommentsApi from '@/lib/api/comments';
import Comment from '@/components/features/Comment';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Virtual } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import { useQuery } from '@tanstack/react-query';

import ArrowIcon from '@/assets/icons/arrow.svg?react';

import 'swiper/scss';
import 'swiper/scss/navigation';

import './index.scss';

const swiperOptions: SwiperOptions = {
  spaceBetween: 16,
  navigation: {
    prevEl: '.left-arrow',
    nextEl: '.right-arrow',
  },
  modules: [Autoplay, Navigation, Virtual],
  breakpoints: {
    992: { slidesPerView: 3 },
    576: { slidesPerView: 2 },
    0: { slidesPerView: 1 },
  },
  loop: true,
  autoplay: { delay: 3000 },
};

const CommentsCarouselSkeleton = () => {
  return (
    <Swiper className="comments-carousel" {...swiperOptions}>
      {Array.from({ length: 3 }, (_, idx) => (
        <SwiperSlide key={idx}>
          <Skeleton className="comment" paragraph={{ rows: 4 }} active />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const CustomersFeedbacks = () => {
  const { t } = useTranslation();

  const { isPending, data: comments } = useQuery({
    queryKey: ['customersFeedbacks'],
    queryFn: async () => {
      const response = await CommentsApi.getAll({
        sortBy: 'createdAt',
        sortOrder: 'descending',
        limit: '12',
        rating: '5',
      });

      return response.data;
    },
  });

  return (
    <section className="primary-section customer-feedbacks-section">
      <Flex align="center" justify="space-between" className="section-title">
        <h2>{t('OUR_HAPPY_CUSTOMERS')}</h2>

        <Flex align="center" gap={5} className="carousel-arrows">
          <Button className="left-arrow" type="text">
            <ArrowIcon style={{ rotate: '-180deg' }} />
          </Button>

          <Button className="right-arrow" type="text">
            <ArrowIcon />
          </Button>
        </Flex>
      </Flex>

      {isPending || !comments ? (
        <CommentsCarouselSkeleton />
      ) : (
        <Swiper className="comments-carousel" {...swiperOptions}>
          {comments.map((item) => (
            <SwiperSlide key={item._id.toString()}>
              <Comment comment={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default CustomersFeedbacks;
