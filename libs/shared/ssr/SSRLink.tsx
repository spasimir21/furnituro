import { Link, useNavigate } from 'react-router-dom';
import { isClient } from './isClient';
import React from 'react';
import useIsInitialRenderPassed from '@libs/client/hooks/useIsInitialRenderPassed';

function ClientSSRLink({ to, children, className }: React.PropsWithChildren<{ to: string; className?: string }>) {
  const navigate = useNavigate();
  return (
    <div className={className} onClick={() => navigate(to)}>
      {children}
    </div>
  );
}

function SSRLink({ to, children, className }: React.PropsWithChildren<{ to: string; className?: string }>) {
  const isInitialRenderPassed = useIsInitialRenderPassed();
  return isInitialRenderPassed ? (
    <ClientSSRLink className={className} to={to}>
      {children}
    </ClientSSRLink>
  ) : (
    <a href={to} className={className}>
      {children}
    </a>
  );
}

export { SSRLink };
