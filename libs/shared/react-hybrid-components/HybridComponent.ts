import { HybridComponentOptions } from './HybridComponentOptions';
import { ClientHybridComponent } from './ClientHybridComponent';
import { ServerHybridComponent } from './ServerHybridComponent';
import { isClient } from '@libs/shared/ssr';
import React from 'react';

const $HYBRID_COMPONENT_OPTIONS$ = Symbol('$HYBRID_COMPONENT_OPTIONS$');
const $IS_HYBRID_COMPONENT$ = Symbol('$IS_HYBRID_COMPONENT$');

function markHybridComponent(component: any, options: HybridComponentOptions<any>) {
  component[$IS_HYBRID_COMPONENT$] = true;
  component[$HYBRID_COMPONENT_OPTIONS$] = options;
}

const isHybridComponent = (element: React.ReactElement) => (element.type as any)?.[$IS_HYBRID_COMPONENT$] === true;

const getHybridComponentOptions = (element: React.ReactElement) =>
  (element.type as any)?.[$HYBRID_COMPONENT_OPTIONS$] as HybridComponentOptions<any>;

function HybridComponent<TProps>(options: HybridComponentOptions<TProps>) {
  const component = isClient() ? ClientHybridComponent(options) : ServerHybridComponent(options);
  markHybridComponent(component, options);
  return component;
}

export { HybridComponent, markHybridComponent, isHybridComponent, getHybridComponentOptions };
