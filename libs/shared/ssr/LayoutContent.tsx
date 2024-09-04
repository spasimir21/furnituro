import { GLOBAL_SSR_LAYOUT_ELEMENTS_STACK } from './SSRLayoutElementsStack';
import { Outlet } from 'react-router-dom';
import React, { Suspense } from 'react';
import { isClient } from './isClient';

function LayoutContent() {
  if (isClient()) return <Outlet />;

  const layoutElements = GLOBAL_SSR_LAYOUT_ELEMENTS_STACK.peek() as React.ReactElement[];

  if (layoutElements == null || layoutElements.length == 0) return <div ssr-layout-content=''></div>;

  return layoutElements.pop()!;
}

function SuspendedLayoutContent({ fallback }: { fallback?: React.ReactElement }) {
  return (
    <Suspense fallback={fallback}>
      <LayoutContent />
    </Suspense>
  );
}

const isLayoutContent = (element: React.ReactElement) => element.type === LayoutContent;

const isSuspendedLayoutContent = (element: React.ReactElement) => element.type === SuspendedLayoutContent;

export { LayoutContent, SuspendedLayoutContent, isLayoutContent, isSuspendedLayoutContent };
