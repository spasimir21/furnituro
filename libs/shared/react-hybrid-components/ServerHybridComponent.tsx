import { stringifyHybridHtml, toHybridHtml } from '@libs/shared/ssr';
import { HybridComponentOptions } from './HybridComponentOptions';
import { parse as parseHTML } from 'node-html-parser';
import React, { Suspense } from 'react';

const TARGET_ATTRIBUTE = 'rhc-target';

function generateTargetScriptHtml(sortedKeys: string[]) {
  return sortedKeys.map(key => `<div rhc-tes="${key}"></div>`).join('');
}

function getSortedKeysFromHtml(html: string) {
  const parsedHtml = parseHTML(html);

  return parsedHtml
    .querySelectorAll(`[${TARGET_ATTRIBUTE}]`)
    .map(element => element.getAttribute(TARGET_ATTRIBUTE)!)
    .sort((a, b) => a.localeCompare(b));
}

function ServerHybridComponent<TProps>(options: HybridComponentOptions<TProps>) {
  const sortedKeys = getSortedKeysFromHtml(options.html);
  const targetScriptHtml = generateTargetScriptHtml(sortedKeys);

  const targetScriptElement = (
    <script type='rhc/script' dangerouslySetInnerHTML={{ __html: targetScriptHtml }}></script>
  );

  const slots =
    typeof options.slots === 'function'
      ? Object.fromEntries(sortedKeys.map(key => [key, (context: any) => context[key]]))
      : options.slots ?? {};

  const hybridHtml = toHybridHtml<Record<string, React.ReactElement>>(TARGET_ATTRIBUTE, options.html, slots);

  return (props: TProps) => {
    let container = options.container();

    const htmlContext = typeof options.slots === 'function' ? options.slots(props) : undefined;

    container = {
      ...container,
      props: {
        ...container.props,
        dangerouslySetInnerHTML: { __html: stringifyHybridHtml(hybridHtml, htmlContext as any) }
      }
    };

    return (
      <>
        <script></script>
        <Suspense>
          {container}
          {targetScriptElement}
        </Suspense>
      </>
    );
  };
}

export { ServerHybridComponent };
