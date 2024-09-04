import type { AuthToken } from '@services/auth/service/auth.token.service';
import { sharedAtomic } from '@libs/client/utils/sharedAtomic';
import {
  FetchExecutorInput,
  HTTPError,
  _delete,
  catchHttpError,
  combine,
  endpoint,
  endpoints,
  fetchExecutor,
  fetchInit,
  header,
  jsonBody,
  jsonResponse,
  patch,
  path,
  post,
  sendRequest,
  service,
  textResponse,
  toHttpError,
  withConfig
} from '@libs/client/requestr';
import { getSSRDataValue, isClient } from '@libs/shared/ssr';
import { Service } from './services';
import { EmailLoginDto } from '@services/auth/dto/emailLogin.dto';
import { EmailRegisterDto } from '@services/auth/dto/emailRegister.dto';
import { RefreshSecretDto } from '@services/auth/dto/refreshSecret.dto';
import { TokenData } from '@services/auth/interface/tokenData.interface';
import { UserInfoDto } from '@services/auth/dto/userInfo.dto';
import { APP_STORE } from '@frontend/store';
import { IToken, isTokenExpired } from '@libs/server/token/IToken';
import { unwrapResultSafe, unwrapResultWithNull, wrapResult, wrapResultAsync } from '@libs/shared/utils/result';
import { Base64 } from 'js-base64';
import { atomicRecord } from '@libs/shared/utils/atomicRecord';
import { UserData } from '@services/auth/dto/userData.dto';
import { deleteCookie, getCookie, setCookie } from '@libs/client/cookies';
import { hydratedAtom } from '@libs/client/hydratedAtom';
import { AccessCodeDto } from '@services/auth/dto/accessCode.dto';

const AUTH_TOKEN_LOCAL_STORAGE_KEY = '$authToken';

const USER_DATA_COOKIE = 'userData';

interface ParsedAuthToken {
  token: IToken<TokenData>;
  refreshSecret: string;
}

const userDataAtom = hydratedAtom<UserData | null>(() => {
  const ssrUserData = getSSRDataValue<UserData | null>('userData', null);
  return ssrUserData ?? unwrapResultWithNull(wrapResult(() => JSON.parse(getCookie(USER_DATA_COOKIE, 'null'))));
}, APP_STORE);

function loadAuthTokenFromLocalStorage(): ParsedAuthToken | null {
  if (getCookie(USER_DATA_COOKIE, '').trim().length === 0) {
    localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, 'null');
    return null;
  }

  const tokenString = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
  if (tokenString == null) return null;
  return JSON.parse(tokenString);
}

function parseToken(token: string): IToken<TokenData> {
  return {
    raw: token,
    data: JSON.parse(Base64.decode(token.split('.')[1]))
  };
}

function parseAuthToken(token: AuthToken): ParsedAuthToken {
  return {
    token: parseToken(token.token),
    refreshSecret: token.refreshSecret
  };
}

const AuthToken = sharedAtomic<ParsedAuthToken | null>(
  '$sharedAuthToken',
  loadAuthTokenFromLocalStorage,
  async oldToken => {
    const result = await wrapResultAsync(async () => {
      if (oldToken == null) throw new Error();
      return await sendRequest(
        refreshTokenRequest,
        { refreshSecret: oldToken.refreshSecret },
        { token: oldToken.token.raw }
      );
    });

    const newToken = unwrapResultWithNull(result);

    return newToken != null ? parseAuthToken(newToken) : null;
  },
  (newToken, isFromSelf) => {
    if (isFromSelf) {
      localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, JSON.stringify(newToken));

      if (newToken == null) deleteCookie(USER_DATA_COOKIE);
      else setCookie(USER_DATA_COOKIE, JSON.stringify(newToken.token.data.userData));
    }

    APP_STORE.set(userDataAtom, newToken == null ? null : newToken.token.data.userData);
  }
);

