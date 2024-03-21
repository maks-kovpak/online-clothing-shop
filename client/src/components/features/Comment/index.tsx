import type { FC } from 'react';
import type { FullComment } from '@server/lib/types/models';
import { Rate } from 'antd';

const Comment: FC<{ comment: FullComment }> = ({ comment }) => {
  return (
    <div className="comment">
      <Rate defaultValue={comment.rating} disabled />
      <h4>{comment.author}</h4>
      <p>{comment.text}</p>
    </div>
  );
};

export default Comment;
