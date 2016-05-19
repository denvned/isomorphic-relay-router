import React from 'react';
import { applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import IsomorphicRelayRouterContext from './IsomorphicRelayRouterContext';

export default function(propsOrMiddleware = []) {
  if (propsOrMiddleware.render) {
    return propsOrMiddleware.render(propsOrMiddleware);
  }

  return applyRouterMiddleware(...propsOrMiddleware, {
    renderRouterContext: (child, props) => (
      <IsomorphicRelayRouterContext {...props}>
        {child}
      </IsomorphicRelayRouterContext>
    ),

    renderRouteComponent: useRelay.renderRouteComponent,
  });
}
