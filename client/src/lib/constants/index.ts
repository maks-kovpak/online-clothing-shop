import join from 'url-join';

export const API_URL = join(import.meta.env.VITE_API_URL, '/api/');
export const UPLOAD_URL = join(import.meta.env.VITE_API_URL, '/upload/');

export const FILTER_COlORS = [
  '#00C12B',
  '#F50606',
  '#F5DD06',
  '#F57906',
  '#06CAF5',
  '#063AF5',
  '#7D06F5',
  '#F506A4',
  '#FFFFFF',
  '#000000',
];

export const DEFAULT_MAX_PRICE = 50_000;
