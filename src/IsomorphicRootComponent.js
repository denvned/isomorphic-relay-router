import React from 'react';
import RootComponent from 'react-router-relay/lib/RootComponent';
import {IsomorphicRootContainer} from 'isomorphic-relay';

export default class IsomorphicRootComponent extends RootComponent {
    render() {
        return (
            <IsomorphicRootContainer
                Component={this._routeAggregator}
                route={this._routeAggregator.route}
                renderLoading={this.renderLoading}
                renderFetched={this.renderFetched}
                renderFailure={this.renderFailure}
            />
        );
    }
}
