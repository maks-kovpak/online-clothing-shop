import Cookies from 'js-cookie';
import CartApi from '@/lib/api/cart';
import { createStore, createEffect } from 'effector';
import type { Cart, CartItemPayload } from '@server/lib/types/models';

const userId = Cookies.get('user-id');

/* Effects */

export const fetchCartFx = createEffect(async () => {
  if (!userId) return null;

  const response = await CartApi.getAll(userId);
  return response.data;
});

export const addNewItemFx = createEffect<CartItemPayload, Cart | null>(async (payload) => {
  if (!userId) return null;

  const response = await CartApi.addNewItem(userId, payload);
  return response.data;
});

export const removeItemFx = createEffect<CartItemPayload, Cart | null>(async (payload) => {
  if (!userId) return null;

  const response = await CartApi.removeItem(userId, payload);
  return response.data;
});

export const clearCartFx = createEffect(async () => {
  if (!userId) return null;

  await CartApi.clearCart(userId);
  return [];
});

/* Stores */

export const $cart = createStore<Cart | null>(null);

$cart.on(fetchCartFx.doneData, (_, fetchedCart) => fetchedCart);
$cart.on(addNewItemFx.doneData, (_, fetchedCart) => fetchedCart);
$cart.on(removeItemFx.doneData, (_, fetchedCart) => fetchedCart);
$cart.on(clearCartFx.doneData, (_, fetchedCart) => fetchedCart);
