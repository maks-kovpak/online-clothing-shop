import { Menu, type MenuProps } from 'antd';
import { useMemo } from 'react';
import './index.scss';

const UserProfileSidebar = () => {
  const menuItems: MenuProps['items'] = useMemo(
    () => [
      {
        label: 'Manage My Account',
        key: 'manage-account',
        type: 'group',
        children: [
          { label: 'Profile', key: 'profile' },
          { label: 'Address Book', key: 'address-book' },
          { label: 'Payment Options', key: 'payment-options' },
        ],
      },
      {
        label: 'Manage Orders',
        key: 'manage-orders',
        type: 'group',
        children: [
          { label: 'Orders', key: 'orders' },
          { label: 'Cancellations', key: 'cancellations' },
        ],
      },
    ],
    []
  );

  return (
    <Menu className="user-profile-sidebar" style={{ width: 295 }} items={menuItems} defaultSelectedKeys={['profile']} />
  );
};

export default UserProfileSidebar;
