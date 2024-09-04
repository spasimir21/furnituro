import { HybridComponent, html } from '@libs/shared/react-hybrid-components';
import { SuspendedLayoutContent } from '@libs/shared/ssr';
import React from 'react';

import { config } from '@fortawesome/fontawesome-svg-core';
import Notifications from '@libs/client/notifications/Notifications';
import Loading from '@frontend/components/Loading';

config.autoAddCss = false; /* eslint-disable import/first */

const ContentLayout = HybridComponent({
  container: () => <div></div>,
  html: html`
    <div class="h-[80px]"></div>
    <div rhc-target="content" class="min-h-usable-screen relative"></div>
    <div rhc-target="notifications" class="fixed bottom-0 right-0 w-fit h-fit"></div>
  `,
  slots: {
    content: <SuspendedLayoutContent fallback={<Loading />} />,
    notifications: <Notifications />
  }
});

export { ContentLayout };
