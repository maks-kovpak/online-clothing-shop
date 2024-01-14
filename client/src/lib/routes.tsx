import { Navigate, RouteObject } from 'react-router-dom';
import App from '../App.tsx';
import paths from './paths.ts';
import MainPage from '@/pages/main/index.tsx';

const routes: Array<RouteObject> = [
  {
    path: paths.main,
    element: <App />,
    children: [
      {
        path: paths.main,
        element: <MainPage />,
      },
      {
        path: paths.other,
        element: <Navigate to={paths.main} />,
      },
    ],
  },
];

export default routes;
