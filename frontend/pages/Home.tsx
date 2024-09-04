import { useUser } from '@libs/client/hooks/useUser';
import React from 'react';

export default function Home() {
  const userData = useUser();

  return (
    <>
      <p>{userData == null ? "You're not logged in!" : userData.fullname}</p>
    </>
  );
}
