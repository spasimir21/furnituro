import { createPromiseObservable } from '@libs/shared/utils/promiseObservable';
import { SharedValue, createSharedValue } from './sharedValue';
import { $CurrentTabId, getRandomTab } from './tabTracker';
import { IAtomic } from '@libs/shared/utils/atomic';
import { isClient } from '@libs/shared/ssr';
import './tabTracker';

interface SharedAtomicState<T> {
  updatingTab: string | null;
  value: T;
}

function sharedAtomic<T>(
  name: string,
  getInitialValue: () => T,
  getter: (oldValue: T) => Promise<T>,
  onValue: (value: T, isFromSelf: boolean) => void = () => {}
): IAtomic<T> {
  if (!isClient()) return null as any;

  let sharedState: SharedValue<SharedAtomicState<T>>;

  const valueObservable = createPromiseObservable<T>(next => {
    sharedState = createSharedValue<SharedAtomicState<T>>(
      name,
      () => ({ updatingTab: null, value: getInitialValue() }),
      (state, isFromSelf) => {
        if (state.updatingTab == null) {
          onValue(state.value, isFromSelf);
          return next(state.value);
        }

        if (state.updatingTab != $CurrentTabId) return;

        getter(state.value).then(value => (sharedState.value = { updatingTab: null, value }));
      }
    );

    return sharedState.close;
  });

  window.addEventListener('beforeunload', () => {
    if (sharedState.value!.updatingTab !== $CurrentTabId) return;

    const newResponsibleTab = getRandomTab();
    if (newResponsibleTab != null)
      sharedState.value = {
        updatingTab: newResponsibleTab,
        value: sharedState.value!.value
      };

    valueObservable.stop();
  });

  return {
    async get() {
      if (!sharedState.hasValue) await valueObservable.next;

      if (sharedState.value!.updatingTab != null) return valueObservable.next as Promise<T>;
      return sharedState.value!.value;
    },
    async update() {
      if (!sharedState.hasValue) await valueObservable.next;

      if (sharedState.value!.updatingTab == null)
        sharedState.value = { updatingTab: $CurrentTabId, value: sharedState.value!.value };

      return valueObservable.next as Promise<T>;
    },
    async set(value) {
      if (!sharedState.hasValue) await valueObservable.next;

      if (sharedState.value!.updatingTab != null) await valueObservable.next;
      sharedState.value = { updatingTab: null, value };
      return value;
    }
  };
}

export { sharedAtomic };
