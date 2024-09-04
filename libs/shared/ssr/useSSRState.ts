import { getSSRDataValue } from './SSRData';
import { isClient } from './isClient';
import { useState } from 'react';

function useSSRState<T>(name: string, defaultValue: T) {
  const value = getSSRDataValue<T>(name, defaultValue);

  if (!isClient()) return [value, (value: T | ((prevValue: T) => T)) => {}] as const;

  return useState<T>(value);
}

export { useSSRState };
