import { useRedirectPath } from '@libs/client/hooks/useRedirectPath';
import { getGoogleOAuthURL } from '@frontend/api/oauth';
import React from 'react';

const openGoogleOAuth = (redirectPath: string) => (window.location.href = getGoogleOAuthURL(redirectPath));

function OAuthButtons() {
  const redirectPath = useRedirectPath();

  return (
    <div className='mt-[5px] flex flex-col gap-1 items-center'>
      <p>or use</p>
      <div
        className='flex flex-row justify-center items-center gap-1 rounded-2xl bg-gray-200 p-2 shadow-md cursor-pointer hover:bg-gray-300 duration-300'
        onClick={() => openGoogleOAuth(redirectPath)}
      >
        <img className='w-[25px] rounded' src='/public/icon/Google.png' />
        <p className='font-sans'>Google</p>
      </div>
    </div>
  );
}

export { OAuthButtons };
