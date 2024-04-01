import { FullProduct } from '@server/lib/types/models';
import { createEvent, createStore } from 'effector';

/* Events */

export const setProductsEvent = createEvent<FullProduct[]>();

/* Stores */

const $products = createStore<FullProduct[]>([]);

$products.on(setProductsEvent, (_, payload) => {
  return payload;
});

export default $products;
