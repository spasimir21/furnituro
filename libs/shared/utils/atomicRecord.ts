import { Atomic, atomic } from './atomic';

class AtomicRecord<T> {
  private readonly atomics: Record<string, Atomic<T>> = {};

  constructor(private readonly getter: (key: string) => Promise<T>) {}

  get(key: string) {
    if (!(key in this.atomics)) this.atomics[key] = atomic(() => this.getter(key));
    return this.atomics[key].get();
  }

  update(key: string) {
    if (!(key in this.atomics)) this.atomics[key] = atomic(() => this.getter(key));
    return this.atomics[key].update();
  }
}

const atomicRecord = <T>(getter: (key: string) => Promise<T>) => new AtomicRecord<T>(getter);

export { AtomicRecord, atomicRecord };
