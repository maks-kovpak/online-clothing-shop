import { Collapse, CollapseProps, Divider, Slider } from 'antd';
import { type FC, useMemo } from 'react';

import './index.scss';

const Filters: FC<{ maxPrice?: number }> = ({ maxPrice = 50000 }) => {
  const items: CollapseProps['items'] = useMemo(
    () => [
      {
        key: 'price',
        label: 'PRICE',
        children: <Slider defaultValue={[0, maxPrice]} min={0} max={maxPrice} step={100} range />,
      },
    ],
    [maxPrice]
  );

  return (
    <aside className="filters-sidebar">
      <h2 className="secondary">Filters</h2>
      <Divider />
      <Collapse items={items} bordered={false} defaultActiveKey={['price']} expandIconPosition="end" ghost />
    </aside>
  );
};

export default Filters;
