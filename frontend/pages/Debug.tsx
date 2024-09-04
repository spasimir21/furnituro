import DebugComponent, { defineDebugComponentProps } from '@frontend/components/DebugComponent';
import { requests } from '@frontend/api/requests';
import React from 'react';

const DEBUG_COMPONENTS = [
  defineDebugComponentProps({
    title: 'Create Topics',
    buttonText: 'Create',
    fields: { topics: 'Topics' },
    request: requests.category.ensureCategories,
    getParams: ({ topics }) => ({
      names: topics.split(',').map(topic => topic.trim())
    })
  })
] as const;

export default function Debug() {
  return (
    <div className='relative h-usable-screen overflow-y-auto flex flex-col items-center gap-7 pt-5 pb-5'>
      <p className='text-4xl font-bold font-serif'>Debug Page</p>
      {DEBUG_COMPONENTS.map(props => (
        <DebugComponent key={props.title} {...props} />
      ))}
    </div>
  );
}
