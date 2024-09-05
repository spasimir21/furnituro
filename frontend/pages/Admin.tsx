import AdminComponent, { AdminComponentProps, defineAdminComponentProps } from '@frontend/components/AdminComponent';
import { sendRequest } from '@libs/client/requestr';
import { requests } from '@frontend/api/requests';
import { _void } from '@libs/shared/utils';
import React from 'react';

const ADMIN_COMPONENTS = [
  defineAdminComponentProps({
    title: 'Create Category',
    buttonText: 'Create',
    fields: [
      {
        id: 'name',
        label: 'Name',
        type: 'text'
      },
      {
        id: 'coverPhoto',
        label: 'Cover Photo',
        type: 'file'
      }
    ] as const,
    execute: async ({ name, coverPhoto }) => {
      const imageResult =
        coverPhoto != null ? await sendRequest(requests.image.upload, { images: [coverPhoto] }, {}) : null;

      return sendRequest(
        requests.category.create,
        {
          name,
          coverPhoto: imageResult?.hashes?.[0] ?? undefined
        },
        {}
      );
    }
  }),
  defineAdminComponentProps({
    title: 'Get All Categories',
    buttonText: 'Get All',
    fields: [] as const,
    execute: () => sendRequest(requests.category.getAll, _void, {})
  }),
  defineAdminComponentProps({
    title: 'Edit Category',
    buttonText: 'Edit',
    fields: [
      {
        id: 'id',
        label: 'Id',
        type: 'text'
      },
      {
        id: 'name',
        label: 'Name',
        type: 'text'
      },
      {
        id: 'coverPhoto',
        label: 'Cover Photo',
        type: 'file'
      }
    ] as const,
    execute: async ({ id, name, coverPhoto }) => {
      const imageResult =
        coverPhoto != null ? await sendRequest(requests.image.upload, { images: [coverPhoto] }, {}) : null;

      return sendRequest(
        requests.category.edit,
        {
          id,
          name: name.trim().length > 3 ? name : undefined,
          coverPhoto: imageResult == null ? undefined : imageResult.hashes[0] ?? undefined
        },
        {}
      );
    }
  }),
  defineAdminComponentProps({
    title: 'Delete Category',
    buttonText: 'Delete',
    fields: [
      {
        id: 'id',
        label: 'Id',
        type: 'text'
      }
    ] as const,
    execute: data => sendRequest(requests.category.delete, data, {})
  })
] as const satisfies AdminComponentProps[];

export default function Admin() {
  return (
    <div className='relative h-usable-screen overflow-y-auto flex flex-col items-center gap-7 pt-5 pb-5'>
      <p className='text-4xl font-bold font-serif'>Admin Page</p>
      {ADMIN_COMPONENTS.map(props => (
        // @ts-ignore
        <AdminComponent key={props.title} {...props} />
      ))}
    </div>
  );
}

