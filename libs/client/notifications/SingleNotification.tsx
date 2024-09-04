import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useCloseNotification, NotificationContext, useHideNotification } from './Notifications';
import HideNotificationButton from './HideNotificationButton';
import React from 'react';

export function SingleNotificationParent({ notificationAtom }: { notificationAtom: any }) {
  const [notification, setNotification]: any = useAtom(notificationAtom);
  const hideNotification = useHideNotification(notificationAtom);

  const readyToUseAction = () => {
    notification.action();
    hideNotification();
  };

  useEffect(() => {
    setTimeout(() => hideNotification(), 8000);
  }, []);

  return (
    <div className='relative w-full max-w-sm h-fit'>
      {notification.opened && (
        // <motion.div initial={{ opacity: 0.5, x: -250, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }}>
        <div className='fixed bottom-0 right-0 z-[10000000] p-5 w-[24rem] max-w-screen-sm flex flex-col max-sm:flex-col gap-3 justify-start max-sm:justify-end items-end'>
          {/* <HideNotificationButton notificationAtom={notificationAtom} /> */}
          <NotificationContext.Provider value={{ action: readyToUseAction, atom: notificationAtom }}>
            {notification.content}
          </NotificationContext.Provider>
        </div>
        // </motion.div>
      )}
    </div>
  );
}
