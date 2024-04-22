import { $cart } from '@/stores/cart.store';
import { Button, Divider, Flex } from 'antd';
import { useUnit } from 'effector-react';
import { sum } from 'lodash';
import { useMemo } from 'react';
import { LANGUAGES } from '@/lib/constants/languages';
import { useTranslation } from 'react-i18next';

import './index.scss';

const deliveryFee = 75;

const OrderSummary = () => {
  const { t, i18n } = useTranslation();
  const cart = useUnit($cart);

  const currencyFormatter = useMemo(() => {
    const lang = LANGUAGES.find((item) => item.code === i18n.language);
    const locale = lang && lang.code + '-' + lang.region;

    return new Intl.NumberFormat(locale);
  }, [i18n.language]);

  const initialTotalPrice = useMemo(() => sum(cart?.map((item) => item.initialPrice * item.count)), [cart]);
  const currentTotalPrice = useMemo(() => sum(cart?.map((item) => item.price * item.count)), [cart]);

  return (
    <div className="order-summary">
      <h3 className="secondary">{t('ORDER_SUMMARY')}</h3>

      <Flex className="summary-field subtotal" justify="space-between" align="center">
        <span>{t('SUBTOTAL')}</span>
        <span>₴{currencyFormatter.format(initialTotalPrice)}</span>
      </Flex>

      <Flex className="summary-field discount" justify="space-between" align="center">
        <span>{t('DISCOUNT')}</span>
        <span>-₴{currencyFormatter.format(initialTotalPrice - currentTotalPrice)}</span>
      </Flex>

      <Flex className="summary-field delivery-fee" justify="space-between" align="center">
        <span>{t('DELIVERY_FEE')}</span>
        <span>₴{currencyFormatter.format(deliveryFee)}</span>
      </Flex>

      <Divider />

      <Flex className="summary-field total" justify="space-between" align="center">
        <span>{t('TOTAL')}</span>
        <span>₴{currencyFormatter.format(currentTotalPrice + deliveryFee)}</span>
      </Flex>

      <Button type="primary" size="large" className="complete-order-button">
        {t('COMPLETE_ORDER')}
      </Button>
    </div>
  );
};

export default OrderSummary;
