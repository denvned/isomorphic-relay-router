import React from 'react';
import useRelay from 'react-router-relay/lib';
import IsomorphicRelayRouterContext from './IsomorphicRelayRouterContext';

export default {
  renderRouterContext: (child, props) => (
    <IsomorphicRelayRouterContext {...props}>
      {child}
    </IsomorphicRelayRouterContext>
  ),

  renderRouteComponent: useRelay.renderRouteComponent,
};
