import { useEffect, useState } from 'react';

/**
 * The `useClientReady` custom hook that sets up a state to track client readiness and returns its value.
 * @returns A boolean value indicating whether the client is ready or not.
 */
const useClientReady = () => {
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => setReady(true), []);

  return ready;
};

export default useClientReady;
