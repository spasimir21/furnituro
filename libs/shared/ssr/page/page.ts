import React from 'react';
import { HybridHtml } from '../hybridHtml';

interface SSRPageHybridHtmlContext {
  title: string;
  head: string;
}

type SSRPageHybridHtml = HybridHtml<SSRPageHybridHtmlContext>;

interface SSRPage {
  layoutElements: React.ReactElement[];
  hybridHtml: SSRPageHybridHtml;
}

export { SSRPage, SSRPageHybridHtml, SSRPageHybridHtmlContext };
