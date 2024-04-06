const paths = {
  main: '/',
  other: '*',
  shop: '/shop',
  products: '/shop/:gender/:type?',
  productDetails: '/shop/product/:id',
  sales: '/sales',
  newArrivals: '/new-arrivals',
  signup: '/signup',
  login: '/login',
  profile: '/profile',
  cart: '/cart',
} as const;

export default paths;
