import React from 'react';
import {Router} from 'react-router';
import {RelayRouter} from 'react-router-relay';
import IsomorphicRelayRoutingContext from './IsomorphicRelayRoutingContext';

export default class IsomorphicRelayRouter extends RelayRouter {
    render() {
        return (
            <Router
                {...this.props}
                RoutingContext={IsomorphicRelayRoutingContext}
            />
        );
    }
}
