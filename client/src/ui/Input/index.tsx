import { Input as AntInput, InputProps } from 'antd';
import './index.scss';

const Input = (props: InputProps) => {
  return <AntInput {...props} />;
};

Input.Password = AntInput.Password;

export default Input;
