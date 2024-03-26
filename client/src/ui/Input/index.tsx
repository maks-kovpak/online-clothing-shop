import { Input as AntInput, InputProps } from 'antd';
import type { FC } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import './index.scss';

const Input: FC<InputProps> & {
  Password: typeof AntInput.Password;
} = (props) => {
  return <AntInput {...props} />;
};

Input.Password = AntInput.Password;

Input.Password.defaultProps = {
  iconRender: (visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />),
};

export default Input;
