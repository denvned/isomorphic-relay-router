import React from 'react';
import {IsomorphicRootContainer} from 'isomorphic-relay';
import {RelayRoutingContext} from 'react-router-relay';

export default class IsomorphicRelayRoutingContext extends RelayRoutingContext {
    render() {
        return (
            <IsomorphicRootContainer
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
