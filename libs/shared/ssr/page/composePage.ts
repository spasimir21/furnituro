import { elementToPageHybridHtml } from './elementToPageHybridHtml';
import { optimizeHybridHtml } from '../hybridHtml';
import { isLayoutContent, isSuspendedLayoutContent } from '../LayoutContent';
import { SSRPage } from './page';
import React from 'react';

function composePage(rootPage: SSRPage, ...elements: React.ReactElement[]): SSRPage {
  const page: SSRPage = {
    layoutElements: [...rootPage.layoutElements],
    hybridHtml: [...rootPage.hybridHtml]
  };

  for (const element of elements) {
    if (page.layoutElements.length > 0) {
      page.layoutElements.unshift(element);
      continue;
    }

    const layoutContentIndex = page.hybridHtml.findIndex(
      part => React.isValidElement(part) && (isLayoutContent(part) || isSuspendedLayoutContent(part))
    );

    if (layoutContentIndex == -1) {
      page.layoutElements.push(element);
      continue;
    }

    const elementHybridHtml = elementToPageHybridHtml(element);

    if (isSuspendedLayoutContent(page.hybridHtml[layoutContentIndex] as any)) {
      elementHybridHtml.unshift('<!--$-->');
      elementHybridHtml.push('<!--/$-->');
    }

    page.hybridHtml.splice(layoutContentIndex, 1, ...elementHybridHtml);
  }

  page.hybridHtml = optimizeHybridHtml(page.hybridHtml);

  return page;
}

export { composePage };
