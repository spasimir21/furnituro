import { useRedirectPath } from '@libs/client/hooks/useRedirectPath';
import { errorToMessage } from '@frontend/api/errorToNotification';
import { useSSRNavigate } from '@libs/client/hooks/useSSRNavigate';
import { OAuthButtons } from '@frontend/components/OAuthButtons';
import { setAuthenticationToken } from '@frontend/api/auth';
import { useRequest } from '@libs/client/requestr';
import { requests } from '@frontend/api/requests';
import { SSRLink } from '@libs/shared/ssr';
import { useRef, useState } from 'react';
import React from 'react';

export default function Login() {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useSSRNavigate();

  const redirectPath = useRedirectPath();

  const loginRequest = useRequest(requests.auth.email.login, {
    onRequest: () => {
      setErrorMessage('');
    },
    onResult: async token => {
      await setAuthenticationToken(token);
      navigate(redirectPath);
    },
    onError: error => {
      setErrorMessage(errorToMessage(error));
    },
    requestConfig: {
      suppressErrorNotification: true
    }
  });

  function handleLogin() {
    loginRequest.send({
      email: emailInput.current!.value,
      password: passwordInput.current!.value
    });
  }

  return (
    <div className='w-[100%] h-usable-screen flex justify-center items-center'>
      <div className='w-[450px] pb-6 flex flex-col items-center rounded-lg bg-[#efefef] [box-shadow:_3px_3px_4px_rgba(0,0,0,0.2)]'>
        <h3 className='mt-[30px] font-serif text-[30px] text-[#7A7979] [text-shadow:_0_1px_3px_rgb(0_0_0_/_20%)]'>
          Welcome back!
        </h3>
        <div className='mt-[40px]'>
          <label className='block font-mono text-[14px] text-[#999999]'>Email</label>
          <input
            className='border-solid border-[1px] border-[#747474] rounded-[3px] w-[280px] h-[30px] [box-shadow:_2px_2px_4px_rgba(0,0,0,0.18)] font-mono pl-[8px] text-[16px] text-[#7A7979] outline-none focus:border-[#E87231]'
            type='email'
            ref={emailInput}
          />
        </div>
        <div className='mt-[40px]'>
          <label className='block font-mono text-[14px] text-[#999999]'>Password</label>
          <input
            className='border-solid border-[1px] border-[#747474] rounded-[3px] w-[280px] h-[30px] [box-shadow:_2px_2px_4px_rgba(0,0,0,0.18)] font-mono pl-[8px] text-[16px] text-[#7A7979] outline-none focus:border-[#E87231]'
            type='password'
            ref={passwordInput}
          />
        </div>
        <p className='mt-[20px] text-red-500 text-lg'>{errorMessage}</p>
        <button onClick={handleLogin} className='button mt-[20px]'>
          Login
        </button>
        <OAuthButtons />
        <SSRLink to={`/auth/register?redirectPath=${encodeURIComponent(redirectPath)}`}>
          <p className='mt-[35px] text-[#E87231] font-sans text-[14px] underline cursor-pointer'>
            Haven't got an account?
          </p>
        </SSRLink>
      </div>
    </div>
  );
}
