import { Observable } from 'rxjs';

function streamToArray<T>(stream$: Observable<T>): Promise<T[]> {
  const values = [] as T[];

  return new Promise((resolve, reject) => {
    stream$.subscribe({
      next: value => values.push(value),
      error: reject,
      complete: () => resolve(values)
    });
  });
}

export { streamToArray };
