import { DEFAULT_MAX_PRICE } from '@/lib/constants';
import { FullProduct } from '@server/lib/types/models';
import { createEvent, restore } from 'effector';

/* Events */

export const setProductsEvent = createEvent<FullProduct[]>();
export const setMaxPriceEvent = createEvent<number>();

/* Stores */

export const $products = restore<FullProduct[]>(setProductsEvent, []);
export const $maxPrice = restore<number>(setMaxPriceEvent, DEFAULT_MAX_PRICE);
