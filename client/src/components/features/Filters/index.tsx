import { Collapse, CollapseProps, Divider, Flex, Slider } from 'antd';
import { type FC, useMemo } from 'react';
import Color from '@/components/features/Color';

import './index.scss';

const colors = [
  '#00C12B',
  '#F50606',
  '#F5DD06',
  '#F57906',
  '#06CAF5',
  '#063AF5',
  '#7D06F5',
  '#F506A4',
  '#FFFFFF',
  '#000000',
];

const Filters: FC<{ maxPrice?: number }> = ({ maxPrice = 50000 }) => {
  const items: CollapseProps['items'] = useMemo(
    () => [
      {
        key: 'price',
        label: 'PRICE',
        children: <Slider defaultValue={[0, maxPrice]} min={0} max={maxPrice} step={100} range />,
      },
      {
        key: 'colors',
        label: 'COLORS',
        children: (
          <Flex gap="0.875rem" wrap="wrap">
            {colors.map((color) => (
              <Color value={color} />
            ))}
          </Flex>
        ),
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
