import type { FC } from 'react';
import type { FullComment } from '@server/lib/types/models';
import { Flex } from 'antd';
import { Rate } from '@/ui';

import ApprovedIcon from '@/assets/icons/approved.svg?react';
import './index.scss';

const Comment: FC<{ comment: FullComment }> = ({ comment }) => {
  return (
    <div className="comment">
      <Rate defaultValue={comment.rating} disabled />

      <Flex gap="0.375rem" align="center" className="author">
        <h4 className="secondary">{comment.author}</h4>
        <ApprovedIcon />
      </Flex>

      <p className="comment-text">{comment.text}</p>
    </div>
  );
};

export default Comment;
