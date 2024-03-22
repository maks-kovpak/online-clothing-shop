import type { SortOrder } from 'mongoose';
import type { IProduct } from '../../models/Product.js';
import type { IProductOption } from '../../models/ProductOptions.js';
import type { WithoutTimestamps } from './utils.js';
import type { IUser } from '../../models/User.js';
import type { IComment } from '../../models/Comments.js';
import type { IClothingType } from '../../models/ClothingTypes.js';

export type FullProduct = IProduct & {
  options: Array<Omit<IProductOption, 'images'> & { images: string[] }>;
  averageRating: number | null;
};

export type UpdateUserPayload = Partial<
  Omit<WithoutTimestamps<IUser>, 'cart' | 'password' | 'profileImage'> & { oldPassword: string; newPassword: string }
>;

export type SortOrderValue = Exclude<SortOrder, 1 | -1>;

export type FiltersQueryParams<T extends object> = Record<string, string> & {
  limit?: string;
  sortBy?: keyof T;
  sortOrder?: SortOrderValue;
};

export type FullComment = Omit<IComment, 'productId' | 'userId'> & { author: string };

export type ClothingTypesQueryParams = Partial<Record<keyof IClothingType, string>>;
