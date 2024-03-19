import type { IProduct } from '../../models/Product.js';
import type { IProductOption } from '../../models/ProductOptions.js';
import type { WithoutTimestamps } from './utils.js';
import type { IUser } from '../../models/User.js';

/* Types */

export type FullProduct = IProduct & {
  options: Array<Omit<IProductOption, 'images'> & { images: string[] }>;
  averageRating: number | null;
};

export type UpdateUserPayload = Partial<
  Omit<WithoutTimestamps<IUser>, 'cart' | 'password' | 'profileImage'> & { oldPassword: string; newPassword: string }
>;

/* Enums */

export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

export enum ClothingSize {
  XXS = 'XXS',
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  THREE_XL = '3XL',
  FOUR_XL = '4XL',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  AWAITING_FULFILLMENT = 'AWAITING_FULFILLMENT',
  AWAITING_SHIPMENT = 'AWAITING_SHIPMENT',
  AWAITING_PICKUP = 'AWAITING_PICKUP',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  DECLINED = 'DECLINED',
  REFUNDED = 'REFUNDED',
}
