import { Menu, type MenuProps } from 'antd';
import { useMemo } from 'react';

const UserProfileForm = () => {
  const menuItems: MenuProps['items'] = useMemo(
    () => [
      {
        label: 'Manage my account',
        key: 'manage-account',
        type: 'group',
        children: [
          { label: 'Profile', key: 'profile' },
          { label: 'Address Book', key: 'address-book' },
          { label: 'Payment Options', key: 'payment-options' },
        ],
      },
      {
        label: 'Orders',
        key: 'orders',
        type: 'group',
        children: [
          { label: 'Returns', key: 'returns' },
          { label: 'Cancellations', key: 'cancellations' },
        ],
      },
    ],
    []
  );

  return (
    <section className="primary-section">
      <div>
        <Menu style={{ width: 256 }} mode="inline" items={menuItems} />
      </div>
    </section>
  );
};

export default UserProfileForm;
