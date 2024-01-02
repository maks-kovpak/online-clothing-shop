import { Drawer, Menu } from 'antd';
import type { Dispatch, FC, SetStateAction } from 'react';
import useBreakpoints from '@/lib/hooks/useBreakpoints';
import useNavbarConfig from '@/lib/hooks/useNavbarConfig';
import navbarConfig from '../Navbar/config';
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from 'react-router-dom';

import logo from '@/assets/img/logo.svg';
import './index.scss';
import LanguageSelect from '../LanguageSelect';

const NavDrawer: FC<{
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}> = ({ opened, setOpened }) => {
  const mediaQuery = useBreakpoints({ tablet: 576 });
  const config = useNavbarConfig(navbarConfig);

  return (
    <Drawer
      placement="left"
      width={mediaQuery.tablet.below ? '100%' : 400}
      open={opened}
      onClose={() => setOpened(false)}
      extra={<img src={logo} alt="SHOP.CO" />}
    >
      <Menu
        mode="inline"
        items={config.map((item) => ({
          label: <NavLink to={item.link ?? '/'}>{item.label}</NavLink>,
          key: uuidv4(),
          children: item.items,
        }))}
      />
      <LanguageSelect width="100%" />
    </Drawer>
  );
};

export default NavDrawer;
