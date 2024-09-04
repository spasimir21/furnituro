import { RequestrRequest, sendRequest } from './request';
import { useCallback, useEffect, useState } from 'react';

interface UseRequestConfig<TParams, TResult, TError extends Error, TConfig> {
  onRequest?: (params: TParams) => void;
  onResult?: (result: TResult) => void;
  onError?: (error: TError) => void;
  initialParams?: TParams;
  initialResult?: TResult;
  requestConfig?: TConfig;
}

function useRequest<TParams, TResult, TError extends Error, TConfig>(
  request: RequestrRequest<TParams, TResult, TError, TConfig>,
  config?: UseRequestConfig<TParams, TResult, TError, TConfig>
) {
  const [result, setResult] = useState((config?.initialResult ?? null) as TResult | null);
  const [error, setError] = useState(null as null | TError);
  const [loading, setLoading] = useState(false);

  const send = useCallback(async (params: TParams) => {
    setLoading(true);
    if (config?.onRequest) config.onRequest(params);

    try {
      const result = await sendRequest(request, params, config?.requestConfig!);
      setResult(result);
      setError(null);

      if (config?.onResult) config.onResult(result);
    } catch (error) {
      setError(error as TError);
      // setResult(null);

      if (config?.onError) config.onError(error as TError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (config?.initialResult === undefined && config?.initialParams !== undefined) send(config.initialParams);
  }, [send]);

  return { send, result, error, loading, setResult };
}

export { useRequest, UseRequestConfig };
