import axios from '@/lib/api/axios';
import type { ClothingTypesQueryParams } from '@server/lib/types/models';
import type { IClothingType } from '@server/models/ClothingTypes';

const ClothingTypesApi = {
  getAll: async (filters?: ClothingTypesQueryParams) => {
    const searchParams = new URLSearchParams(filters).toString();
    return await axios.get<IClothingType[]>(`/clothing-types?${searchParams}`);
  },
};

export default ClothingTypesApi;
