import { fetchExecutor } from './fetchExecutor';

interface RequestrRequest<TParams = any, TResult = any, TError extends Error = Error, TConfig = { [x: string]: any }> {
  request?: (request: any, params: TParams, config: TConfig) => any;
  executor?: (input: any, config: TConfig) => any;
  response?: (result: any, config: TConfig) => TResult | Promise<TResult>;
  error?: (error: Error, config: TConfig) => TError | Promise<TError>;
}

async function sendRequest<TParams, TResult, TError extends Error, TConfig>(
  req: RequestrRequest<TParams, TResult, TError, TConfig>,
  params: TParams,
  config: TConfig
) {
  const executorInput = req.request ? await req.request(null, params, config) : params;

  const executor = req.executor ?? fetchExecutor;

  const executorResult = await executor(executorInput, config);

  if (req.response == null) return executorResult as TResult;

  try {
    return await req.response(executorResult, config);
  } catch (error) {
    if (!req.error) throw error;
    throw await req.error(error as Error, config);
  }
}

export { sendRequest, RequestrRequest };

