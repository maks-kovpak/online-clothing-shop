import { createEffect, createStore } from 'effector';
import ClothingTypesApi from '@/lib/api/clothingTypes';
import ClothingStylesApi from '@/lib/api/clothingStyles';
import type { IClothingType } from '@server/models/ClothingTypes';
import type { IClothingStyle } from '@server/models/ClothingStyles';

/* Effects */

export const fetchClothingTypesFx = createEffect(async () => {
  const response = await ClothingTypesApi.getAll();
  return response.data;
});

export const fetchClothingStylesFx = createEffect(async () => {
  const response = await ClothingStylesApi.getAll();
  return response.data;
});

/* Stores */

export const $clothingTypes = createStore<IClothingType[]>([]);

$clothingTypes.on(fetchClothingTypesFx.doneData, (_, fetchedTypes) => {
  return fetchedTypes;
});

export const $clothingStyles = createStore<IClothingStyle[]>([]);

$clothingStyles.on(fetchClothingStylesFx.doneData, (_, fetchedStyles) => {
  return fetchedStyles;
});
