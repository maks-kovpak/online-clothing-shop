import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from '@/lib/constants';

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get('jwt-token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
