import { _void } from '@libs/shared/utils';
import React from 'react';

export default function TopicSelector({
  selectedTopics
}: {
  selectedTopics: string[];
  setSelectedTopics: (selectedTopics: string[]) => void;
}) {
  return (
    <div>
      <div className='w-[220px] h-usable-screen bg-[#E7E4E4] [box-shadow:_3px_0_3px_rgba(0,0,0,0.4)] flex flex-col items-center'>
        <input
          className='w-[180px] h-[30px] bg-[white] rounded-[5px] [box-shadow:_2px_2px_2px_rgba(0,0,0,0.3)] mt-3 outline-none pl-[5px]'
          placeholder='Search topics...'
        />

        <div className='w-[180px] mt-3 mb-3  flex flex-row flex-wrap gap-2'>
          {selectedTopics.length !== 0 ? (
            selectedTopics.map(selTopic => (
              <button
                key={selTopic}
                className='text-white p-[5px] bg-primary rounded-[5px] [box-shadow:_2px_2px_2px_rgba(0,0,0,0.3)] cursor-pointer filter hover:brightness-95 duration-75'
              >
                {selTopic}
              </button>
            ))
          ) : (
            <p className='text-gray-600 text-sm'>No topics selected</p>
          )}
        </div>

        <div className='w-[85%] h-[4px] bg-[#a0a0a0]  rounded-[4px]'></div>

        <div className='w-[180px] mt-3 mb-3 flex flex-row flex-wrap gap-2'>
          <p className='text-gray-600 text-sm'>No topics to show</p>
        </div>
      </div>
    </div>
  );
}

