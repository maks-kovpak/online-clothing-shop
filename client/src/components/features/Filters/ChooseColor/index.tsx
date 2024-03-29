import { Flex } from 'antd';
import Color from '@/components/features/Color';
import { FILTER_COlORS } from '@/lib/constants';
import { useUnit } from 'effector-react';
import $filters, { updateFiltersEvent } from '@/stores/filters.store';

const ChooseColor = () => {
  const [filters, updateFilters] = useUnit([$filters, updateFiltersEvent]);

  return (
    <Flex gap="0.786rem" wrap="wrap">
      {FILTER_COlORS.map((color, idx) => (
        <Color
          value={color}
          key={idx}
          onChecked={(checked) => {
            if (checked) {
              updateFilters({ colors: [...filters.colors, color] });
            } else {
              updateFilters({ colors: filters.colors.filter((val) => val !== color) });
            }
          }}
        />
      ))}
    </Flex>
  );
};

export default ChooseColor;
