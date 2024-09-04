const html = (strings: TemplateStringsArray, ...values: any[]) => {
  let result = '';

  for (let i = 0; i < values.length; i++) {
    result += strings[i];
    result += values[i].toString();
  }

  result += strings[strings.length - 1];

  return result;
};

export * from './HybridComponentOptions';
export * from './HybridComponent';
export * from './hydrateLinks';

export { html };
