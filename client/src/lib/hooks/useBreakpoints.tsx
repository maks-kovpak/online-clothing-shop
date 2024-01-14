import { useEffect, useState } from 'react';
import { px } from '@/lib/utils';

export type BreakpointsContext<T extends Record<string, number | string>> = Readonly<{
  [x in keyof T]: { below: boolean; above: boolean };
}>;

/**
 * A custom React hook that returns an object representing the current
 * state of breakpoints based on the provided breakpoints' configuration.
 *
 * @param breakpoints - An object that represents different screen sizes or breakpoints.
 * Each key-value pair in the object represents a breakpoint, where the key is a string
 * identifier for the breakpoint and the value is the maximum width in pixels for that breakpoint.
 *
 * @returns The hook returns a context object of type `BreakpointsContext<typeof breakpoints>`.
 *
 * @example Prints `true` if the screen width is less than 768px otherwise `false`
 * const mediaQuery = useBreakpoints({ tablet: 768 });
 * useEffect(() => console.log(mediaQuery.tablet.below), [mediaQuery]);
 */
const useBreakpoints = <T extends Record<string, number | string>>(breakpoints: T): BreakpointsContext<T> => {
  const [ctx, setCtx] = useState<BreakpointsContext<T>>(
    Object.entries(breakpoints).reduce((accumulator, [key, value]) => {
      const matches = window.matchMedia(`(max-width: ${px(value)})`).matches;
      return { ...accumulator, [key]: { below: matches, above: !matches } };
    }, {} as BreakpointsContext<T>)
  );

  useEffect(() => {
    const queries: Array<{
      media: MediaQueryList;
      listener: (e: MediaQueryListEvent) => void;
    }> = [];

    for (const [key, value] of Object.entries(breakpoints)) {
      const media = window.matchMedia(`(max-width: ${px(value)})`);

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
