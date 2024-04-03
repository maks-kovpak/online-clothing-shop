import { createEffect, restore } from 'effector';
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

export const $clothingTypes = restore<IClothingType[]>(fetchClothingTypesFx.doneData, []);

export const $clothingStyles = restore<IClothingStyle[]>(fetchClothingStylesFx.doneData, []);
