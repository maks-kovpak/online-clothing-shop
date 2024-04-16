import Cookies from 'js-cookie';
import CartApi from '@/lib/api/cart';
import { createStore, createEffect, createEvent } from 'effector';
import type { Cart, CartItemPayload } from '@server/lib/types/models';

const userId = Cookies.get('user-id');

/* Effects */

export const fetchCartFx = createEffect(async () => {
  if (!userId) return null;

  const response = await CartApi.getAll(userId);
  return response.data;
});

export const addToCartFx = createEffect<CartItemPayload, Cart | null>(async (payload) => {
  if (!userId) return null;

  const response = await CartApi.addNewItem(userId, payload);
  return response.data;
});

/* Events */

export const removeFromCartEvent = createEvent<CartItemPayload>();
export const updateCartItemCountEvent = createEvent<CartItemPayload>();
export const clearCartEvent = createEvent();

/* Stores */

export const $cart = createStore<Cart | null>(null);

$cart.on(fetchCartFx.doneData, (_, fetchedCart) => fetchedCart);
$cart.on(addToCartFx.doneData, (_, fetchedCart) => fetchedCart);

$cart.on(removeFromCartEvent, (state, payload) => {
  if (!state) return null;

  return state.filter((item) => {
    return (
      item.productOptionId !== payload.productOptionId || item.count !== payload.count || item.size !== payload.size
    );
  });
});

$cart.on(updateCartItemCountEvent, (state, payload) => {
  if (!state) return null;

  const idx = state.findIndex((item) => item.productOptionId === payload.productOptionId && item.size === payload.size);
  return state.map((item, i) => (i === idx ? { ...item, count: payload.count } : item));
});

$cart.on(clearCartEvent, () => []);

/* Watching changes */

removeFromCartEvent.watch(async (payload) => {
  if (!userId) return null;
  await CartApi.removeItem(userId, payload);
});

updateCartItemCountEvent.watch(async (payload) => {
  if (!userId) return null;
  await CartApi.updateItemCount(userId, payload);
});

clearCartEvent.watch(async () => {
  if (!userId) return null;
  await CartApi.clearCart(userId);
});

$cart.watch((state) => console.log(state));
