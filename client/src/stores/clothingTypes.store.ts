import { createEffect, createStore } from 'effector';
import ClothingTypesApi from '@/lib/api/clothingTypes';
import type { IClothingType } from '@server/models/ClothingTypes';

export type ClothingTypesStore = IClothingType[];

/* Effects */

export const fetchClothingTypesFx = createEffect(async () => {
  const response = await ClothingTypesApi.getAll();
  return response.data;
});

/* Store */

const $clothingTypes = createStore<ClothingTypesStore>([]);

$clothingTypes.on(fetchClothingTypesFx.doneData, (_, fetchedTypes) => {
  return fetchedTypes;
});

export default $clothingTypes;
