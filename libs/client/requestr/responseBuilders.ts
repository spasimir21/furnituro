import { wrapResult } from '@libs/shared/utils/result';
import { HTTPError } from './HTTPError';

const catchHttpError = async (response: Response) => {
  if (response.ok) return response;

  const text = await response.text();

  const { value: data } = wrapResult(() => JSON.parse(text));

  throw data == null
    ? new HTTPError(text, response.status, { message: text })
    : new HTTPError(data.message ?? response.statusText, response.status, data);
};

const jsonResponse = (response: Response) => response.json();

const textResponse = (response: Response) => response.text();

export { catchHttpError, jsonResponse, textResponse };
