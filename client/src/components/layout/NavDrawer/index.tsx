import { Menu } from 'antd';
import { Drawer } from '@/ui';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useNavbarConfig } from '@/lib/hooks';
import LanguageSelect from '@/components/features/LanguageSelect';

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
        items={config}
        inlineIndent={0}
        expandIcon={<ArrowDownIcon style={{ width: 16 }} />}
        onClick={() => setOpened(false)}
      />
      <LanguageSelect width="100%" />
    </Drawer>
  );
};

export default NavDrawer;
