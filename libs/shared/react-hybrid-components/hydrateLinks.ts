import { HybridComponentHydrator } from './HybridComponentOptions';
import { NavigateFunction, useNavigate } from 'react-router-dom';

function hydrateLinks(container: HTMLElement, navigate: NavigateFunction) {
  const links = container.querySelectorAll('a');

  for (const link of links) {
    if (link.href.trim().length == 0) continue;

    const href = new URL(link.href);

    if (href.origin !== window.location.origin) continue;

    link.addEventListener('click', e => {
      e.preventDefault();
      navigate(href.pathname);
    });
  }
}

const linksHydrator: HybridComponentHydrator<any, NavigateFunction> = {
  hook: useNavigate,
  onInitialHtml: hydrateLinks
};

export { linksHydrator, hydrateLinks };
