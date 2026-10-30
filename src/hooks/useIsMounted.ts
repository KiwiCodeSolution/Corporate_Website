import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

// false on the server and during hydration, true afterwards — for UI that depends on
// browser-only state (resolved theme, window width).
export default function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
