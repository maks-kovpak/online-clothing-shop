import { Select as AntSelect, type SelectProps } from 'antd';
import type { FC } from 'react';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?react';

const Select: FC<Omit<SelectProps, 'suffixIcon'>> = (props) => {
  return <AntSelect {...props} suffixIcon={<ArrowDownIcon />} />;
};

export default Select;
