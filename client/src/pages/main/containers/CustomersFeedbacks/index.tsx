import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex } from 'antd';
import { Button } from '@/ui';
import CommentsApi from '@/lib/api/comments';
import type { FullComment } from '@server/lib/types/models';
import Comment from '@/components/features/Comment';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Virtual } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

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

const CustomersFeedbacks = () => {
  const [comments, setComments] = useState<FullComment[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    CommentsApi.getAll({
      sortBy: 'createdAt',
      sortOrder: 'descending',
      limit: '12',
      rating: '5',
    }).then((response) => setComments(response.data));
  }, []);

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

      <Swiper className="comments-carousel" {...swiperOptions}>
        {comments.map((item) => (
          <SwiperSlide key={item._id.toString()}>
            <Comment comment={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CustomersFeedbacks;
