import IsomorphicRelay from 'isomorphic-relay';
import React from 'react';
import RelayRouterContext from 'react-router-relay/lib/RelayRouterContext';

export default class IsomorphicRelayRouterContext extends RelayRouterContext {
  constructor(props, context) {
    super(props, context);
    if (props.routeAggregator) {
      this._routeAggregator = props.routeAggregator;
    }
  }

  render() {
    return (
      <IsomorphicRelay.Renderer
        {...this.props}
        Container={this._routeAggregator}
        queryConfig={this._routeAggregator.route}
        render={({ done, error, props, retry, stale }) => {
          if (error) {
            return this.renderFailure(error, retry);
          } else if (props) {
            return this.renderFetched(props, { done, stale });
          } else {
            return this.renderLoading();
          }
        }}
      />
    );
  }
}

IsomorphicRelayRouterContext.propTypes = RelayRouterContext.propTypes;
IsomorphicRelayRouterContext.childContextTypes = RelayRouterContext.childContextTypes;
IsomorphicRelayRouterContext.defaultProps = RelayRouterContext.defaultProps;
