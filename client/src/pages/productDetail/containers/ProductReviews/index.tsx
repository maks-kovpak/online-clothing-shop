import CommentsApi from '@/lib/api/comments';
import Comment from '@/components/features/Comment';
import { Button, Flex, Skeleton } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

const ProductReviews: FC<{ productId: string | undefined }> = ({ productId }) => {
  const { t } = useTranslation();

  const { data: comments, isPending } = useQuery({
    queryKey: ['productReviews'],
    queryFn: async () => {
      if (!productId) return;

      const response = await CommentsApi.getAllForProduct(productId);
      return response.data;
    },
  });

  const commentsSkeleton = Array.from({ length: 2 }).map((_, idx) => (
    <Skeleton key={idx} className="comment" paragraph={{ rows: 4 }} active />
  ));

  return (
    <section className="product-reviews primary-section">
      <Flex className="reviews-title" justify="space-between">
        <h3 className="secondary">
          {t('ALL_REVIEWS')}
          {comments && <span>({comments.length})</span>}
        </h3>

        <Button type="primary">{t('WRITE_REVIEW')}</Button>
      </Flex>

      <div className="reviews-container">
        {isPending
          ? commentsSkeleton
          : comments!.map((item) => <Comment key={item._id.toString()} comment={item} withPublicationDate />)}
      </div>
    </section>
  );
};

export default ProductReviews;
