import { GLOBAL_SSR_LAYOUT_ELEMENTS_STACK } from './SSRLayoutElementsStack';
import { SSRPage, SSRPageHybridHtmlContext } from './page/page';
import { GLOBAL_SSR_DATA_STACK } from './SSRDataStack';
import { stringifyHybridHtml } from './hybridHtml';
import { getMetaTags } from './metadata';

interface SSRRenderOptions<TData> {
  page: SSRPage;
  data: TData;
  title: string;
  fields?: Partial<SSRPageHybridHtmlContext>;
  meta?: readonly (readonly [string, string])[];
}

function renderSSR<TData>(options: SSRRenderOptions<TData>) {
  const metaTags = options.meta ? getMetaTags(options.meta) : '';

  const headElements =
    metaTags + `<script id="ssr-data" type="application/json">${JSON.stringify(options.data)}</script>`;

  GLOBAL_SSR_LAYOUT_ELEMENTS_STACK.push([...options.page.layoutElements]);
  GLOBAL_SSR_DATA_STACK.push(options.data);

  const start = Date.now();

  let html = stringifyHybridHtml(options.page.hybridHtml, {
    title: options.title,
    head: headElements,
    ...(options.fields ?? {})
  });

  const time = Date.now() - start;

  html += `<!-- SSR took: ${time}ms -->`;

  GLOBAL_SSR_LAYOUT_ELEMENTS_STACK.pop();
  GLOBAL_SSR_DATA_STACK.pop();

  return html;
}

export { renderSSR, SSRRenderOptions };
