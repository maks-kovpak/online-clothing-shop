import axios from '@/lib/api/axios';
import type { AllProductsQueryParams, FullProduct } from '@server/lib/types/models';

const ProductsApi = {
  getAll: async (filters?: AllProductsQueryParams) => {
    const searchParams = new URLSearchParams(filters).toString();
    return await axios.get<FullProduct[]>(`/products?${searchParams}`);
  },
};

export default ProductsApi;
