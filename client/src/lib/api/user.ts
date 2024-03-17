import axios from '@/lib/api/axios';
import Cookies from 'js-cookie';
import type { IUser } from '@server/models/User';
import type { PartialBy, WithoutTimestamps } from '@server/lib/types/utils';
import type { UpdateUserPayload } from '@server/controllers/UserController';

const UserApi = {
  register: async (user: WithoutTimestamps<IUser>) => {
    return await axios.post<{ token: string; user: PartialBy<IUser, 'password'> }>('/auth/register', user);
  },

  login: async (userData: { email: string; password: string }) => {
    return await axios.post<{ token: string; user: PartialBy<IUser, 'password'> }>('/auth/login', userData);
  },

  logout: () => {
    Cookies.remove('jwt-token');
    Cookies.remove('user-id');
  },

  getProfile: async (id: string) => {
    return await axios.get<IUser>(`/user/${id}`);
  },

  emailExists: async (email: string) => {
    return await axios.post<{ exists: boolean }>('/user/exists', { email });
  },

  update: async (id: string, payload: UpdateUserPayload) => {
    return await axios.put<{ message: string }>(`/user/${id}`, payload);
  },
};

export default UserApi;
