import { createEvent, createStore } from 'effector';
import { DEFAULT_MAX_PRICE } from '@/lib/constants';

export type FiltersType = {
  price?: { from: number; to: number };
  colors?: string[];
  styles?: string[];
};

/* Events */

export const updateFiltersEvent = createEvent<FiltersType>();
export const resetFiltersEvent = createEvent();

/* Stores */

const $filters = createStore<FiltersType>({
  price: { from: 0, to: DEFAULT_MAX_PRICE },
  colors: [],
  styles: [],
});

$filters.on(updateFiltersEvent, (state, otherFilters) => {
  return { ...state, ...otherFilters };
});

$filters.reset(resetFiltersEvent);

export default $filters;
