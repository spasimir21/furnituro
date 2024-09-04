const getMetaTags = (meta: readonly (readonly [string, string])[]) =>
  meta.map(([name, content]) => `<meta name=${JSON.stringify(name)} content=${JSON.stringify(content)} />`).join('\n');

export { getMetaTags };
