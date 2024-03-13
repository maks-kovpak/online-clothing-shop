import { resolve } from '@/lib/utils';

export const API_URL = resolve(import.meta.env.VITE_API_URL, '/api/');
export const UPLOAD_URL = resolve(import.meta.env.VITE_API_URL, '/upload/');
