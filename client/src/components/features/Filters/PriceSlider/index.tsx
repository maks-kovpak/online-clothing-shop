import { Slider } from 'antd';
import { useUnit } from 'effector-react';
import { updateFiltersEvent } from '@/stores/filters.store';
import { $maxPrice } from '@/stores/products.store';

const PriceSlider = () => {
  const updateFilters = useUnit(updateFiltersEvent);
  const maxPrice = useUnit($maxPrice);

  return (
    <Slider
      defaultValue={[0, maxPrice]}
      min={0}
      max={maxPrice}
      step={10}
      onChange={(range) => updateFilters({ price: range as [number, number] })}
      tooltip={{ formatter: (value) => '₴' + value }}
      range
    />
  );
};

export default PriceSlider;
