import { RouteObject } from 'react-router-dom';
import paths from './paths';
import App from '../App';
import MainPage from '@/pages/main';
import SignupPage from '@/pages/signup';
import LoginPage from '@/pages/login';
import ProfilePage from '@/pages/profile';
import NotFoundPage from '@/pages/notFound';
import ShopPage from '@/pages/shop';

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
      { path: paths.shop, element: <ShopPage />, handle: { crumb: 'SHOP' } },
      { path: paths.other, element: <NotFoundPage /> },
    ],
  },
];

export default routes;
