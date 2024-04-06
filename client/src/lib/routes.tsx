import paths from '@/lib/paths';
import App from '@/App';

import MainPage from '@/pages/main';
import SignupPage from '@/pages/signup';
import LoginPage from '@/pages/login';
import ProfilePage from '@/pages/profile';
import NotFoundPage from '@/pages/notFound';
import ShopPage from '@/pages/shop';
import ProductDetailPage from '@/pages/productDetail';

import type { RouteObject } from 'react-router-dom';
import type { RouteHandlerType } from '@/lib/types';

export type CustomRouteObject = Omit<RouteObject, 'handle' | 'children'> & {
  handle?: RouteHandlerType;
  children?: CustomRouteObject[];
};

const routes: Array<CustomRouteObject> = [
  {
    path: paths.main,
    element: <App />,
    handle: { crumb: 'HOME' },
    children: [
      { path: paths.main, element: <MainPage /> },
      { path: paths.signup, element: <SignupPage /> },
      { path: paths.login, element: <LoginPage /> },
      { path: paths.profile, element: <ProfilePage />, handle: { crumb: () => 'PROFILE' } },
      {
        path: paths.shop,
        element: <ShopPage />,
        handle: { crumb: 'SHOP' },
        children: [
          { path: paths.products, element: <ShopPage />, handle: { crumb: (_, params, t) => t(params?.gender ?? '') } },
          { path: paths.productDetails, element: <ProductDetailPage />, handle: { crumb: 'PRODUCT' } },
        ],
      },
      { path: paths.other, element: <NotFoundPage /> },
    ],
  },
];

export default routes;
