import axios from '@/lib/api/axios';
import type { IClothingStyle } from '@server/models/ClothingStyles';

const ClothingStylesApi = {
  getAll: async () => {
    return await axios.get<IClothingStyle[]>(`/clothing-styles`);
  },
};

export default ClothingStylesApi;
