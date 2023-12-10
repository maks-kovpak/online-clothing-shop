import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import './i18n.ts';
import './styles/index.scss';
import { ConfigProvider, ThemeConfig } from 'antd';

const router = createBrowserRouter(routes);

const config: ThemeConfig = {
  token: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={config} prefixCls="sc">
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
