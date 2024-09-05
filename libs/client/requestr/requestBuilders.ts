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

const formBody = (request: FetchExecutorInput, params: any) => {
  const formData = new FormData();

  for (const key in params) {
    if (!Array.isArray(params[key])) {
      if (params[key] != null) formData.append(key, params[key]);
      continue;
    }

    for (const value of params[key]) if (value != null) formData.append(key, value);
  }

  request.options.body = formData;
  return request;
};

const service = (service: string) => (request: FetchExecutorInput) => {
  request.url.host = `${service}.${request.url.host}`;
  return request;
};

const path =
  <T>(path: string | ((params: T) => string)) =>
  (request: FetchExecutorInput, params: T) => {
    if (!request.url.pathname.endsWith('/')) request.url.pathname += '/';
    let requestPath = typeof path === 'function' ? path(params) : path;
    if (requestPath.startsWith('/')) requestPath = requestPath.slice(1);
    request.url.pathname += requestPath;
    return request;
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

export { fetchInit, method, post, get, patch, _delete, jsonBody, formBody, service, path, header, query };

