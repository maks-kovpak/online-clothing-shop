import axios from '@/lib/api/axios';
import type { FullProduct } from '@server/controllers/ProductController';

const ProductsApi = {
  getAll: async () => {
    return await axios.get<FullProduct[]>('/products');
  },
};

export default ProductsApi;
