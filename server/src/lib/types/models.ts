import type { SortOrder } from 'mongoose';
import type { IProduct } from '../../models/Product.js';
import type { IProductOption } from '../../models/ProductOptions.js';
import type { JsonModel, OmitId, WithoutTimestamps } from './utils.js';
import type { ICartItem, IUser } from '../../models/User.js';
import type { IComment } from '../../models/Comments.js';
import type { IClothingType } from '../../models/ClothingTypes.js';

/* Products */

export type FullProduct = Omit<JsonModel<IProduct>, 'type' | 'style'> & {
  options: Array<Omit<IProductOption, 'images'> & { images: string[] }>;
  averageRating: number | null;
  type: { name: string; slug: string };
  style: string;
  initialPrice: number;
};

/* User */

export type FullUser = JsonModel<IUser>;

export type UpdateUserPayload = Partial<
  Omit<WithoutTimestamps<FullUser>, 'cart' | 'password' | 'profileImage'> & {
    oldPassword: string;
    newPassword: string;
  }
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

export type FullComment = Omit<JsonModel<IComment>, 'productId' | 'userId'> & { author: string };
export type NewCommentRequestBody = { userId: string; rating: number; text: string };

/* Clothing types */

export type ClothingTypesQueryParams = Partial<Record<keyof IClothingType, string>>;

/* Cart */

export type FullCartItem = Omit<JsonModel<ICartItem>, 'productOptionId'> & {
  productOptionId: string;
  name: string;
  initialPrice: number;
  price: number;
  discount: number;
  image: string;
  color: string;
};

export type Cart = FullCartItem[];

export type CartItemPayload = Omit<ICartItem, '_id' | 'productOptionId'> & {
  productOptionId: string;
};
