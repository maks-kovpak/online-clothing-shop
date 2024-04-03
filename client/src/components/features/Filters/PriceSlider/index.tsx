import { Slider } from 'antd';
import { DEFAULT_MAX_PRICE } from '@/lib/constants';
import { useUnit } from 'effector-react';
import { updateFiltersEvent } from '@/stores/filters.store';
import { useMemo } from 'react';
import $products from '@/stores/products.store';

const PriceSlider = () => {
  const updateFilters = useUnit(updateFiltersEvent);
  const products = useUnit($products);

  const maxPrice = useMemo(() => {
    return products.length ? Math.max(...products.map((product) => product.price)) : DEFAULT_MAX_PRICE;
  }, [products]);

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
