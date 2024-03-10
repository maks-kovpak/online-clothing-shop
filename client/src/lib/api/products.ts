import axios from '@/lib/api/axios';
import type { FullProduct } from '@server/lib/types/models';

const ProductsApi = {
  getAll: async () => {
    return await axios.get<FullProduct[]>('/products');
  },
};

export default ProductsApi;
