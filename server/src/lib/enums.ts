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
}

export enum Gender {
  MAN = 'MAN',
  WOMAN = 'WOMAN',
  UNISEX = 'UNISEX',
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
