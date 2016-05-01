import IsomorphicRelay from 'isomorphic-relay';
import QueryAggregator from 'react-router-relay/lib/QueryAggregator';
import render from './render';

export default function injectPreparedData(environment, renderProps, data) {
  const queryAggregator = new QueryAggregator(renderProps);

  return IsomorphicRelay.injectPreparedData(
    environment,
    {
      Container: queryAggregator,
      queryConfig: queryAggregator.queryConfig,
    },
    data
  ).then(({ initialReadyState }) => ({
    ...renderProps,
    environment,
    initialReadyState,
    queryAggregator,
    render,
  }));
}
