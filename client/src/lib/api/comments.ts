import axios from '@/lib/api/axios';
import type { FullComment, FiltersQueryParams } from '@server/lib/types/models';
import type { NewCommentRequestBody } from '@server/lib/types/models';

const CommentsApi = {
  getAll: async (filters?: FiltersQueryParams<FullComment>) => {
    const searchParams = new URLSearchParams(filters).toString();
    return await axios.get<FullComment[]>(`/comments?${searchParams}`);
  },

  getAllForProduct: async (productId: string) => {
    return await axios.get<FullComment[]>(`/comments/${productId}`);
  },

  addNewComment: async (productId: string, body: NewCommentRequestBody) => {
    return await axios.post<{ message: string }>(`/comments/${productId}`, body);
  },
};

export default CommentsApi;
