import { RequestrRequest, UseRequestConfig, useRequest } from '@libs/client/requestr';
import { getSSRDataValue } from '@libs/shared/ssr';
import { useMemo } from 'react';

function useSSRRequest<TParams, TResult, TError extends Error, TConfig>(
  ssrKey: string,
  request: RequestrRequest<TParams, TResult, TError, TConfig>,
  config?: UseRequestConfig<TParams, TResult, TError, TConfig>
) {
  const newConfig = useMemo(() => {
    return {
      ...config,
      initialResult: getSSRDataValue(ssrKey, undefined)
    };
  }, []);

  return useRequest(request, newConfig);
}

export { useSSRRequest };
