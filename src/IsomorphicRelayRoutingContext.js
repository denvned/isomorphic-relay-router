import IsomorphicRelay from 'isomorphic-relay';
import React from 'react';
import {RelayRoutingContext} from 'react-router-relay';

export default class IsomorphicRelayRoutingContext extends RelayRoutingContext {
    render() {
        return (
            <IsomorphicRelay.RootContainer
                {...this.props}
                Component={this._routeAggregator}
                renderFailure={this.renderFailure}
                renderFetched={this.renderFetched}
                renderLoading={this.renderLoading}
                route={this._routeAggregator.route}
            />
        );
    }
}
