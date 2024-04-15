import { $cart } from '@/stores/cart.store';
import { Button, Divider, Flex } from 'antd';
import { useUnit } from 'effector-react';
import { sum } from 'lodash';
import { useMemo } from 'react';

import './index.scss';
import { useTranslation } from 'react-i18next';

const deliveryFee = 75;

const OrderSummary = () => {
  const { t } = useTranslation();
  const cart = useUnit($cart);

  const initialTotalPrice = useMemo(() => sum(cart?.map((item) => item.initialPrice)), [cart]);
  const currentTotalPrice = useMemo(() => sum(cart?.map((item) => item.price)), [cart]);

  return (
    <div className="order-summary">
      <h3 className="secondary">{t('ORDER_SUMMARY')}</h3>

      <Flex className="summary-field subtotal" justify="space-between" align="center">
        <span>{t('SUBTOTAL')}</span>
        <span>₴{initialTotalPrice}</span>
      </Flex>

      <Flex className="summary-field discount" justify="space-between" align="center">
        <span>{t('DISCOUNT')}</span>
        <span>-₴{initialTotalPrice - currentTotalPrice}</span>
      </Flex>

      <Flex className="summary-field delivery-fee" justify="space-between" align="center">
        <span>{t('DELIVERY_FEE')}</span>
        <span>₴{deliveryFee}</span>
      </Flex>

      <Divider />

      <Flex className="summary-field total" justify="space-between" align="center">
        <span>{t('TOTAL')}</span>
        <span>₴{currentTotalPrice + deliveryFee}</span>
      </Flex>

      <Button type="primary" size="large" className="complete-order-button">
        {t('COMPLETE_ORDER')}
      </Button>
    </div>
  );
};

export default OrderSummary;
