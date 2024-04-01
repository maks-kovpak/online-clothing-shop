import { type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Collapse, CollapseProps } from 'antd';
import ChooseColor from './ChooseColor';
import PriceSlider from './PriceSlider';
import ChooseStyle from './ChooseStyle';
import ChooseSize from './ChooseSize';

import './index.scss';

const Filters: FC<{ maxPrice?: number }> = ({ maxPrice }) => {
  const { t } = useTranslation();

  const items: CollapseProps['items'] = useMemo(
    () => [
      {
        key: 'price',
        label: t('PRICE'),
        children: <PriceSlider maxPrice={maxPrice} />,
      },
      {
        key: 'colors',
        label: t('COLORS'),
        children: <ChooseColor />,
      },
      {
        key: 'dress-styles',
        label: t('DRESS_STYLES'),
        children: <ChooseStyle />,
      },
      {
        key: 'size',
        label: t('SIZE'),
        children: <ChooseSize />,
      },
    ],
    [maxPrice, t]
  );

  return (
    <aside className="filters-sidebar">
      <h2 className="secondary">{t('FILTERS')}</h2>

      <Collapse
        items={items}
        bordered={false}
        defaultActiveKey={items.map((item) => item.key as string)}
        expandIconPosition="end"
        ghost
      />
      <Button type="primary" className="apply-filters">
        {t('APPLY_FILTERS')}
      </Button>
    </aside>
  );
};

export default Filters;
