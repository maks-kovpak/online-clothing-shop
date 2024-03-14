import type { FC, ReactNode } from 'react';
import useClientReady from '@/lib/hooks/useClientReady.tsx';

import './index.scss';

const Loading: FC<{ children: ReactNode }> = ({ children }) => {
  const ready = useClientReady();

  if (!ready) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }

  return children;
};

export default Loading;
