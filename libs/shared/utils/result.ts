type Result<T> = { value: T; error: null } | { value: null; error: Error };

function wrapResult<T>(func: () => T): Result<T> {
  try {
    return { value: func(), error: null };
  } catch (error) {
    return { value: null, error: error as Error };
  }
}

async function wrapResultAsync<T>(func: () => Promise<T>) {
  try {
    return { value: await func(), error: null };
  } catch (error) {
    return { value: null, error: error as Error };
  }
}

function unwrapResult<T>({ value, error }: Result<T>): T {
  if (error) throw error;
  return value;
}

function unwrapResultWithNull<T>({ value, error }: Result<T>): T | null {
  return error ? null : value;
}

function unwrapResultSafe<T, TS, TE>(
  { value, error }: Result<T>,
  getSuccess: (value: T) => TS,
  getFail: (error: Error) => TE
): TS | TE {
  return error ? getFail(error) : getSuccess(value);
}

function unwrapResultWithErrorMessage<T>({ value, error }: Result<T>, getMessage: (error: Error) => string): T {
  if (error) throw new Error(getMessage(error));
  return value;
}

export {
  Result,
  wrapResult,
  wrapResultAsync,
  unwrapResult,
  unwrapResultSafe,
  unwrapResultWithErrorMessage,
  unwrapResultWithNull
};
