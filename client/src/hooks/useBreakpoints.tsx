import { useEffect, useState } from 'react';

export type BreakpointsContext<T extends object> = Record<keyof T, { below: boolean; above: boolean }>;

const useBreakpoints = (breakpoints: Record<string, number>): BreakpointsContext<typeof breakpoints> => {
  const [ctx, setCtx] = useState<BreakpointsContext<typeof breakpoints>>(
    Object.entries(breakpoints).reduce((accumulator, [key, value]) => {
      const matches = window.matchMedia(`(max-width: ${value}px)`).matches;
      return { ...accumulator, [key]: { below: matches, above: !matches } };
    }, {})
  );

  useEffect(() => {
    const queries: Array<{
      media: MediaQueryList;
      listener: (e: MediaQueryListEvent) => void;
    }> = [];

    for (const [key, value] of Object.entries(breakpoints)) {
      const media = window.matchMedia(`(max-width: ${value}px)`);

      const listener = (e: MediaQueryListEvent) => {
        setCtx({ ...ctx, [key]: { below: e.matches, above: !e.matches } });
      };

      media.addEventListener('change', listener);
      queries.push({ media, listener });
    }

    return () => queries.forEach(({ media, listener }) => media.removeEventListener('change', listener));
  }, [breakpoints, ctx, setCtx]);

  return ctx;
};

export default useBreakpoints;
