import { Menu, type MenuProps } from 'antd';
import { useMemo } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';
import { resolve } from '@/lib/utils';
import $user from '@/stores/user.store';
import { UserRole } from '@server/lib/types/models';
import { Drawer } from '@/ui';
import { useBreakpoints } from '@/lib/hooks';

import vars from '@/assets/styles/_variables.module.scss';
import './index.scss';

const UserProfileSidebar: FC<{
  setCurrentTitle: Dispatch<SetStateAction<string | null>>;
  drawerOpened: boolean;
  setDrawerOpened: Dispatch<SetStateAction<boolean>>;
}> = ({ setCurrentTitle, drawerOpened, setDrawerOpened }) => {
  const { t } = useTranslation();
  const user = useUnit($user);
  const { laptop } = useBreakpoints({ laptop: vars.lg });

  const menuItems = useMemo(() => {
    const options: MenuProps['items'] = [
      {
        label: t('MANAGE_ACCOUNT'),
        key: 'MANAGE_ACCOUNT',
        type: 'group',
        children: [
          { label: t('PROFILE'), key: 'PROFILE' },
          { label: t('ADDRESS_BOOK'), key: 'ADDRESS_BOOK' },
          { label: t('PAYMENT_OPTIONS'), key: 'PAYMENT_OPTIONS' },
        ],
      },
      {
        label: t('MANAGE_ORDERS'),
        key: 'MANAGE_ORDERS',
        type: 'group',
        children: [
          { label: t('ORDERS'), key: 'ORDERS' },
          { label: t('CANCELLATIONS'), key: 'CANCELLATIONS' },
        ],
      },
    ];

    if (user?.role == UserRole.ADMIN) {
      const adminOptions = {
        label: t('FOR_ADMIN'),
        key: 'FOR_ADMIN',
        type: 'group',
        children: [
          {
            label: <Link to={resolve(import.meta.env.VITE_API_URL, '/admin/')}>{t('ADMIN_PANEL')}</Link>,
            key: 'ADMIN_PANEL',
          },
        ],
      };

      options.push(adminOptions);
    }

    return options;
  }, [t, user]);

  const baseMenu = (
    <Menu
      className="user-profile-sidebar"
      items={menuItems}
      defaultSelectedKeys={['PROFILE']}
      onSelect={({ key }) => setCurrentTitle(key)}
    />
  );

  return laptop.below ? (
    <Drawer onClose={() => setDrawerOpened(false)} open={drawerOpened} placement="left">
      {baseMenu}
    </Drawer>
  ) : (
    baseMenu
  );
};

export default UserProfileSidebar;
