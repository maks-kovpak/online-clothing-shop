import axios from '@/lib/api/axios';
import type { FullComment, FiltersQueryParams } from '@server/lib/types/models';

const ProductsApi = {
  getAll: async (filters?: FiltersQueryParams) => {
    const searchParams = new URLSearchParams(filters).toString();
    return await axios.get<FullComment[]>(`/comments?${searchParams}`);
  },

  getAllForProduct: async (productId: string) => {
    return await axios.get<FullComment[]>(`/comments/${productId}`);
  },
};

export default ProductsApi;
