import Cookies from 'js-cookie';
import CartApi from '@/lib/api/cart';
import { createStore, createEffect, createEvent } from 'effector';
import type { Cart, CartItemPayload } from '@server/lib/types/models';

/* Effects */

export const fetchCartFx = createEffect(async () => {
  const id = Cookies.get('user-id');
  if (!id) return null;

  const response = await CartApi.getAll(id);
  return response.data;
});

/* Events */

export const addNewItemEvent = createEvent<CartItemPayload>();
export const removeItem = createEvent<CartItemPayload>();
export const clearCart = createEvent();

/* Stores */

export const $cart = createStore<Cart | null>(null);

$cart.on(fetchCartFx.doneData, (_, fetchedCart) => {
  return fetchedCart;
});
