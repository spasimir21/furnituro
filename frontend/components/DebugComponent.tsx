import { RequestrRequest, useRequest } from '@libs/client/requestr';
import React, { useMemo } from 'react';

interface DebugComponentProps<TFields extends string = string, TParams = any, TResult = any> {
  title: string;
  buttonText?: string;
  fields: { [K in TFields]: string };
  request: RequestrRequest<TParams, TResult>;
  getParams: (fields: Record<TFields, string>) => TParams;
  formatResult?: (result: TResult | null) => string;
}

const formatResultAsJSON = (result: any) => JSON.stringify(result, null, 2);

// Required because dumbass typescript can't infer types well without this
function defineDebugComponentProps<TFields extends string, TParams, TResult>(
  component: DebugComponentProps<TFields, TParams, TResult>
) {
  return component;
}

export default function DebugComponent<TFields extends string, TParams, TResult>(
  props: DebugComponentProps<TFields, TParams, TResult>
) {
  const request = useRequest(props.request);

  const data = useMemo(
    () => Object.fromEntries(Object.keys(props.fields).map(id => [id, ''])),
    [props.fields]
  ) as Record<TFields, string>;

  return (
    <div className='flex flex-col gap-3 items-center border border-black p-3 rounded-md'>
      <p className='text-xl font-semibold'>{props.title}</p>
      <div className='flex flex-col items-end gap-3'>
        {(Object.keys(props.fields) as TFields[]).map(id => (
          <div key={id} className='flex flex-row items-center'>
            <p className='text-lg mr-3'>{props.fields[id]}:</p>
            <input
              className='border border-black border-solid rounded-md pl-1'
              type='text'
              onInput={(e: any) => (data[id] = e.target.value)}
            />
          </div>
        ))}
      </div>
      <pre>
        <p>{(props.formatResult ?? formatResultAsJSON)(request.result)}</p>
      </pre>
      <button
        className='text-xl font-semibold border border-black rounded-md pl-1 pr-1'
        onClick={() => (!request.loading ? request.send(props.getParams(data)) : null)}
        disabled={request.loading}
      >
        {request.loading ? 'Loading...' : props.buttonText ?? 'Send'}
      </button>
    </div>
  );
}

export { DebugComponentProps, defineDebugComponentProps };
