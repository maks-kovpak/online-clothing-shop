import { Flex } from 'antd';
import Color from '@/components/features/Color';

const colors = [
  '#00C12B',
  '#F50606',
  '#F5DD06',
  '#F57906',
  '#06CAF5',
  '#063AF5',
  '#7D06F5',
  '#F506A4',
  '#FFFFFF',
  '#000000',
];

const ChooseColor = () => {
  return (
    <Flex gap="0.786rem" wrap="wrap">
      {colors.map((color, idx) => (
        <Color value={color} key={idx} />
      ))}
    </Flex>
  );
};

export default ChooseColor;
