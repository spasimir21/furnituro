import { PrimitiveAtom, atom, createStore, useAtom } from 'jotai';
import { isClient } from '@libs/shared/ssr';

const $HYDRATOR = Symbol('$HYDRATOR');

type HydratedAtom<T> = PrimitiveAtom<T> & { [$HYDRATOR]: () => T };

function hydratedAtom<T>(hydrator: () => T, store: ReturnType<typeof createStore>) {
  const jotaiAtom: HydratedAtom<T> = atom(null as any) as any;

  jotaiAtom[$HYDRATOR] = hydrator;

  if (isClient()) store.set(jotaiAtom as any, hydrator());

  return jotaiAtom;
}

function useHydratedAtom<T>(jotaiAtom: HydratedAtom<T>) {
  if (!isClient()) return [jotaiAtom[$HYDRATOR](), () => {}] as typeof hookResult;

  const hookResult = useAtom(jotaiAtom);
  return hookResult;
}

export { hydratedAtom, useHydratedAtom, HydratedAtom };
