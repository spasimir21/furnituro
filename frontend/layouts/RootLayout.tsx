import { HybridComponent, html } from '@libs/shared/react-hybrid-components';
import Header from '@frontend/components/Header';
import { LayoutContent } from '@libs/shared/ssr';
import React from 'react';

const RootLayout = HybridComponent({
  container: () => <div></div>,
  html: html`
    <div rhc-target="header"></div>
    <div rhc-target="content" class="relative"></div>
  `,
  slots: {
    header: <Header />,
    content: <LayoutContent />
  }
});

export { RootLayout };
