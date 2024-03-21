import CommentsApi from '@/lib/api/comments';
import { FullComment } from '@server/lib/types/models';
import { useEffect, useState } from 'react';
import Comment from '@/components/features/Comment';

const CustomersFeedbacks = () => {
  const [comments, setComments] = useState<FullComment[]>([]);

  useEffect(() => {
    CommentsApi.getAll({
      sortBy: 'createdAt',
      sortOrder: 'desc',
    }).then((response) => setComments(response.data));
  }, []);

  return (
    <div>
      {comments.map((item) => (
        <Comment key={item._id.toString()} comment={item} />
      ))}
    </div>
  );
};

export default CustomersFeedbacks;
