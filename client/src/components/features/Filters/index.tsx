import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Collapse, Flex } from 'antd';
import type { CollapseProps } from 'antd';
import { useUnit } from 'effector-react';
import { $filtersTouched, applyFiltersEvent } from '@/stores/filters.store';

import ChooseColor from './ChooseColor';
import PriceSlider from './PriceSlider';
import ChooseStyle from './ChooseStyle';
import ChooseSize from './ChooseSize';

import FiltersIcon from '@/assets/icons/filters.svg?react';
import './index.scss';

const Filters = () => {
  const { t } = useTranslation();
  const [applyFilters, filtersTouched] = useUnit([applyFiltersEvent, $filtersTouched]);

  const items: CollapseProps['items'] = useMemo(
    () => [
      {
        key: 'price',
        label: t('PRICE'),
        children: <PriceSlider />,
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
    [t]
  );

  return (
    <aside className="filters-sidebar">
      <Flex className="title" align="center" justify="space-between">
        <h2 className="secondary">{t('FILTERS')}</h2>
        <FiltersIcon />
      </Flex>

      <Collapse
        items={items}
        bordered={false}
        defaultActiveKey={items.map((item) => item.key as string)}
        expandIconPosition="end"
        ghost
      />
      <Button type="primary" className="apply-filters" disabled={!filtersTouched} onClick={() => applyFilters()}>
        {t('APPLY_FILTERS')}
      </Button>
    </aside>
  );
};

export default Filters;
