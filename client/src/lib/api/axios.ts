import axios from 'axios';
import { API_URL } from '@/lib/constants';

export default axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
