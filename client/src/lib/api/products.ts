import axios from '@/lib/api/axios';
import type { FiltersQueryParams, FullProduct } from '@server/lib/types/models';

const ProductsApi = {
  getAll: async (filters?: FiltersQueryParams<FullProduct>) => {
    const searchParams = new URLSearchParams(filters).toString();
    return await axios.get<FullProduct[]>(`/products?${searchParams}`);
  },

  getOne: async (id: string) => {
    return await axios.get<FullProduct>(`/products/${id}`);
  },
};

export default ProductsApi;
