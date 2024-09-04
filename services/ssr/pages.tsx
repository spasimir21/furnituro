import { ContentLayout } from '@frontend/layouts/ContentLayout';
import { RootLayout } from '@frontend/layouts/RootLayout';
import { composePage, SSRPage } from '@libs/shared/ssr';
import React from 'react';

function createPages(indexLayout: SSRPage) {
  const rootLayout = composePage(indexLayout, <RootLayout />);

  const contentLayout = composePage(rootLayout, <ContentLayout />);

  return {} as const;
}

export { createPages };
