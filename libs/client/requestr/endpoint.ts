import { RequestrRequest } from './request';
import { HTTPError } from './HTTPError';

const endpoint = <TParams, TResult, TError extends Error = HTTPError, TConfig = {}>(
  endpointConfig: RequestrRequest<TParams, TResult, TError, TConfig>
) => endpointConfig;

const withConfig = <TConfig>(endpointConfig: RequestrRequest<any, any, any, TConfig>) => endpointConfig;

export { endpoint, withConfig };
