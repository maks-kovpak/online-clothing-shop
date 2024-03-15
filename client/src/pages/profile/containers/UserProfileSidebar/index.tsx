import { Menu, type MenuProps } from 'antd';
import { useMemo } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';
import './index.scss';

const UserProfileSidebar: FC<{ setCurrentTitle: Dispatch<SetStateAction<string | null>> }> = ({ setCurrentTitle }) => {
  const menuItems: MenuProps['items'] = useMemo(
    () => [
      {
        label: 'Manage My Account',
        key: 'MANAGE_ACCOUNT',
        type: 'group',
        children: [
          { label: 'Profile', key: 'PROFILE' },
          { label: 'Address Book', key: 'ADDRESS_BOOK' },
          { label: 'Payment Options', key: 'PAYMENT_OPTIONS' },
        ],
      },
      {
        label: 'Manage Orders',
        key: 'MANAGE_ORDERS',
        type: 'group',
        children: [
          { label: 'Orders', key: 'ORDERS' },
          { label: 'Cancellations', key: 'CANCELLATIONS' },
        ],
      },
    ],
    []
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
