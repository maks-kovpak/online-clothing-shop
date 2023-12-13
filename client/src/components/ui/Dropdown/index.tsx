import type { DropdownProps, MenuProps } from 'antd';
import { Dropdown as AntDropdown, Space } from 'antd';
import { FC, ReactNode } from 'react';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?react';
import './index.scss';

const Dropdown: FC<{
  children: ReactNode;
  items: MenuProps['items'];
  menu?: Omit<MenuProps, 'items'>;
  props?: Omit<DropdownProps, 'menu' | 'placement' | 'arrow'>;
}> = ({ children, items, menu, ...props }) => {
  return (
    <AntDropdown menu={{ items, ...menu }} placement="bottom" arrow={{ pointAtCenter: true }} {...props}>
      <Space>
        {children}
        <ArrowDownIcon viewBox="0 0 16 13" />
      </Space>
    </AntDropdown>
  );
};

export default Dropdown;
