import { useState, useEffect } from 'react';

export default function useIsInitialRenderPassed() {
  const [isInitialRenderPassed, setIsInitialRenderPassed] = useState(false);

  useEffect(() => setIsInitialRenderPassed(true), []);

  return isInitialRenderPassed;
}
