import { useState, type FC } from 'react';
import { Flex } from 'antd';
import Color from '../Color';

const ColorTags: FC<{
  items: string[];
  onSelect?: (value: boolean, index: number) => void;
}> = ({ items, onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <Flex className="color-tags" gap="0.5rem">
      {items.map((item, idx) => (
        <Color
          key={item}
          value={item}
          isChecked={idx === currentIndex}
          onChecked={(value) => {
            setCurrentIndex(idx);
            if (onSelect) onSelect(value, idx);
          }}
        />
      ))}
    </Flex>
  );
};

export default ColorTags;
