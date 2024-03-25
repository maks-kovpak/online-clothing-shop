const paths = {
  main: '/',
  other: '*',
  shop: '/shop/:gender/:type?',
  sales: '/sales',
  newArrivals: '/new-arrivals',
  signup: '/signup',
  login: '/login',
  profile: '/profile',
  cart: '/cart',
  productDetails: '/shop/:id',
} as const;

export default paths;
