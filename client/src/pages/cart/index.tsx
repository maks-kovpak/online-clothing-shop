import { fetchCartFx } from '@/stores/cart.store';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

const CartPage = () => {
  const fetchCart = useUnit(fetchCartFx);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return <></>;
};

export default CartPage;
