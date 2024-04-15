import { $cart, fetchCartFx } from '@/stores/cart.store';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import Breadcrumbs from '@/components/features/Breadcrumbs';
import MetaTags from '@/components/features/MetaTags';
import { useTranslation } from 'react-i18next';
import CartItem from '@/components/features/CartItem';

import './index.scss';

const CartPage = () => {
  const { t } = useTranslation();
  const [cart, fetchCart] = useUnit([$cart, fetchCartFx]);

  useEffect(() => {
    if (cart) return;
    fetchCart();
  }, [cart, fetchCart]);

  return (
    <>
      <MetaTags title={`${t('CART_PAGE_TITLE')} | SHOP.CO`} description={t('CART_PAGE_DESCRIPTION')} />

      <main>
        <section className="primary-section breadcrumbs-section">
          <Breadcrumbs />
        </section>

        <section className="primary-section cart-section">
          <h2 className="secondary">{t('YOUR_CART')}</h2>
          <div className="cart-container">{cart?.map((item) => <CartItem key={item._id} item={item} />)}</div>
        </section>
      </main>
    </>
  );
};

export default CartPage;
