import { isClient } from '@libs/shared/ssr';
import { id } from '@libs/shared/utils/id';

const $CurrentTabId = id();

const TAB_PREFIX = '$tab';

const TAB_KEEPALIVE = 1000;
const TAB_DEAD_TIME = 2500;

function getTabs(): string[] {
  const keysToClear: string[] = [];
  const tabs: string[] = [];

  const keyCount = localStorage.length;
  for (let i = 0; i < keyCount; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(TAB_PREFIX)) continue;

    const lastTabTime = parseInt(localStorage.getItem(key) ?? '0');

    if (Date.now() - lastTabTime > TAB_DEAD_TIME) keysToClear.push(key);
    else tabs.push(key.slice(TAB_PREFIX.length));
  }

  for (const key of keysToClear) localStorage.removeItem(key);

  return tabs;
}

function trackSelf() {
  localStorage.setItem(TAB_PREFIX + $CurrentTabId, Date.now().toString());
}

function untrackSelf() {
  localStorage.removeItem(TAB_PREFIX + $CurrentTabId);
}

function getRandomTab() {
  const tabs = getTabs();
  if (tabs.length <= 1) return null;

  let tabId;

  do tabId = tabs[Math.floor(Math.random() * tabs.length)];
  while (tabId === $CurrentTabId);

  return tabId;
}

if (isClient()) {
  const keepaliveId = setInterval(trackSelf, TAB_KEEPALIVE);

  window.addEventListener('beforeunload', () => {
    clearInterval(keepaliveId);
    untrackSelf();
  });

  trackSelf();
}

export { getRandomTab, $CurrentTabId };
