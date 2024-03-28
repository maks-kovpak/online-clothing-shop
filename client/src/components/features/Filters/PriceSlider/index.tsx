import { Slider } from 'antd';
import type { FC } from 'react';

const PriceSlider: FC<{ maxPrice?: number }> = ({ maxPrice = 50000 }) => {
  return <Slider defaultValue={[0, maxPrice]} min={0} max={maxPrice} step={100} range />;
};

export default PriceSlider;
