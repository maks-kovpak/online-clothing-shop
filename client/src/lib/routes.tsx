import { Navigate, RouteObject } from 'react-router-dom';
import App from '../App.tsx';

const routes: Array<RouteObject> = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

export default routes;
