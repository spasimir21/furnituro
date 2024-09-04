import { initializeSSRData, isSSR } from './SSRData';
import ReactDOM from 'react-dom/client';
import { ReactElement } from 'react';
import './historyPatch';

function initializeReactRoot(container: Element, element: ReactElement) {
  initializeSSRData();

  if (isSSR()) ReactDOM.hydrateRoot(container, element);
  else ReactDOM.createRoot(container).render(element);
}

export { initializeReactRoot };
