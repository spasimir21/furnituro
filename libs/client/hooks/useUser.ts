import { userDataAtom } from '@frontend/api/auth';
import { useHydratedAtom } from '../hydratedAtom';

export function useUser() {
  return useHydratedAtom(userDataAtom)[0];
}
