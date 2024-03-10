import { Input as AntInput, InputProps } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './index.scss';

const Input = (props: InputProps) => {
  return <AntInput {...props} />;
};

Input.Password = AntInput.Password;

Input.Password.defaultProps = {
  iconRender: (visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />),
};

export default Input;
