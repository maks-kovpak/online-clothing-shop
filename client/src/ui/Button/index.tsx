import type { ButtonProps as AntButtonProps } from 'antd';
import { Button as AntButton } from 'antd';
import type { FC, ReactNode } from 'react';
import './index.scss';

type ButtonProps = AntButtonProps & { children: ReactNode };

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <AntButton {...props}>{children}</AntButton>;
};

export default Button;
