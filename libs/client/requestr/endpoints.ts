import { RequestrRequest } from './request';
import { combine } from './combine';

const $IS_ENDPOINTS = Symbol('$IS_ENDPOINTS');

const combineTwo = (a: any, b: any) => {
  if (a != null && b != null) return combine(a, b);
  return b ?? a;
};

type EndpointRequests = RequestrRequest | { [x: string]: EndpointRequests };

// prettier-ignore
type AddConfigToEndpoints<T extends RequestrRequest | EndpointRequests, TConfig> =
    T extends RequestrRequest<infer P, infer R, infer E, infer C> ? RequestrRequest<P, R, E, C & TConfig>
  : T extends { [x: string]: any } ? { [K in keyof T]: AddConfigToEndpoints<T[K], TConfig> }
  : never;

function endpoints<T extends { [x: string]: EndpointRequests }, TConfig = { [x: string]: any }>(
  base: RequestrRequest<any, any, any, TConfig>,
  requests: T
): AddConfigToEndpoints<T, TConfig> {
  const newRequests: any = { [$IS_ENDPOINTS]: true };

  for (const key in requests) {
    const request = requests[key] as any;

    if (request[$IS_ENDPOINTS]) {
      newRequests[key] = endpoints(base, request);
      continue;
    }

    newRequests[key] = {
      request: combineTwo(base.request, request.request),
      executor: request.executor ?? base.executor,
      response: combineTwo(base.response, request.response),
      error: combineTwo(base.error, request.error)
    };
  }

  return newRequests;
}

export { endpoints };
