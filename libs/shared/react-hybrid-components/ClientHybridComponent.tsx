import React, { Suspense, memo, useEffect, useMemo, useRef, useState } from 'react';
import { HybridComponentOptions } from './HybridComponentOptions';
import { useHydrationStall } from './useHydrationStall';
import { useRerender } from '../utils/useRerender';
import { createPortal } from 'react-dom';
import { isSSR } from '@libs/shared/ssr';

function generateTargetScriptElement(sortedKeys: string[], slots: Record<string, React.ReactElement>) {
  return (
    <script type='rhc/script' suppressHydrationWarning={true}>
      {sortedKeys.map(key => (
        <div suppressHydrationWarning={true} rhc-tes={key} key={key}>
          {slots[key]}
        </div>
      ))}
    </script>
  );
}

function getSortedKeysFromHtml(html: string) {
  const template = document.createElement('template');
  template.innerHTML = html;

  return Array.from(template.content.querySelectorAll('[rhc-target]'))
    .map(element => element.getAttribute('rhc-target')!)
    .sort((a, b) => a.localeCompare(b));
}

function ClientHybridComponent<TProps>(options: HybridComponentOptions<any>) {
  const sortedKeys = getSortedKeysFromHtml(options.html);

  const staticTargetScriptElement =
    typeof options.slots === 'function' ? undefined : generateTargetScriptElement(sortedKeys, options.slots ?? {});

  const useHydratorHooks = (props: any) => {
    if (options.hydrators == null) return undefined;
    return options.hydrators.map(hydrator => hydrator.hook && hydrator.hook(props));
  };

  const hydrate = (container: HTMLElement, hookResults: any[]) => {
    if (options.hydrators == null) return;
    for (let i = 0; i < options.hydrators.length; i++) options.hydrators[i].onInitialHtml(container, hookResults[i]);
  };

  let component = (props: TProps) => {
    const isUsingSSR = useMemo(() => isSSR(), []);

    const hydratorHookResults = useHydratorHooks(props);

    const slots = typeof options.slots === 'function' ? options.slots(props) : options.slots ?? {};

    const targetScriptElement = staticTargetScriptElement ?? generateTargetScriptElement(sortedKeys, slots);

    const rerender = useRerender();

    const [resumeHydration, HydrationStaller] = useHydrationStall();

    const staticHtml = useMemo(() => ({ __html: options.html }), []);

    const targetElements = useMemo<Record<string, HTMLElement>>(() => ({}), []);
    const referenceElement = useRef<HTMLScriptElement>(null);
    const contentElement = useRef<HTMLDivElement>(null);

    const staticPortals = useMemo(() => ({ portals: [] as React.ReactPortal[] }), []);

    const container = useMemo(() => {
      let container = options.container();

      return {
        ...container,
        ref: contentElement,
        props: { ...container.props, dangerouslySetInnerHTML: staticHtml }
      };
    }, []);

    const didRunHydrators = useMemo(() => ({ value: false }), []);

    useEffect(() => {
      if (!isUsingSSR) return;

      const containerDiv = referenceElement.current!.nextElementSibling! as HTMLElement;

      staticHtml.__html = containerDiv.innerHTML;

      resumeHydration();

      if (didRunHydrators.value) return;
      hydrate(containerDiv, hydratorHookResults as any);
      didRunHydrators.value = true;
    }, []);

    useEffect(() => {
      if (contentElement.current == null || isUsingSSR) return;

      if (!didRunHydrators.value) {
        hydrate(contentElement.current, hydratorHookResults as any);
        didRunHydrators.value = true;
      }

      for (const slotName in slots)
        targetElements[slotName] = contentElement.current!.querySelector(`[rhc-target="${slotName}"]`)!;

      if (typeof options.slots === 'object' && staticPortals.portals.length == 0)
        for (const slotName in slots)
          staticPortals.portals.push(createPortal(slots[slotName], targetElements[slotName]));

      rerender();
    }, [contentElement.current]);

    let portals = undefined as any;

    if (isUsingSSR) void 0;
    else if (typeof slots.options === 'object' && staticPortals.portals.length > 0) portals = staticPortals.portals;
    else {
      portals = [];
      for (const key in targetElements) portals.push(createPortal(slots[key], targetElements[key]));
    }

    return isUsingSSR ? (
      <>
        <script ref={referenceElement}></script>
        <Suspense>
          <HydrationStaller />
          {container}
          {targetScriptElement}
        </Suspense>
      </>
    ) : (
      <>
        {container}
        {portals}
      </>
    );
  };

  if (options.memo !== false) component = memo(component) as any;

  return component;
}

export { ClientHybridComponent };
