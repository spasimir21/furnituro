import { parse as parseHTML } from 'node-html-parser';
import { renderToString } from 'react-dom/server';

const $HYBRID_SLOT$ = '$HYBRID_SLOT$';

type HybridHtmlRenderable = string | React.ReactElement;

type HybridHtmlPart<TContext> = HybridHtmlRenderable | ((context: TContext) => HybridHtmlRenderable);

type HybridHtml<TContext> = HybridHtmlPart<TContext>[];

function toHybridHtml<TContext = void>(
  targetAttribute: string,
  staticHtml: string,
  slots: Record<string, HybridHtmlPart<TContext>>
) {
  const elements: HybridHtmlPart<TContext>[] = [];

  const parsedHtml = parseHTML(staticHtml);

  const targetElements = parsedHtml.querySelectorAll(`[${targetAttribute}]`);
  for (const targetElement of targetElements) {
    elements.push(slots[targetElement.getAttribute(targetAttribute)!]);
    targetElement.set_content($HYBRID_SLOT$);
  }

  const strings = parsedHtml.toString().split($HYBRID_SLOT$);

  const parts: HybridHtml<TContext> = [];

  for (let i = 0; i < elements.length; i++) parts.push(strings[i], elements[i]);
  parts.push(strings.at(-1)!);

  return parts;
}

function optimizeHybridHtml<T>(hybridHtml: HybridHtml<T>): HybridHtml<T> {
  const newHybridHtml = [] as HybridHtml<T>;

  let isLastElementString = false;
  for (const part of hybridHtml) {
    if (typeof part !== 'string') {
      newHybridHtml.push(part);
      isLastElementString = false;
      continue;
    }

    if (isLastElementString) newHybridHtml[newHybridHtml.length - 1] += part;
    else newHybridHtml.push(part);

    isLastElementString = true;
  }

  return newHybridHtml;
}

function stringifyHybridHtml<TContext>(hybridHtml: HybridHtml<TContext>, context: TContext) {
  let html = '';

  for (let part of hybridHtml) {
    if (typeof part === 'function') part = part(context);
    html += typeof part === 'string' ? part : renderToString(part);
  }

  return html;
}

export { HybridHtml, toHybridHtml, stringifyHybridHtml, optimizeHybridHtml };
