import { Drawer as AntDrawer, DrawerProps } from 'antd';
import type { FC, ReactNode } from 'react';
import { useBreakpoints } from '@/lib/hooks';

import logo from '@/assets/img/logo.svg';
import vars from '@/assets/styles/_variables.module.scss';
import './index.scss';

const Drawer: FC<{ children: ReactNode } & Omit<DrawerProps, 'width' | 'extra'>> = ({ children, ...props }) => {
  const mediaQuery = useBreakpoints({ tablet: vars.sm });

  return (
    <AntDrawer width={mediaQuery.tablet.below ? '100%' : 400} extra={<img src={logo} alt="SHOP.CO" />} {...props}>
      {children}
    </AntDrawer>
  );
};

export default Drawer;
