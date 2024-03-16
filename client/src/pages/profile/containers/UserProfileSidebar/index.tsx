import { Menu, type MenuProps } from 'antd';
import { useMemo } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import './index.scss';

const UserProfileSidebar: FC<{ setCurrentTitle: Dispatch<SetStateAction<string | null>> }> = ({ setCurrentTitle }) => {
  const { t } = useTranslation();

  const menuItems: MenuProps['items'] = useMemo(
    () => [
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
    ],
    [t]
  );

  return (
    <Menu
      className="user-profile-sidebar"
      style={{ width: 295 }}
      items={menuItems}
      defaultSelectedKeys={['PROFILE']}
      onSelect={({ key }) => setCurrentTitle(key)}
    />
  );
};

export default UserProfileSidebar;
