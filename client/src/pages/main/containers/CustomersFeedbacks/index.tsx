import CommentsApi from '@/lib/api/comments';
import { FullComment } from '@server/lib/types/models';
import { useEffect, useState } from 'react';
import Comment from '@/components/features/Comment';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import './index.scss';

const CustomersFeedbacks = () => {
  const [comments, setComments] = useState<FullComment[]>([]);

  useEffect(() => {
    CommentsApi.getAll({
      sortBy: 'createdAt',
      sortOrder: 'descending',
    }).then((response) => setComments(response.data));
  }, []);

  return (
    <section className="customer-feedbacks-section">
      <Swiper
        className="comments-carousel"
        spaceBetween={16}
        breakpoints={{
          992: { slidesPerView: 3.5 },
          576: { slidesPerView: 1.5 },
          0: { slidesPerView: 1 },
        }}
        centeredSlidesBounds={true}
        centeredSlides={true}
        initialSlide={2}
        loop={true}
      >
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
