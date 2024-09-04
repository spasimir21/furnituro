import { $CurrentTabId, getRandomTab } from './tabTracker';

interface SharedValue<T> {
  get value(): T | null;
  set value(newValue: T);
  hasValue: boolean;
  close(): void;
}

enum SharedValueMessageType {
  GetRequest,
  GetResponse,
  Set
}

type SharedValueMessage<T> =
  | {
      type: SharedValueMessageType.GetRequest;
      requester: string;
      responder: string;
    }
  | {
      type: SharedValueMessageType.GetResponse;
      requester: string;
      responder: string;
      value: T;
    }
  | {
      type: SharedValueMessageType.Set;
      value: T;
    };

function createSharedValue<T>(
  name: string,
  getInitialValue: () => T,
  onValue: (value: T, isFromSelf: boolean) => void,
  initialLoadTimeout: number = 1000
) {
  const channel = new BroadcastChannel(name);
  let value: T = null as any;

  const sharedValue: SharedValue<T> = {
    get value() {
      return value;
    },
    set value(newValue: T) {
      sendMessage({ type: SharedValueMessageType.Set, value: newValue });
    },
    hasValue: false,
    close() {
      channel.close();
    }
  };

  const onMessage = (message: SharedValueMessage<T>, isFromSelf: boolean) => {
    if (message.type === SharedValueMessageType.Set) {
      value = message.value;
      sharedValue.hasValue = true;
      onValue(value, isFromSelf);
      return;
    }

    if (isFromSelf) return;

    if (message.type === SharedValueMessageType.GetResponse) {
      if (message.requester !== $CurrentTabId) return;

      value = message.value;
      sharedValue.hasValue = true;
      onValue(value, false);
      return;
    }

    if (message.responder !== $CurrentTabId) return;

    sendMessage({
      type: SharedValueMessageType.GetResponse,
      requester: message.requester,
      responder: $CurrentTabId,
      value: value!
    });
  };

  channel.onmessage = (event: MessageEvent<SharedValueMessage<T>>) => onMessage(event.data, false);

  const sendMessage = (message: SharedValueMessage<T>) => {
    onMessage(message, true);
    channel.postMessage(message);
  };

  const tabToLoadFrom = getRandomTab();

  sendMessage(
    tabToLoadFrom == null
      ? {
          type: SharedValueMessageType.Set,
          value: getInitialValue()
        }
      : {
          type: SharedValueMessageType.GetRequest,
          requester: $CurrentTabId,
          responder: tabToLoadFrom
        }
  );

  setTimeout(() => {
    if (sharedValue.hasValue) return;

    sendMessage({
      type: SharedValueMessageType.Set,
      value: getInitialValue()
    });
  }, initialLoadTimeout);

  return sharedValue;
}

export { createSharedValue, SharedValue };
