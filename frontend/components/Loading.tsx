import getTheme from '@libs/client/utils/getTheme';
import React from 'react';

export default function Loading() {
  const theme = getTheme();

  return (
    <div className='absolute w-full h-full text-center backdrop-filter backdrop-blur-md flex justify-around items-center z-10'>
      <span className='relative flex w-fit h-fit'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75'></span>
        <img
          className='w-full max-w-[100px] relative inline-flex animate-bounce m-5'
          src='/public/Logo.png'
          alt='Dialogic'
        />
      </span>
    </div>
  );
}
