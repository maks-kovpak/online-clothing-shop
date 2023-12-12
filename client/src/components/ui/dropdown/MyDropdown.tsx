import type { DropdownProps, MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { FC, ReactNode } from 'react';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?react';
import './MyDropdown.scss';

const MyDropdown: FC<{
  children: ReactNode;
  items: MenuProps['items'];
  menu?: Omit<MenuProps, 'items'>;
  props?: Omit<DropdownProps, 'menu' | 'placement' | 'arrow'>;
}> = ({ children, items, menu, ...props }) => {
  return (
    <Dropdown menu={{ items, ...menu }} placement="bottom" arrow={{ pointAtCenter: true }} {...props}>
      <Space>
        {children}
        <ArrowDownIcon viewBox="0 0 16 13" />
      </Space>
    </Dropdown>
  );
};

export default MyDropdown;
