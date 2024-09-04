import { FetchExecutorInput } from './fetchExecutor';

const fetchInit = () => {
  const request = {
    url: new URL(window.location.href),
    options: {
      headers: {}
    }
  };

  request.url.pathname = '/';

  return request;
};

const method = (method: string) => (request: FetchExecutorInput) => {
  request.options.method = method;
  return request;
};

const _delete = method('DELETE');
const patch = method('PATCH');
const post = method('POST');
const get = method('GET');

const jsonBody = (request: FetchExecutorInput, params: any) => {
  request.options.body = JSON.stringify(params);
  (request.options.headers as any)['Content-Type'] = 'application/json';
  return request;
};

const service = (service: string) => (request: FetchExecutorInput) => {
  request.url.host = `${service}.${request.url.host}`;
  return request;
};

const path = (path: string) => {
  if (path.startsWith('/')) path = path.slice(1);

  return (request: FetchExecutorInput) => {
    if (!request.url.pathname.endsWith('/')) request.url.pathname += '/';
    request.url.pathname += path;
    return request;
  };
};

const query =
  <T>(key: string, value: string | ((params: T) => string)) =>
  (request: FetchExecutorInput, params: T) => {
    request.url.searchParams.set(key, typeof value === 'function' ? value(params) : value);
    return request;
  };

const header =
  (name: string, valueGetter: (config: any) => string | undefined | Promise<string | undefined>) =>
  async (request: FetchExecutorInput, _: any, config: any) => {
    (request.options.headers as any)[name] = await valueGetter(config);
    return request;
  };

export { fetchInit, method, post, get, patch, _delete, jsonBody, service, path, header, query };
