import React from 'react';
import {Router} from 'react-router';
import {RelayRouter} from 'react-router-relay';
import IsomorphicRelayRouterContext from './IsomorphicRelayRouterContext';

export default class IsomorphicRelayRouter extends RelayRouter {
    static displayName = 'IsomorphicRelayRouter';

    renderRouterContext(props) {
        return <IsomorphicRelayRouterContext {...props} />;
    }
}
