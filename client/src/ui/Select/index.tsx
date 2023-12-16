import { Select as AntSelect, type SelectProps } from 'antd';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?react';

const Select = (props: Omit<SelectProps, 'suffixIcon'>) => {
  return <AntSelect {...props} suffixIcon={<ArrowDownIcon />} />;
};

export default Select;
