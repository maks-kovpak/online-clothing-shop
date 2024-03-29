import { Slider } from 'antd';
import type { FC } from 'react';
import { DEFAULT_MAX_PRICE } from '@/lib/constants';
import { useUnit } from 'effector-react';
import { updateFiltersEvent } from '@/stores/filters.store';

const PriceSlider: FC<{ maxPrice?: number }> = ({ maxPrice }) => {
  const updateFilters = useUnit(updateFiltersEvent);

  return (
    <Slider
      defaultValue={[0, maxPrice ?? DEFAULT_MAX_PRICE]}
      min={0}
      max={maxPrice}
      step={100}
      onChange={(range) => updateFilters({ price: range as [number, number] })}
      range
    />
  );
};

export default PriceSlider;
