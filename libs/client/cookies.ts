import { isClient } from '../shared/ssr';

export function getCookie(cookiename: string, defaultValue: string) {
  if (!isClient()) return defaultValue;

  const cookiestring = RegExp(cookiename + '=[^;]+').exec(document.cookie);

  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, '') : defaultValue);
}

export function setCookie(cookiename: string, value: string, expirationDays: number = 7) {
  if (!isClient()) return;

  document.cookie = `${cookiename}=${encodeURIComponent(value)}; max-age=${expirationDays * 24 * 60 * 60}; path=/`;
}

export function deleteCookie(cookiename: string) {
  document.cookie = cookiename + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
}
