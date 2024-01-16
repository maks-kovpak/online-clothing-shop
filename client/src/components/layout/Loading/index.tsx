import './index.scss';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';

const Loading: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }

  return children;
};

export default Loading;
