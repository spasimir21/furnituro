import StandartNotification from './StandartNotification';
import React from 'react';

export default function SuccessNotification({ message }: { message: string }) {
  return <StandartNotification message={message} color='rgba(35, 223, 88, 0.4)' />;
}
