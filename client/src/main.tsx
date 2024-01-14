/// <reference types="vite-plugin-svgr/client" />

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';

import routes from '@/lib/routes';
import config from '@/lib/theme';
import '@/lib/i18n';

import '@/assets/styles/index.scss';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={config} prefixCls="sc">
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </ConfigProvider>
  </React.StrictMode>
);
