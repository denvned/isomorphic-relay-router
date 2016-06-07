import React from 'react';
import { applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import IsomorphicRelayRouterContext from './IsomorphicRelayRouterContext';

export default function(props, otherMiddleware = []) {
  const render = applyRouterMiddleware(...otherMiddleware, {
    renderRouterContext: (child, props) => (
      <IsomorphicRelayRouterContext {...props}>
        {child}
      </IsomorphicRelayRouterContext>
    ),

    renderRouteComponent: useRelay.renderRouteComponent,
  });

  return (!!props) ? render(props) : render;
}
