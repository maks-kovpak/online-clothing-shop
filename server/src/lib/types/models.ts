import type { SortOrder } from 'mongoose';
import type { IProduct } from '../../models/Product.js';
import type { IProductOption } from '../../models/ProductOptions.js';
import type { OmitId, WithoutTimestamps } from './utils.js';
import type { ICartItem, IUser } from '../../models/User.js';
import type { IComment } from '../../models/Comments.js';
import type { IClothingType } from '../../models/ClothingTypes.js';

/* Products */

export type FullProduct = Omit<IProduct, 'type' | 'style'> & {
  options: Array<Omit<IProductOption, 'images'> & { images: string[] }>;
  averageRating: number | null;
  type: { name: string; slug: string };
  style: string;
  initialPrice: number;
};

/* User */

export type UpdateUserPayload = Partial<
  Omit<WithoutTimestamps<IUser>, 'cart' | 'password' | 'profileImage'> & { oldPassword: string; newPassword: string }
>;

/* Filters */

export type SortOrderValue = Exclude<SortOrder, 1 | -1>;

export type FiltersQueryParams<T extends object> = Partial<Record<keyof OmitId<T>, string>> &
  Record<string, string> & {
    limit?: string;
    sortBy?: keyof T;
    sortOrder?: SortOrderValue;
  };

/* Comments */

export type FullComment = Omit<IComment, 'productId' | 'userId'> & { author: string };
export type NewCommentRequestBody = { userId: string; rating: number; text: string };

/* Clothing types */

export type ClothingTypesQueryParams = Partial<Record<keyof IClothingType, string>>;

/* Cart */

export type FullCartItem = Omit<ICartItem, 'productOptionId'> & {
  name: string;
  initialPrice: number;
  price: number;
  discount: number;
  image: string;
};

export type Cart = FullCartItem[];
