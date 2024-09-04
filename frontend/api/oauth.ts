import { FRONTEND_CONFIG } from '@frontend/config';

function getGoogleOAuthURL(redirectPath: string) {
  const query = new URLSearchParams();

  query.set('client_id', FRONTEND_CONFIG.oauth.googleAppId);
  query.set('redirect_uri', `${FRONTEND_CONFIG.publicBaseUrl}/oauth/google`);
  query.set('response_type', 'code');
  query.set('scope', 'email profile');
  query.set('state', redirectPath);

  return `https://accounts.google.com/o/oauth2/v2/auth?${query.toString()}`;
}

export { getGoogleOAuthURL };
