import axios from '@/lib/api/axios';
import type { Cart, CartItemPayload } from '@server/lib/types/models';

const CartApi = {
  getAll: async (userId: string) => {
    return await axios.get<Cart>(`/cart/${userId}`);
  },

  addNewItem: async (userId: string, payload: CartItemPayload) => {
    return await axios.patch<{ message: string }>(`/cart/add/${userId}`, payload);
  },

  removeItem: async (userId: string, payload: CartItemPayload) => {
    return await axios.patch<{ message: string }>(`/cart/remove/${userId}`, payload);
  },

  clearCart: async (userId: string) => {
    return await axios.delete<{ message: string }>(`/cart/${userId}`);
  },
};

export default CartApi;
