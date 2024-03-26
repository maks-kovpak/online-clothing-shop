import { Tag as AntTag, type TagProps } from 'antd';
import type { FC } from 'react';

import './index.scss';

const Tag: FC<TagProps> & {
  CheckableTag: typeof AntTag.CheckableTag;
} = ({ children, ...props }) => {
  return <AntTag {...props}>{children}</AntTag>;
};

Tag.CheckableTag = AntTag.CheckableTag;

export default Tag;
