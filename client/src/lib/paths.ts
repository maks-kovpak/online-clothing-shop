const paths = {
  main: '/',
  other: '*',
  shop: '/shop',
  shopMen: '/shop/men',
  shopWomen: '/shop/women',
  sales: '/sales',
  newArrivals: '/new-arrivals',
  signup: '/signup',
  login: '/login',
  profile: '/profile',
  cart: '/cart',
  productDetails: '/shop/:id',
} as const;

export default paths;
