import { Menu } from 'antd';
import { Drawer } from '@/ui';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useNavbarConfig } from '@/lib/hooks';
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from 'react-router-dom';
import LanguageSelect from '@/components/features/LanguageSelect';
import paths from '@/lib/paths';

import ArrowDownIcon from '@/assets/icons/arrow-down.svg?react';
import './index.scss';

const NavDrawer: FC<{
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}> = ({ opened, setOpened }) => {
  const config = useNavbarConfig();

  return (
    <Drawer className="nav-drawer" placement="left" open={opened} onClose={() => setOpened(false)}>
      <Menu
        mode="inline"
        items={config.map((item) => ({
          label: <NavLink to={item.link ?? paths.main}>{item.label}</NavLink>,
          key: uuidv4(),
          children: item.items,
        }))}
        inlineIndent={0}
        expandIcon={<ArrowDownIcon style={{ width: 16 }} />}
      />
      <LanguageSelect width="100%" />
    </Drawer>
  );
};

export default NavDrawer;
