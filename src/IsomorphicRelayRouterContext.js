import IsomorphicRelay from 'isomorphic-relay';
import React from 'react';
import {RelayRouterContext} from 'react-router-relay';

export default class IsomorphicRelayRouterContext extends RelayRouterContext {
    constructor(props, context) {
        super(props, context);
        if (props.routeAggregator) {
            this._routeAggregator = props.routeAggregator;
        }
    }

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

IsomorphicRelayRouterContext.propTypes = RelayRouterContext.propTypes;
IsomorphicRelayRouterContext.childContextTypes = RelayRouterContext.childContextTypes;
IsomorphicRelayRouterContext.defaultProps = RelayRouterContext.defaultProps;
