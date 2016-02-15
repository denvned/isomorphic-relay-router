import IsomorphicRelay from 'isomorphic-relay';
import React from 'react';
import {RelayRouterContext} from 'react-router-relay';

export default class IsomorphicRelayRouterContext extends RelayRouterContext {
    static displayName = 'IsomorphicRelayRouterContext';
    // Static members are not inherited on <IE11. So, we have to redefine them.
    static propTypes = RelayRouterContext.propTypes;
    static childContextTypes = RelayRouterContext.childContextTypes;
    static defaultProps = RelayRouterContext.defaultProps;

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
