import { isClient } from '@libs/shared/ssr';

function useNonServerHook<T, Q extends T>(hook: () => T, fallback: Q): T {
  return isClient() ? hook() : fallback;
}

export { useNonServerHook };
