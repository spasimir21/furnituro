import { lazy, useMemo } from 'react';

function useHydrationStall() {
  return useMemo(() => {
    let _resolve: (value: { default: React.ComponentType<any> }) => void;

    const stallPromise = new Promise<any>(resolve => {
      _resolve = resolve;
    });

    const HydrationStaller = lazy(() => stallPromise);

    return [() => _resolve({ default: () => undefined }), HydrationStaller] as const;
  }, []);
}

export { useHydrationStall };
