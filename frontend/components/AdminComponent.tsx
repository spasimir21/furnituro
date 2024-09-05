import { RequestrRequest, useRequest } from '@libs/client/requestr';
import React, { Fragment, useMemo, useState } from 'react';

interface AdminField {
  id: string;
  label: string;
  type: 'text' | 'file' | 'files';
}

interface AdminComponentProps<TFields extends AdminField[] = AdminField[], TResult = any> {
  title: string;
  buttonText?: string;
  fields: TFields;
  execute: (fields: MapFields<TFields>) => Promise<TResult>;
  formatResult?: (result: TResult | null) => string;
}

type FieldTypes = {
  text: string;
  file: File | null;
  files: File[];
};

type MapFields<T extends AdminField[]> = {
  [F in T[number] as F['id']]: FieldTypes[F['type']];
};

const formatResultAsJSON = (result: any) => JSON.stringify(result, null, 2);

// Required because dumbass typescript can't infer types well without this
function defineAdminComponentProps<TFields extends AdminField[], TResult>(
  component: AdminComponentProps<TFields, TResult>
) {
  return component;
}

export default function AdminComponent<TFields extends AdminField[], TResult>(
  props: AdminComponentProps<TFields, TResult>
) {
  const data = useMemo(
    () => Object.fromEntries(props.fields.map(field => [field.id, field.type === 'text' ? '' : null] as const)),
    [props.fields]
  ) as MapFields<TFields>;

  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const execute = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const rawResult = await props.execute(data);
      setResult((props.formatResult ?? formatResultAsJSON)(rawResult));
    } catch (err: any) {
      setResult(err.message);
    }

    setLoading(false);
  };

  return (
    <div className='flex flex-col gap-3 items-center border border-black p-3 rounded-md'>
      <p className='text-xl font-semibold'>{props.title}</p>
      <div
        className='grid gap-3'
        style={{
          gridTemplateColumns: 'auto 1fr'
        }}
      >
        {props.fields.map(field => (
          <Fragment key={field.id}>
            <p className='text-lg mr-3'>{field.label}:</p>
            {field.type === 'text' ? (
              <input
                className='border border-black border-solid rounded-md pl-1 w-max'
                type='text'
                onInput={(e: any) => ((data as any)[field.id] = e.target.value)}
              />
            ) : (
              <input
                className='border border-black border-solid rounded-md pl-1'
                type='file'
                multiple={field.type === 'files'}
                onInput={(e: any) =>
                  ((data as any)[field.id] =
                    field.type === 'files' ? Array.from(e.target.files) : e.target.files[0] ?? null)
                }
              />
            )}
          </Fragment>
        ))}
      </div>
      <pre>
        <p>{result}</p>
      </pre>
      <button
        className='text-xl font-semibold border border-black rounded-md pl-1 pr-1'
        onClick={execute}
        disabled={loading}
      >
        {loading ? 'Loading...' : props.buttonText ?? 'Send'}
      </button>
    </div>
  );
}

export { AdminComponentProps, defineAdminComponentProps };

