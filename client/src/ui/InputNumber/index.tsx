import { Button, Flex, Input } from 'antd';
import { useState } from 'react';
import type { FC } from 'react';

import './index.scss';

const InputNumber: FC<{
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}> = ({ initialValue, min, max, onChange }) => {
  const [value, setValue] = useState<number>(initialValue ?? 0);

  return (
    <Flex className="number-input-wrapper" align="center" gap="0.5rem">
      <Button
        type="link"
        onClick={() => {
          if (value === min) return;
          setValue(value - 1);
          onChange && onChange(value - 1);
        }}
      >
        -
      </Button>

      <Input value={value} variant="borderless" readOnly />

      <Button
        type="link"
        onClick={() => {
          if (value === max) return;
          setValue(value + 1);
          onChange && onChange(value + 1);
        }}
      >
        +
      </Button>
    </Flex>
  );
};

export default InputNumber;
