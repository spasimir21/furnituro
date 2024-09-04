const $HAS_CONSTANT_INITIAL_RENDER$ = Symbol('$HAS_CONSTANT_INITIAL_RENDER$');

function markComponentHasConstantInitialRender(component: any) {
  component[$HAS_CONSTANT_INITIAL_RENDER$] = true;
}

const componentHasConstantInitialRender = (element: React.ReactElement) =>
  (element.type as any)?.[$HAS_CONSTANT_INITIAL_RENDER$] === true;

export { markComponentHasConstantInitialRender, componentHasConstantInitialRender };
