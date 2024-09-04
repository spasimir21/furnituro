import { getSSRDataValue } from '@libs/shared/ssr';
import { useParams } from 'react-router-dom';

export function useRouteParams<T extends string = string>() {
  return getSSRDataValue<Record<T, string>>('params', useParams() as any);
}
