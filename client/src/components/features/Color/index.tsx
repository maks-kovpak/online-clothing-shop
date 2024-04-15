import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, FC } from 'react';
import ColorJS from 'color';
import { clsx } from 'clsx';

import './index.scss';

const Color: FC<{
  value: string;
  onChecked?: (value: boolean) => void;
  checkable?: boolean;
  isChecked?: boolean;
}> = ({ value, onChecked, checkable, isChecked }) => {
  const color = useMemo(() => new ColorJS(value), [value]);
  const [checked, setChecked] = useState(isChecked ?? false);

  useEffect(() => {
    if (isChecked !== undefined) {
      setChecked(isChecked);
    }
  }, [isChecked]);

  const styles: CSSProperties = useMemo(
    () => ({
      backgroundColor: color.hex(),
      border: `1px solid ${color.mix(new ColorJS('black'), 0.3).hex()}`,
    }),
    [color]
  );

  return (
    <div
      className={clsx('color', { checked, checkable })}
      style={styles}
      onClick={() => {
        if (!checkable) return;

        if (isChecked !== undefined && onChecked) {
          onChecked(isChecked);
        } else {
          onChecked && onChecked(!checked);
          setChecked(!checked);
        }
      }}
    ></div>
  );
};

Color.defaultProps = {
  checkable: true,
};

export default Color;
