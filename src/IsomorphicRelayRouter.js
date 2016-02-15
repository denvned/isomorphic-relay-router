import React from 'react';
import {RelayRouter} from 'react-router-relay';
import IsomorphicRelayRouterContext from './IsomorphicRelayRouterContext';

export default class IsomorphicRelayRouter extends RelayRouter {
    renderRouterContext(props) {
        return <IsomorphicRelayRouterContext {...props} />;
    }
}
