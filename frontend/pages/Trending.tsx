import TopicSelector from '@frontend/components/TopicSelector';
import React, { useEffect, useState } from 'react';
import { _void } from '@libs/shared/utils';

export default function Trending() {
  const [selectedTopics, setSelectedTopics] = useState([] as string[]);

  useEffect(() => {
    console.log(selectedTopics);
  }, [selectedTopics]);

  return (
    <div className='relative h-usable-screen select-none flex flex-row justify-start'>
      <TopicSelector {...{ selectedTopics, setSelectedTopics }} />
      <div className='w-full overflow-y-auto'></div>
    </div>
  );
}
