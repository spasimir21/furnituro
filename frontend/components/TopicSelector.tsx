import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useRequest } from '@libs/client/requestr';
import { requests } from '@frontend/api/requests';
import { _void } from '@libs/shared/utils';

export default function TopicSelector({
  selectedTopics,
  setSelectedTopics
}: {
  selectedTopics: string[];
  setSelectedTopics: (selectedTopics: string[]) => void;
}) {
  const [topicInput, setTopicInput] = useState('');

  let timeout = useRef<any>();

  const searchTopicRequest = useRequest(requests.category.searchCategories, {
    initialParams: '' // Send an empty search request to load the top categories immediately
  });

  const availableTopics = useMemo(() => {
    const topics = searchTopicRequest.result;
    if (topics == null) return [];

    return topics.filter(topic => !selectedTopics.includes(topic));
  }, [searchTopicRequest.result, selectedTopics]);

  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  function handleInput(event: any) {
    const searchQuery = event.target.value.trim();

    clearTimeout(timeout.current);
    setTopicInput(searchQuery);

    timeout.current = setTimeout(() => {
      searchTopicRequest.send(searchQuery);
    }, 500);
  }

  function handleSelectTopic(topic: string) {
    setSelectedTopics([...selectedTopics, topic]);
  }

  function handleUnselectTopic(topic: string) {
    setSelectedTopics(selectedTopics.filter(t => t !== topic));
  }

  return (
    <div>
      <div className='w-[220px] h-usable-screen bg-[#E7E4E4] [box-shadow:_3px_0_3px_rgba(0,0,0,0.4)] flex flex-col items-center'>
        <input
          className='w-[180px] h-[30px] bg-[white] rounded-[5px] [box-shadow:_2px_2px_2px_rgba(0,0,0,0.3)] mt-3 outline-none pl-[5px]'
          onChange={handleInput}
          value={topicInput}
          placeholder='Search topics...'
        />
        <div className='w-[180px] mt-3 mb-3  flex flex-row flex-wrap gap-2'>
          {/* Selected topics */}
          {selectedTopics.length !== 0 ? (
            selectedTopics.map(selTopic => (
              <button
                key={selTopic}
                onClick={() => {
                  handleUnselectTopic(selTopic);
                }}
                className='text-white p-[5px] bg-primary rounded-[5px] [box-shadow:_2px_2px_2px_rgba(0,0,0,0.3)] cursor-pointer filter hover:brightness-95 duration-75'
              >
                {selTopic}
              </button>
            ))
          ) : (
            <p className='text-gray-600 text-sm'>No topics selected</p>
          )}
        </div>
        {/* Divider */}
        <div className='w-[85%] h-[4px] bg-[#a0a0a0]  rounded-[4px]'></div>

        <div className='w-[180px] mt-3 mb-3 flex flex-row flex-wrap gap-2'>
          {/* Avaible topics */}
          {availableTopics.length === 0 ? (
            <p className='text-gray-600 text-sm'>No topics to show</p>
          ) : (
            availableTopics.map(topicName => (
              <button
                key={topicName}
                onClick={() => {
                  handleSelectTopic(topicName);
                }}
                className='p-[5px] bg-white rounded-[5px] [box-shadow:_2px_2px_2px_rgba(0,0,0,0.3)] inline-block cursor-pointer filter hover:brightness-95 duration-75'
              >
                {topicName}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
