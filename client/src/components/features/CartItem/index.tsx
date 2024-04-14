import join from 'url-join';
import { Flex } from 'antd';
import { UPLOAD_URL } from '@/lib/constants';
import Color from '../Color';
import type { FullCartItem } from '@server/lib/types/models';
import type { FC } from 'react';

import './index.scss';

const CartItem: FC<{ item: FullCartItem }> = ({ item }) => {
  return (
    <Flex className="cart-item" gap="1rem">
      <img src={join(UPLOAD_URL, item.image)} alt={item.name} />

      <div className="cart-item-body">
        <h4 className="secondary">{item.name}</h4>
        <Color value={item.color} checkable={false} />
      </div>
    </Flex>
  );
};

export default CartItem;
