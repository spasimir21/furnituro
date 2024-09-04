import { useSSRNavigate } from '@libs/client/hooks/useSSRNavigate';
import { setAuthenticationToken } from '@frontend/api/auth';
import { useUser } from '@libs/client/hooks/useUser';
import { useRequest } from '@libs/client/requestr';
import { requests } from '@frontend/api/requests';
import { useLocation } from 'react-router-dom';
import { SSRLink } from '@libs/shared/ssr';
import ThemeToggler from './ThemeToggler';
import React from 'react';

export default function Header() {
  const location = useLocation();
  const userData = useUser();

  const navigate = useSSRNavigate();

  const logoutRequest = useRequest(requests.auth.logout, {
    onResult: async () => {
      await setAuthenticationToken(null);
      navigate('/auth/login');
    }
  });

  return (
    <header className='w-full h-[80px] bg-secondary fixed top-0 z-50'>
      <div className='w-full h-[80px] flex justify-between items-center'>
        <SSRLink to='/'>
          <div className='flex items-center ml-[20px] cursor-pointer'>
            <img src='/public/Logo.png' alt='logo' className='w-[50px] inline-block' />
            <p className='inline-block font-serif text-[35px] ml-[15px] text-white [text-shadow:_0_3px_4px_rgb(0_0_0_/_45%)] sm:hidden'>
              DIALOGIC
            </p>
          </div>
        </SSRLink>

        <div className='mr-[20px] flex justify-end gap-5'>
          <ThemeToggler />
          {userData == null ? (
            <SSRLink to='/auth/login'>
              <button className='button'>Join</button>
            </SSRLink>
          ) : (
            <div className='flex items-center gap-5'>
              <p className='button' onClick={() => logoutRequest.send()}>
                Logout
              </p>
              <img src={userData.profilePictureURL} className='w-[50px] rounded-full' />
            </div>
          )}
        </div>
      </div>
      <div className='absolute top-0 left-0 w-full h-[80px] grid place-items-center pointer-events-none'>
        <div className='h-[80px] flex justify-center items-center gap-[35px]  pointer-events-auto'>
          <SSRLink to='/trending'>
            <button className='flex items-center'>
              <img
                src={
                  location.pathname.startsWith('/trending') ? '/public/icon/fire-orange.png' : '/public/icon/fire.svg'
                }
                alt='trending'
                className={`w-[20px] inline-block`}
              />
              <p className='sm:hidden inline-block ml-[5px] text-[25px] font-sans font-semibold text-white [text-shadow:_0_3px_4px_rgb(0_0_0_/_45%)]'>
                Trending
              </p>
            </button>
          </SSRLink>

          <SSRLink to='/leaderboard'>
            <button className='flex items-center'>
              <img
                src={
                  location.pathname.startsWith('/leaderboard')
                    ? '/public/icon/trophy-orange.png'
                    : '/public/icon/trophy.svg'
                }
                alt='leaderboard'
                className={`w-[25px] inline-block`}
              />
              <p className='sm:hidden inline-block ml-[5px] text-[25px] font-sans font-semibold text-white [text-shadow:_0_3px_4px_rgb(0_0_0_/_45%)]'>
                Leaderboard
              </p>
            </button>
          </SSRLink>

          <SSRLink to='/rules'>
            <button className='flex items-center'>
              <img
                src={location.pathname.startsWith('/rules') ? '/public/icon/list-orange.png' : '/public/icon/list.svg'}
                alt='rules'
                className={`w-[25px] inline-block`}
              />
              <p className='sm:hidden inline-block ml-[5px] text-[25px] font-sans font-semibold text-white [text-shadow:_0_3px_4px_rgb(0_0_0_/_45%)]'>
                Rules
              </p>
            </button>
          </SSRLink>
        </div>
      </div>
    </header>
  );
}
