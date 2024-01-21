import type { DropdownProps as AntDropdownProps, MenuProps } from 'antd';
import { Dropdown as AntDropdown, Space } from 'antd';
import type { FC, ReactNode } from 'react';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?react';
import './index.scss';

type DropdownProps = AntDropdownProps & {
  children: ReactNode;
  items: MenuProps['items'];
  menu?: Omit<MenuProps, 'items'>;
};

const Dropdown: FC<DropdownProps> = ({ children, items, menu, ...props }) => {
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
