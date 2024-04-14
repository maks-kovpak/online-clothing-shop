import axios from '@/lib/api/axios';
import type { Cart } from '@server/lib/types/models';

const CartApi = {
  getAll: async (productId: string) => {
    return await axios.get<Cart>(`/cart/${productId}`);
  },
};

export default CartApi;
