import { Navigate, RouteObject } from 'react-router-dom';
import App from '../App.tsx';
import paths from './paths.ts';

const routes: Array<RouteObject> = [
  {
    path: paths.main,
    element: <App />,
  },
  {
    path: paths.other,
    element: <Navigate to={paths.main} />,
  },
];

export default routes;
