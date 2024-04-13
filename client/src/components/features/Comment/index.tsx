import type { FC } from 'react';
import type { FullComment } from '@server/lib/types/models';
import { Flex } from 'antd';
import { Rate } from '@/ui';
import { LANGUAGES } from '@/lib/constants/languages';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import ApprovedIcon from '@/assets/icons/approved.svg?react';
import './index.scss';

const Comment: FC<{
  comment: FullComment;
  withPublicationDate?: boolean;
}> = ({ comment, withPublicationDate }) => {
  const { i18n } = useTranslation();

  const currentLocale = useMemo(() => {
    const lang = LANGUAGES.find((item) => item.code === i18n.language);
    return lang && lang.code + '-' + lang.region;
  }, [i18n.language]);

  return (
    <Flex className="comment" justify="space-between" vertical>
      <div>
        <Rate defaultValue={comment.rating} disabled />

        <Flex gap="0.375rem" align="center" className="author">
          <h4 className="secondary">{comment.author}</h4>
          <ApprovedIcon />
        </Flex>

        <p className="comment-text">{comment.text}</p>
      </div>

      {withPublicationDate && (
        <span className="publication-date">
          {new Date(comment.createdAt).toLocaleDateString(currentLocale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      )}
    </Flex>
  );
};

export default Comment;
