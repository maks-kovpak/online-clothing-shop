import join from 'url-join';
import { generatePath } from 'react-router-dom';
import { Gender } from '@server/lib/enums';
import paths from '@/lib/paths';

/* URLs */

export const API_URL = join(import.meta.env.VITE_API_URL, '/api/');
export const UPLOAD_URL = join(import.meta.env.VITE_API_URL, '/upload/');

/* Paths */

export const SHOP_MAN = generatePath(paths.products, { gender: Gender.MAN.toLowerCase(), type: null });
export const SHOP_WOMAN = generatePath(paths.products, { gender: Gender.WOMAN.toLowerCase(), type: null });
export const PATHS_WITHOUT_FOOTER = [paths.login, paths.signup] as string[];

/* Filters */

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
