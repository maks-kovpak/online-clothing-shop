import axios from 'axios';
import { API_URL } from '@/lib/constants';
import type { IUser } from '@server/models/User';
import type { OmitId, PartialBy } from '@server/lib/types/utils';

const UserApi = {
  register: async (user: OmitId<IUser>) => {
    return await axios.post<{ message: string }>(`${API_URL}/auth/register`, user);
  },

  login: async (userData: { email: string; password: string }) => {
    return await axios.post<{ token: string; user: PartialBy<IUser, 'password'> }>(`${API_URL}/auth/login`, userData);
  },
};

export default UserApi;
