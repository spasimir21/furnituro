import { initializeReactRoot } from '@libs/shared/ssr';
import { APP_STORE } from './store';
import { router } from './router';
import { Provider } from 'jotai';
import React from 'react';
import './liveReload';
import './config';

// Start token syncing between tabs
import './api/auth';

async function main() {
  const root = document.querySelector('#root')!;

  initializeReactRoot(root, <Provider store={APP_STORE}>{router}</Provider>);
}

document.addEventListener('DOMContentLoaded', main);
