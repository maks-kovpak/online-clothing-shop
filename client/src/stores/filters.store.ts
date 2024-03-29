import { createEvent, createStore } from 'effector';
import { DEFAULT_MAX_PRICE } from '@/lib/constants';

export type FiltersType = {
  price: [number, number];
  colors: string[];
  styles: string[];
};

/* Events */

export const updateFiltersEvent = createEvent<Partial<FiltersType>>();
export const resetFiltersEvent = createEvent();

/* Stores */

const $filters = createStore<FiltersType>({
  price: [0, DEFAULT_MAX_PRICE],
  colors: [],
  styles: [],
});

$filters.on(updateFiltersEvent, (state, otherFilters) => {
  return { ...state, ...otherFilters };
});

$filters.reset(resetFiltersEvent);

$filters.watch((state) => console.log(state));

export default $filters;
