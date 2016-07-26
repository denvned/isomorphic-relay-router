import IsomorphicRelay from 'isomorphic-relay';
import React from 'react';
import RelayRouterContext from 'react-router-relay/lib/RelayRouterContext';

export default class IsomorphicRelayRouterContext extends RelayRouterContext {
  constructor(props, context) {
    super(props, context);
    if (props.queryAggregator) {
      this.queryAggregator = props.queryAggregator;
    }
  }

  render() {
    return (
      <IsomorphicRelay.Renderer
        {...this.props}
        Container={this.queryAggregator.Container}
        queryConfig={this.queryAggregator.queryConfig}
        render={this.renderCallback}
      />
    );
  }
}

IsomorphicRelayRouterContext.propTypes = RelayRouterContext.propTypes;
IsomorphicRelayRouterContext.childContextTypes = RelayRouterContext.childContextTypes;
IsomorphicRelayRouterContext.defaultProps = RelayRouterContext.defaultProps;
