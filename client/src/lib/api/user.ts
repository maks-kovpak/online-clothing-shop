import axios from 'axios';
import { IUser } from 'server/src/models/User';
import { OmitId, PartialBy } from 'server/src/lib/types/utils';
import { API_URL } from '@/lib/constants';

const UserApi = {
  register: async (user: OmitId<IUser>) => {
    return await axios.post<{ message: string }>(`${API_URL}/auth/register`, user);
  },

  login: async (userData: { email: string; password: string }) => {
    return await axios.post<{ token: string; user: PartialBy<IUser, 'password'> }>(`${API_URL}/auth/login`, userData);
  },
};

export default UserApi;
