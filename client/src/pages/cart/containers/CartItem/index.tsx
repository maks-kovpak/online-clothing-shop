import join from 'url-join';
import { Button, Flex, Skeleton } from 'antd';
import { UPLOAD_URL } from '@/lib/constants';
import { InputNumber } from '@/ui';
import { useTranslation } from 'react-i18next';
import ProductPrice from '@/components/features/ProductPrice';
import type { FullCartItem } from '@server/lib/types/models';
import type { FC } from 'react';

import BinIcon from '@/assets/icons/bin.svg?react';

import './index.scss';

export const CartItemSkeleton = () => {
  return (
    <Flex className="cart-item" gap="1rem">
      <Skeleton.Image active />

      <div className="cart-item-body">
        <Skeleton paragraph={{ rows: 4 }} active />
      </div>
    </Flex>
  );
};

export const CartItem: FC<{ item: FullCartItem }> = ({ item }) => {
  const { t } = useTranslation();

  return (
    <Flex className="cart-item" gap="1rem">
      <img src={join(UPLOAD_URL, item.image)} alt={item.name} />

      <Flex className="cart-item-body" justify="space-between" vertical>
        <div>
          <Flex justify="space-between" align="center">
            <h4 className="secondary">{item.name}</h4>
            <Button type="link" className="delete-item-button">
              <BinIcon />
            </Button>
          </Flex>

          <Flex align="center" gap="0.5rem">
            <b>{t('COLOR')}:</b>
            <div className="item-color" style={{ backgroundColor: item.color }}></div>
          </Flex>

          <span>
            <b>{t('SIZE')}:</b> {item.size}
          </span>
        </div>

        <Flex justify="space-between" align="end">
          <ProductPrice value={item.price} />
          <InputNumber min={1} initialValue={item.count} />
        </Flex>
      </Flex>
    </Flex>
  );
};
