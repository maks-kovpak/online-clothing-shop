import axios from '@/lib/api/axios';
import Cookies from 'js-cookie';
import type { IUser } from '@server/models/User';
import type { WithoutTimestamps } from '@server/lib/types/utils';

const UserApi = {
  register: async (user: WithoutTimestamps<IUser>) => {
    return await axios.post<{ token: string; user: IUser }>('/auth/register', user);
  },

  login: async (userData: { email: string; password: string }) => {
    return await axios.post<{ token: string; user: IUser }>('/auth/login', userData);
  },

  logout: () => {
    Cookies.remove('jwt-token');
    Cookies.remove('user-id');
  },

  getProfile: async (id: string) => {
    return await axios.get<IUser>(`/user/${id}`);
  },

  exists: async (fieldName: 'email' | 'username', value: string) => {
    return await axios.post<{ exists: boolean }>('/user/exists', { fieldName, value });
  },

  update: async (id: string, payload: FormData) => {
    return await axios.put<{ user: IUser }>(`/user/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default UserApi;
