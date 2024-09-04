import { Mutable } from './Mutable';

interface PromiseObservable<T> {
  readonly next: Promise<T | null>;
  readonly isDone: boolean;
  subscribe(subscriber: (value: T) => Promise<boolean | void>): void;
  stop(): void;
}

function createPromiseObservable<T>(callback: (next: (value: T) => void) => void | (() => void)): PromiseObservable<T> {
  const observable = { isDone: false } as Mutable<PromiseObservable<T>>;

  let $resolve: (value: T | null) => void = null as any;

  const resetNext = () => (observable.next = new Promise<T | null>(resolve => ($resolve = resolve)));

  resetNext();

  observable.subscribe = subscriber => {
    const resetSubscription = async () => {
      const value = await observable.next;
      if (observable.isDone) return;
      const shouldUnsub = await subscriber(value!);
      if (shouldUnsub !== true && !observable.isDone) resetSubscription();
    };

    resetSubscription();
  };

  const cleanup = (callback(value => {
    const oldResolve = $resolve;
    resetNext();
    oldResolve(value);
  }) ?? (() => {})) as () => void;

  observable.stop = () => {
    observable.isDone = true;
    cleanup();

    $resolve(null);

    $resolve = null as any;
    observable.next = null as any;
  };

  return observable;
}

export { createPromiseObservable, PromiseObservable };
