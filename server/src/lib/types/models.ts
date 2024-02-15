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

export enum ClothingType {
  T_SHIRTS = 'T_SHIRTS',
  SHORTS = 'SHORTS',
  SHIRTS = 'SHIRTS',
  HOODIE = 'HOODIE',
  JEANS = 'JEANS',
}

export enum ClothingStyle {
  CASUAL = 'CASUAL',
  FORMAL = 'FORMAL',
  PARTY = 'PARTY',
  GYM = 'GYM',
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
