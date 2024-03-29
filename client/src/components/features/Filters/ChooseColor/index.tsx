import { Flex } from 'antd';
import Color from '@/components/features/Color';
import { FILTER_COlORS } from '@/lib/constants';

const ChooseColor = () => {
  return (
    <Flex gap="0.786rem" wrap="wrap">
      {FILTER_COlORS.map((color, idx) => (
        <Color value={color} key={idx} />
      ))}
    </Flex>
  );
};

export default ChooseColor;
