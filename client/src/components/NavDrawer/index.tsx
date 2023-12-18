import useBreakpoints from '@/hooks/useBreakpoints';
import { Drawer } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';

import logo from '@/assets/img/logo.svg';

import './index.scss';

const NavDrawer: FC<{ opened: boolean; setOpened: Dispatch<SetStateAction<boolean>> }> = ({ opened, setOpened }) => {
  const mediaQuery = useBreakpoints({ tablet: 576 });

  return (
    <Drawer
      placement="left"
      width={mediaQuery.tablet.below ? '100%' : 400}
      open={opened}
      onClose={() => setOpened(false)}
      extra={<img src={logo} alt="SHOP.CO" />}
    >
      ...
    </Drawer>
  );
};

export default NavDrawer;
