import { useUnit } from 'effector-react';
import { $cart, fetchCartFx } from '@/stores/cart.store';
import { CartItem, CartItemSkeleton } from '../CartItem';

import './index.scss';

const CartItemsList = () => {
  const [cart, pending] = useUnit([$cart, fetchCartFx.pending]);

  return (
    <div className="cart-container">
      {pending
        ? Array.from({ length: 2 }).map((_, idx) => <CartItemSkeleton key={idx} />)
        : cart?.map((item) => <CartItem key={item._id} item={item} />)}
    </div>
  );
};

export default CartItemsList;
