import { Flex } from 'antd';
import Breadcrumbs from '@/components/features/Breadcrumbs';
import MetaTags from '@/components/features/MetaTags';
import { useTranslation } from 'react-i18next';
import CartItemsList from './containers/CartItemsList';
import OrderSummary from './containers/OrderSummary';
import { useUnit } from 'effector-react';
import $user, { fetchUserProfileFx } from '@/stores/user.store';
import NotFoundPage from '../notFound';

import './index.scss';
const CartPage = () => {
  const { t } = useTranslation();
  const [user, pending] = useUnit([$user, fetchUserProfileFx.pending]);

  if (!pending && !user) return <NotFoundPage />;

  return (
    <>
      <MetaTags title={`${t('CART_PAGE_TITLE')} | SHOP.CO`} description={t('CART_PAGE_DESCRIPTION')} />

      <main>
        <section className="primary-section breadcrumbs-section">
          <Breadcrumbs />
        </section>

        <section className="primary-section cart-section">
          <h2 className="secondary">{t('YOUR_CART')}</h2>

          <Flex justify="space-between" align="start" gap="1.25rem">
            <CartItemsList />
            <OrderSummary />
          </Flex>
        </section>
      </main>
    </>
  );
};

export default CartPage;
