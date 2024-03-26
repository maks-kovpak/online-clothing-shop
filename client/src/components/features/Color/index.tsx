import { useMemo, useState } from 'react';
import type { CSSProperties, FC } from 'react';
import ColorJS from 'color';
import { clsx } from 'clsx';

import './index.scss';

const Color: FC<{ value: string }> = ({ value }) => {
  const color = useMemo(() => new ColorJS(value), [value]);
  const [checked, setChecked] = useState(false);

  const styles: CSSProperties = useMemo(
    () => ({
      backgroundColor: color.hex(),
      border: `1px solid ${color.mix(new ColorJS('black'), 0.3).hex()}`,
    }),
    [color]
  );

  return <div className={clsx('color', { checked })} style={styles} onClick={() => setChecked(!checked)}></div>;
};

export default Color;
