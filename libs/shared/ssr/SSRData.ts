import { GLOBAL_SSR_DATA_STACK } from './SSRDataStack';
import { isClient } from './isClient';

let SSR_DATA: any = null;

function initializeSSRData() {
  const ssrDataScript = document.querySelector('#ssr-data');
  if (ssrDataScript == null) return;

  SSR_DATA = JSON.parse(ssrDataScript.textContent ?? '{}');
  ssrDataScript.remove();
}

function getSSRDataValue<T>(key: string, defaultValue: T): T {
  if (!isClient()) return (GLOBAL_SSR_DATA_STACK.peek()?.[key] ?? defaultValue) as T;

  return SSR_DATA ? SSR_DATA[key] : defaultValue;
}

function deinitializeSSRData() {
  SSR_DATA = null;
}

const isSSR = () => SSR_DATA != null;

export { SSR_DATA, initializeSSRData, getSSRDataValue, deinitializeSSRData, isSSR };
