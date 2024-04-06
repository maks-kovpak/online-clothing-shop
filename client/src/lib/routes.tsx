import paths from '@/lib/paths';
import ProductsApi from '@/lib/api/products';
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
import type { FullProduct } from '@server/lib/types/models';

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
      { path: paths.profile, element: <ProfilePage />, handle: { crumb: 'PROFILE' } },
      {
        path: paths.shop,
        handle: { crumb: 'SHOP' },
        children: [
          {
            path: paths.productDetails,
            element: <ProductDetailPage />,
            loader: async ({ params }) => {
              if (!params.id) return;

              const response = await ProductsApi.getOne(params.id);
              return response.data;
            },
            handle: { crumb: ({ data }) => (data as FullProduct).name },
          },
          {
            path: paths.products,
            element: <ShopPage />,
            handle: { crumb: ({ params }, t) => t(params?.gender?.toUpperCase() + '_COLLECTION' ?? '') },
          },
        ],
      },
      { path: paths.other, element: <NotFoundPage /> },
    ],
  },
];

export default routes;
