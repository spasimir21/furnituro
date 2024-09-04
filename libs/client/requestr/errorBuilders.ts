import { HTTPError } from './HTTPError';

const toHttpError = (error: Error) => {
  if (error instanceof HTTPError) return error;
  return new HTTPError(error.message, -1, { message: error.message });
};

export { toHttpError };
