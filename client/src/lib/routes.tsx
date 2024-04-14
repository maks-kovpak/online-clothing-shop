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
import CartPage from '@/pages/cart';

import type { RouteObject } from 'react-router-dom';
import type { RouteHandlerType } from '@/lib/types';
import type { FullProduct } from '@server/lib/types/models';

const routes: Array<RouteObject> = [
  {
    path: paths.main,
    element: <App />,
    handle: { crumb: 'HOME' },
    children: [
      { path: paths.main, element: <MainPage /> },
      { path: paths.signup, element: <SignupPage /> },
      { path: paths.login, element: <LoginPage /> },
      { path: paths.profile, element: <ProfilePage />, handle: { crumb: 'PROFILE' } },
      { path: paths.cart, element: <CartPage />, handle: { crumb: 'CART' } },
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
            handle: { crumb: ({ data }) => (data as FullProduct).name } as RouteHandlerType,
          },
          {
            path: paths.products,
            element: <ShopPage />,
            handle: {
              crumb: ({ params }, t) => (params?.gender ? t(params.gender.toUpperCase() + '_COLLECTION') : ''),
            } as RouteHandlerType,
          },
        ],
      },
      { path: paths.other, element: <NotFoundPage /> },
    ],
    errorElement: <NotFoundPage />,
  },
];

export default routes;
