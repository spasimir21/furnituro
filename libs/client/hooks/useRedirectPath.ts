import { useSearchParams } from 'react-router-dom';
import { isClient } from '@libs/shared/ssr';

function useRedirectPath() {
  if (!isClient()) return '/';

  const [searchParams] = useSearchParams();
  return searchParams.get('redirectPath') ?? '/';
}

export { useRedirectPath };
