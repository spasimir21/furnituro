import ErrorNotification from '@frontend/components/Notifications/ErrorNotification';
import { notificationAtoms } from '@libs/client/notifications/Notifications';
import { HTTPError } from '@libs/client/requestr';
import { capitalize } from '@libs/shared/utils';
import { APP_STORE } from '@frontend/store';
import React from 'react';

interface SuppressErrorNotificationConfig {
  suppressErrorNotification?: boolean;
}

const errorToMessage = (error: HTTPError) => {
  let message = error.message;
  if (message === 'Validation failed' && error.code === 400) {
    const validationError =
      error.data?.errors?.length > 0
        ? error.data.errors[0]
        : {
            message,
            path: ['request']
          };

    message = `${validationError.path.map((part: any) => capitalize(String(part))).join('.')}: ${
      validationError.message
    }`;
  }

  return message;
};

const sendErrorToNotification = (error: HTTPError, config: SuppressErrorNotificationConfig) => {
  if (config?.suppressErrorNotification === true) return error;

  const message = errorToMessage(error);

  APP_STORE.set(notificationAtoms, {
    type: 'insert',
    value: {
      action: () => {},
      opened: true,
      content: <ErrorNotification message={message} />
    }
  });

  return error;
};

export { SuppressErrorNotificationConfig, sendErrorToNotification, errorToMessage };
