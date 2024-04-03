import { createEvent, createStore } from 'effector';
import { DEFAULT_MAX_PRICE } from '@/lib/constants';

export type FiltersType = {
  price: [number, number];
  colors: string[];
  styles: string[];
  sizes: string[];
};

/* Events */

export const updateFiltersEvent = createEvent<Partial<FiltersType>>();
export const resetFiltersEvent = createEvent();

export const applyFiltersEvent = createEvent();

export const setFiltersTouched = createEvent<boolean>();

/* Stores */

export const $filters = createStore<FiltersType>({
  price: [0, DEFAULT_MAX_PRICE],
  colors: [],
  styles: [],
  sizes: [],
});

$filters.on(updateFiltersEvent, (state, otherFilters) => {
  return { ...state, ...otherFilters };
});

$filters.reset(resetFiltersEvent);

export const $appliedFilters = createStore<FiltersType>($filters.defaultState);

$appliedFilters.on(applyFiltersEvent, () => {
  return $filters.getState();
});

export const $filtersTouched = createStore<boolean>(false);

$filtersTouched.on(setFiltersTouched, (_, payload) => {
  return payload;
});

/* Watching changes */

$filters.watch((state) => {
  if (state !== $filters.defaultState && !$filtersTouched.getState()) {
    setFiltersTouched(true);
  }
});

$appliedFilters.watch((state) => {
  if (state !== $appliedFilters.defaultState && $filtersTouched.getState()) {
    setFiltersTouched(false);
  }
});
