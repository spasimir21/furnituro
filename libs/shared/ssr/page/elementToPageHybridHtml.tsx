import { componentHasConstantInitialRender } from '../constantInitialRender';
import { parse as parseHTML } from 'node-html-parser';
import { renderToString } from 'react-dom/server';
import { LayoutContent } from '../LayoutContent';
import {
  HybridComponentOptions,
  getHybridComponentOptions,
  isHybridComponent
} from '@libs/shared/react-hybrid-components';
import { toHybridHtml } from '../hybridHtml';
import { SSRPageHybridHtml } from './page';
import React from 'react';

function constantInitialRenderElementToPageHybridHtml(element: React.ReactElement): SSRPageHybridHtml {
  const html = renderToString(element);

  const parsedHtml = parseHTML(html);

  const layoutContentElement = parsedHtml.querySelector('[ssr-layout-content]');
  if (layoutContentElement == null) return [html];

  return [html.slice(0, layoutContentElement.range[0]), <LayoutContent />, html.slice(layoutContentElement.range[1])];
}

const HYBRID_ELEMENT_TARGET_ATTRIBUTE = 'rhc-target';

function generateHybridElementHybridHtmlWrapper(options: HybridComponentOptions<any>): [string, string] {
  const containerHtml = parseHTML(renderToString(options.container()));
  // @ts-ignore
  containerHtml.firstChild.set_content('$CONTAINER_SPLIT$');

  const splitContainer = containerHtml.toString().split('$CONTAINER_SPLIT$');

  const targetScriptInnerHtml = Object.keys(options.slots ?? {})
    .sort((a, b) => a.localeCompare(b))
    .map(key => `<div rhc-tes="${key}"></div>`)
    .join('');

  return [
    `<script></script><!--$-->${splitContainer[0]}`,
    `${splitContainer[1]}<script type="rhc/script">${targetScriptInnerHtml}</script><!--/$-->`
  ];
}

function hybridElementToPageHybridHtml(element: React.ReactElement): SSRPageHybridHtml {
  const options = getHybridComponentOptions(element);

  if (typeof options.slots === 'function') return [element];

  let hybridHtml = toHybridHtml<any>(HYBRID_ELEMENT_TARGET_ATTRIBUTE, options.html, options.slots ?? {});

  hybridHtml = hybridHtml
    .map(part => {
      if (!React.isValidElement(part)) return part;
      return elementToPageHybridHtml(part);
    })
    .flat();

  const wrapper = generateHybridElementHybridHtmlWrapper(options);

  return [wrapper[0], ...hybridHtml, wrapper[1]];
}

function elementToPageHybridHtml(element: React.ReactElement): SSRPageHybridHtml {
  if (componentHasConstantInitialRender(element)) return constantInitialRenderElementToPageHybridHtml(element);
  if (isHybridComponent(element)) return hybridElementToPageHybridHtml(element);
  return [element];
}

export { elementToPageHybridHtml };