const refreshAuthenticationToken = () => AuthToken.update();

async function setAuthenticationToken(token: AuthToken | null) {
  const authToken = token != null ? parseAuthToken(token) : null;

  await AuthToken.set(authToken);
  return authToken;
}

const serviceTokenRequest = (serviceName: string) =>
  endpoint<void, string>({
    request: combine(fetchInit, service(serviceName), post, path('/token')),
    executor: authenticatedExecutor,
    response: combine(catchHttpError, textResponse),
    error: toHttpError
  });

const ServiceTokenRequests: Record<string, ReturnType<typeof serviceTokenRequest>> = {};

const ServiceAuthTokens = atomicRecord<IToken<TokenData> | null>(async service => {
  if (!(service in ServiceTokenRequests)) ServiceTokenRequests[service] = serviceTokenRequest(service);

  const result = await wrapResultAsync(() => sendRequest(ServiceTokenRequests[service], undefined, {}));

  return unwrapResultSafe(
    result,
    token => parseToken(token),
    () => null
  );
});

const serviceAuthenticationHeader = (service: string) =>
  header('Authorization', async () => {
    const token = await ServiceAuthTokens.get(service);
    return token ? `Bearer ${token.raw}` : undefined;
  });

const authenticationHeader = header('Authorization', async () => {
  const authToken = await AuthToken.get();
  return authToken ? `Bearer ${authToken.token.raw}` : undefined;
});

function serviceAuthenticatedExecutor(service: Service) {
  const serviceAuthHeader = serviceAuthenticationHeader(service);

  return async (request: FetchExecutorInput) => {
    const authToken = await ServiceAuthTokens.get(service);

    if (authToken && !isTokenExpired(authToken)) {
      const res = await fetchExecutor(await serviceAuthHeader(request, {}, {}));
      if (res.status !== 403) return res;
    }

    await ServiceAuthTokens.update(service);

    return await fetchExecutor(await serviceAuthHeader(request, {}, {}));
  };
}

async function authenticatedExecutor(request: FetchExecutorInput) {
  const authToken = await AuthToken.get();

  if (authToken && !isTokenExpired(authToken.token)) {
    const res = await fetchExecutor(await authenticationHeader(request, {}, {}));
    if (res.status !== 403) return res;
  }

  await AuthToken.update();

  const res = await fetchExecutor(await authenticationHeader(request, {}, {}));

  if (res.status === 403)
    window.location.href = `/auth/login?redirectPath=${encodeURIComponent(window.location.pathname)}`;

  return res;
}

const refreshTokenRequest = endpoint<RefreshSecretDto, AuthToken, HTTPError, { token: string }>({
  request: combine(
    fetchInit,
    service(Service.Auth),
    path('/refresh'),
    post,
    jsonBody,
    header('Authorization', config => `Bearer ${config.token}`)
  ),
  response: combine(catchHttpError, jsonResponse),
  error: toHttpError
});

const authEndpoints = endpoints(
  {
    request: service(Service.Auth)
  },
  {
    oauth: endpoints(
      withConfig<{}>({
        request: combine(path('/oauth'), post, jsonBody),
        response: jsonResponse
      }),
      {
        google: endpoint<AccessCodeDto, AuthToken>({
          request: path('/google')
        })
      }
    ),
    email: endpoints(
      withConfig<{}>({
        request: combine(path('/email'), post, jsonBody),
        response: jsonResponse
      }),
      {
        login: endpoint<EmailLoginDto, AuthToken>({ request: path('/login') }),
        register: endpoint<EmailRegisterDto, AuthToken>({ request: path('/register') })
      }
    ),
    logout: endpoint<void, void>({
      request: combine(path('/logout'), _delete),
      executor: authenticatedExecutor
    })
  }
);

export {
  setAuthenticationToken,
  refreshAuthenticationToken,
  authEndpoints,
  serviceAuthenticatedExecutor,
  userDataAtom
};
