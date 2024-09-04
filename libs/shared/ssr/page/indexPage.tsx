import { LayoutContent } from '../LayoutContent';
import { HybridHtml } from '../hybridHtml';
import { SSRPage } from './page';
import React from 'react';

const INTERPOLATION_REGEXP = /\$\$\s*(?<key>\w+)\s*(=\s*(?<default>.*?)\s*)?\$\$/g;

function parseIndexHtml(indexSource: string): [string, SSRPage] {
  const interpolations = indexSource.matchAll(INTERPOLATION_REGEXP);
  const hybridHtml: HybridHtml<any> = [];

  let nonSSRSource = '';

  let offset = 0;
  for (const interpolation of interpolations) {
    const stringPart = indexSource.substring(offset, interpolation.index);
    hybridHtml.push(stringPart);
    nonSSRSource += stringPart;

    const _default = interpolation.groups?.default ?? '';
    const key = interpolation.groups?.key.toLowerCase()!;

    nonSSRSource += _default;

    hybridHtml.push(key === 'root' ? <LayoutContent /> : context => context[key] ?? _default);

    offset = (interpolation.index ?? 0) + interpolation[0].length;
  }

  const stringPart = indexSource.substring(offset);
  hybridHtml.push(stringPart);
  nonSSRSource += stringPart;

  return [
    nonSSRSource,
    {
      layoutElements: [],
      hybridHtml
    }
  ];
}

export { parseIndexHtml };
