import { useCallback, useState } from 'react';

function useRerender() {
  const [_, setBool] = useState(false);

  return useCallback(() => {
    setBool(bool => !bool);
  }, [setBool]);
}

export { useRerender };
