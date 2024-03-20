import type { SortOrder } from 'mongoose';
import type { IProduct } from '../../models/Product.js';
import type { IProductOption } from '../../models/ProductOptions.js';
import type { WithoutTimestamps } from './utils.js';
import type { IUser } from '../../models/User.js';

export type FullProduct = IProduct & {
  options: Array<Omit<IProductOption, 'images'> & { images: string[] }>;
  averageRating: number | null;
};

export type UpdateUserPayload = Partial<
  Omit<WithoutTimestamps<IUser>, 'cart' | 'password' | 'profileImage'> & { oldPassword: string; newPassword: string }
>;

export type SortOrderValue = Exclude<SortOrder, 1 | -1>;

export type AllProductsQueryParams = {
  limit?: string;
  sortBy?: keyof FullProduct;
  sortOrder?: SortOrderValue;
};
