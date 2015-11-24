import IsomorphicRelay from 'isomorphic-relay';
import React from 'react';
import {RelayRoutingContext} from 'react-router-relay';

export default class IsomorphicRelayRoutingContext extends RelayRoutingContext {
    static displayName = 'IsomorphicRelayRoutingContext';
    // Static members are not inherited on <IE11. So, we have to redefine them.
    static propTypes = RelayRoutingContext.propTypes;
    static childContextTypes = RelayRoutingContext.childContextTypes;
    static defaultProps = RelayRoutingContext.defaultProps;

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
