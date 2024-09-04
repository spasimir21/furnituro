import { useLocation, Navigate } from 'react-router-dom';
import { useUser } from './hooks/useUser';
import React from 'react';

function ProtectedRoute({ element }: { element: React.JSX.Element }) {
  const location = useLocation();
  const userData = useUser();

  return userData ? element : <Navigate to={`/auth/login?redirectPath=${encodeURIComponent(location.pathname)}`} />;
}

export { ProtectedRoute };
