/// <reference types="vite-plugin-svgr/client" />

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import routes from '@/lib/routes';
import config from '@/lib/theme';
import '@/lib/i18n';

import '@/assets/styles/index.scss';

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={config} prefixCls="sc">
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
