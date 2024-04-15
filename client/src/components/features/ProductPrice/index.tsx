import { Flex, Tag } from 'antd';
import type { FC } from 'react';

import './index.scss';

const ProductPrice: FC<{
  value: number;
  oldPrice?: number;
  discount?: number;
}> = ({ value, oldPrice, discount }) => {
  return (
    <div className="product-price">
      {discount ? (
        <Flex gap="0.5rem" align="center">
          <p className="price">₴{value}</p>
          <p className="old-price">₴{oldPrice}</p>
          <Tag color="red">-{discount}%</Tag>
        </Flex>
      ) : (
        <p className="price">₴{value}</p>
      )}
    </div>
  );
};

export default ProductPrice;
