import IsomorphicRelay from 'isomorphic-relay';
import QueryAggregator from 'react-router-relay/lib/QueryAggregator';
import render from './render';

export default function prepareInitialRender(environment, renderProps, otherMiddleware) {
  const queryAggregator = new QueryAggregator(renderProps);

  return IsomorphicRelay.prepareInitialRender({
    environment,
    Container: queryAggregator,
    queryConfig: queryAggregator.queryConfig,
  }).then(({ initialReadyState }) => ({
    ...renderProps,
    environment,
    initialReadyState,
    queryAggregator,
    render: render(null, otherMiddleware),
  }));
}
