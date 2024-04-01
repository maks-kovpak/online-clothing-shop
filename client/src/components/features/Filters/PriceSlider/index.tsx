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
    return products ? Math.max(...products.map((product) => product.price)) : DEFAULT_MAX_PRICE;
  }, [products]);

  return (
    <Slider
      value={[0, maxPrice]}
      min={0}
      max={maxPrice}
      step={100}
      onChange={(range) => updateFilters({ price: range as [number, number] })}
      range
    />
  );
};

export default PriceSlider;
