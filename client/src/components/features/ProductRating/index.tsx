import { Flex } from 'antd';
import { Rate } from '@/ui';
import type { FC } from 'react';

import './index.scss';

const ProductRating: FC<{ value?: number | null }> = ({ value }) => {
  return (
    <Flex gap="0.5rem" align="center" className="product-rating">
      <Rate defaultValue={value ?? 5} allowHalf disabled />
      <span className="rating-value">
        <span style={{ color: 'black' }}>{value ?? 5}</span>/5
      </span>
    </Flex>
  );
};

export default ProductRating;
