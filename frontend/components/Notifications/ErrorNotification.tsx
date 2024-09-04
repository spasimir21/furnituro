import StandartNotification from './StandartNotification';
import React from 'react';

export default function ErrorNotification({ message }: { message: string }) {
  return <StandartNotification message={message} color='tomato' />;
}
