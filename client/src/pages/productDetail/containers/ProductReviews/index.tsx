import CommentsApi from '@/lib/api/comments';
import Comment from '@/components/features/Comment';
import { Button, Flex, Input, Modal, Skeleton } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';
import { Rate } from '@/ui';
import { useUnit } from 'effector-react';
import $user from '@/stores/user.store';
import type { FC } from 'react';
import type { NewCommentRequestBody } from '@server/lib/types/models';

import './index.scss';

const ProductReviews: FC<{ productId: string | undefined }> = ({ productId }) => {
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const {
    data: comments,
    refetch: refetchComments,
    isPending,
  } = useQuery({
    queryKey: ['productReviews'],
    queryFn: async () => {
      if (!productId) return;

      const response = await CommentsApi.getAllForProduct(productId);
      return response.data;
    },
  });

  const user = useUnit($user);
  const userId = useMemo(() => user?._id.toString(), [user]);

  const [newComment, setNewComment] = useState<Omit<NewCommentRequestBody, 'userId'>>({
    text: '',
    rating: 1,
  });

  const addComment = useCallback(async () => {
    if (!productId || !userId) return;

    setConfirmLoading(true);
    await CommentsApi.addNewComment(productId, { ...newComment, userId });
    setConfirmLoading(false);

    setModalOpened(false);
    refetchComments();
  }, [newComment, productId, userId, refetchComments]);

  const commentsSkeleton = Array.from({ length: 2 }).map((_, idx) => (
    <Skeleton key={idx} className="comment" paragraph={{ rows: 4 }} active />
  ));

  return (
    <>
      <section className="product-reviews primary-section">
        <Flex className="reviews-title" justify="space-between">
          <h3 className="secondary">
            {t('ALL_REVIEWS')}
            {comments && <span>({comments.length})</span>}
          </h3>

          <Button type="primary" onClick={() => setModalOpened(true)}>
            {t('WRITE_REVIEW')}
          </Button>
        </Flex>

        <div className="reviews-container">
          {isPending
            ? commentsSkeleton
            : comments!.map((item) => <Comment key={item._id.toString()} comment={item} withPublicationDate />)}
        </div>
      </section>

      <Modal
        className="review-modal"
        title={t('WRITE_REVIEW')}
        open={modalOpened}
        confirmLoading={confirmLoading}
        onOk={addComment}
        onCancel={() => setModalOpened(false)}
        cancelText={t('CANCEL')}
        okText={t('OK')}
      >
        <Rate
          defaultValue={1}
          allowClear={false}
          onChange={(value) => setNewComment({ ...newComment, rating: value })}
        />

        <Input.TextArea
          showCount
          maxLength={300}
          placeholder={t('WRITE_YOUR_COMMENT_HERE')}
          style={{ height: 200, resize: 'none' }}
          onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
        ></Input.TextArea>
      </Modal>
    </>
  );
};

export default ProductReviews;
