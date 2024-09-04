import { useHideNotification } from './Notifications';
import React from 'react';

export default function HideNotificationButton({ notificationAtom }: { notificationAtom: any }) {
  const hideNotification = useHideNotification(notificationAtom);

  return (
    <button
      type='button'
      className='absolute text-sm top-1 left-3 font-semibold cursor-pointer text-gray-800'
      onClick={() => hideNotification()}
    >
      ✕
    </button>
  );
}
