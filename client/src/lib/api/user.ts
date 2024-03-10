import axios from '@/lib/api/axios';
import type { IUser } from '@server/models/User';
import type { PartialBy, WithoutTimestamps } from '@server/lib/types/utils';

const UserApi = {
  register: async (user: WithoutTimestamps<IUser>) => {
    return await axios.post<{ message: string }>('/auth/register', user);
  },

  login: async (userData: { email: string; password: string }) => {
    return await axios.post<{ token: string; user: PartialBy<IUser, 'password'> }>('/auth/login', userData);
  },
};

export default UserApi;
