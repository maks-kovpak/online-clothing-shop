import { Rate as AntRate, type RateProps } from 'antd';
import type { FC } from 'react';

import './index.scss';

const Rate: FC<RateProps> = (props) => {
  return <AntRate {...props} />;
};

export default Rate;
