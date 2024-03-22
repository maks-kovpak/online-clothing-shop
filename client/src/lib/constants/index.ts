import join from 'url-join';

export const API_URL = join(import.meta.env.VITE_API_URL, '/api/');
export const UPLOAD_URL = join(import.meta.env.VITE_API_URL, '/upload/');
