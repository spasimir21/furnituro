import { useRouteParams } from '@libs/client/hooks/useRouteParam';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setAuthenticationToken } from '@frontend/api/auth';
import { useRequest } from '@libs/client/requestr';
import { requests } from '@frontend/api/requests';
import React, { useEffect } from 'react';

// TODO: make it like shrek
function OAuth() {
  const { provider } = useRouteParams<'provider'>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const googleOAuthRequest = useRequest(requests.auth.oauth.google, {
    onResult: async token => {
      await setAuthenticationToken(token);
      navigate(searchParams.get('state') ?? '/');
    },
    onError: () => navigate('/')
  });

  useEffect(() => {
    switch (provider) {
      case 'google':
        googleOAuthRequest.send({
          accessCode: searchParams.get('code')!
        });
        break;
      default:
        navigate('/');
    }
  }, []);

  return <p>Authorizing...</p>;
}

export { OAuth };
export default OAuth;
