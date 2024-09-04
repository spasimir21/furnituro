interface IAtomic<T> {
  get(): Promise<T>;
  update(): Promise<T>;
  set(value: T): Promise<T>;
}

class Atomic<T> implements IAtomic<T> {
  private value: T = null as T;

  private updateTask: Promise<T> | null = null;

  private hasInitialized: boolean = false;

  constructor(private readonly getter: () => Promise<T>, private readonly onValue: (value: T) => void) {}

  async get() {
    if (!this.hasInitialized) {
      this.hasInitialized = true;
      return this.update();
    }

    if (this.updateTask != null) return this.updateTask;
    return this.value;
  }

  async update() {
    if (!this.hasInitialized) this.hasInitialized = true;
    if (this.updateTask != null) return this.updateTask;
    this.updateTask = this.runUpdateTask();
    return this.updateTask;
  }

  async set(value: T) {
    if (!this.hasInitialized) this.hasInitialized = true;
    if (this.updateTask != null) await this.updateTask;
    this.value = value;
    this.onValue(this.value);
    return value;
  }

  private async runUpdateTask() {
    const value = await this.getter();
    this.value = value;
    this.updateTask = null;
    this.onValue(this.value);
    return value;
  }
}

const atomic = <T>(getter: () => Promise<T>, onValue: (value: T) => void = () => {}) => new Atomic(getter, onValue);

export { atomic, Atomic, IAtomic };
