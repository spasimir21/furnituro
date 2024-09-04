type Slots = Record<string, React.ReactElement>;

interface HybridComponentHydrator<TProps, THook> {
  hook?: (props: TProps) => THook;
  onInitialHtml: (container: HTMLElement, hookResult: THook) => void;
}

interface HybridComponentOptions<TProps, THydrateHook = any> {
  memo?: boolean;
  html: string;
  container: () => React.ReactElement;
  slots?: Slots | ((props: TProps) => Slots);
  hydrators?: HybridComponentHydrator<TProps, THydrateHook>[];
}

export { HybridComponentOptions, HybridComponentHydrator };
