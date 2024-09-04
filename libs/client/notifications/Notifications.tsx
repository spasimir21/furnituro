import React, { createContext, useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';

import { atom, useAtom } from 'jotai';
import { splitAtom } from 'jotai/utils';
import useIsInitialRenderPassed from '../hooks/useIsInitialRenderPassed';
import { SingleNotificationParent } from './SingleNotification';

interface INotificationAtom {
  opened: boolean;
  content: JSX.Element;
  action: () => void;
}

const notificationAtom = atom<INotificationAtom[]>([
  {
    opened: false,
    content: <></>,
    action: () => {}
  }
]);

export const notificationAtoms = splitAtom(notificationAtom);

export function useCloseNotification() {
  const [_, dispatchNotification] = useAtom(notificationAtoms);

  return useCallback(
    (atom: any) =>
      dispatchNotification({
        type: 'remove',
        value: atom
      } as any),
    []
  );
}

export const useHideNotification = (notificationAtom: any) => {
  const [notification, setNotification]: any = useAtom(notificationAtom);
  const close = useCloseNotification();

  return useCallback(() => {
    setNotification({
      ...notification,
      opened: false
    });
    setTimeout(() => close(notificationAtom), 250);
  }, [notification]);
};

export function useDispatchNotification() {
  const [_, dispatchNotification] = useAtom(notificationAtoms);

  return useCallback(
    (notification: { action: () => void; content: JSX.Element }) =>
      dispatchNotification({
        type: 'insert',
        value: {
          ...(notification as any),
          opened: true
        }
      }),
    []
  );
}

function ClientNotifications() {
  const [notifications, _] = useAtom(notificationAtoms);
  return (
    <div>
      .
      {notifications.map(notification => (
        <SingleNotificationParent notificationAtom={notification} key={Math.random()} />
      ))}
    </div>
  );
}

export default function Notifications() {
  const isInitialRenderPassed = useIsInitialRenderPassed();

  if (!isInitialRenderPassed) return <></>;
  return <ClientNotifications />;
}

export const NotificationContext = createContext<{ action: () => void; atom: any }>({
  action: () => {},
  atom: null
});
