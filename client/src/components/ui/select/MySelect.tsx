import { Select, type SelectProps } from 'antd';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?react';
import './MySelect.scss';

const MySelect = (props: Omit<SelectProps, 'suffixIcon'>) => {
  return <Select {...props} suffixIcon={<ArrowDownIcon />} />;
};

export default MySelect;
