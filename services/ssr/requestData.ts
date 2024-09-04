import { unwrapResultWithNull, wrapResult } from '@libs/shared/utils/result';
import { UserData, UserDataSchema } from '@services/auth/dto/userData.dto';
import { SSRRenderOptions, renderSSR } from '@libs/shared/ssr';
import { lightTheme } from '@frontend/components/ThemeToggler';
import * as cookie from 'cookie';

declare module '@libs/shared/ssr' {
  interface SSRPageHybridHtmlContext {
    theme?: string;
  }
}

interface RequestData {
  theme: string;
  userData: UserData | null;
}

function getDataFromRequest(request: any): RequestData {
  const cookies = cookie.parse(request.headers?.cookie ?? '');

  const userDataResult = wrapResult(() => UserDataSchema.parse(JSON.parse(cookies.userData)));

  return {
    theme: cookies.theme ?? lightTheme,
    userData: unwrapResultWithNull(userDataResult)
  };
}

function renderSSRWithRequestData<TData>(request: any, options: SSRRenderOptions<TData>) {
  const requestData = getDataFromRequest(request);

  return renderSSR<TData & RequestData>({
    ...options,
    data: { ...options.data, ...requestData },
    fields: { ...(options?.fields ?? {}), theme: requestData.theme }
  });
}

export { renderSSRWithRequestData, getDataFromRequest };
