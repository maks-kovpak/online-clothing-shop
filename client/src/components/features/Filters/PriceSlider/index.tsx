import { Slider } from 'antd';
import type { FC } from 'react';
import { DEFAULT_MAX_PRICE } from '@/lib/constants';

const PriceSlider: FC<{ maxPrice?: number }> = ({ maxPrice = DEFAULT_MAX_PRICE }) => {
  return <Slider defaultValue={[0, maxPrice]} min={0} max={maxPrice} step={100} range />;
};

export default PriceSlider;
