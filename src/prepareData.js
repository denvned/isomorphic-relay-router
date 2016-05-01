import IsomorphicRelay from 'isomorphic-relay';
import QueryAggregator from 'react-router-relay/lib/QueryAggregator';
import render from './render';

export default function prepareData(renderProps, networkLayer) {
  const queryAggregator = new QueryAggregator(renderProps);

  return IsomorphicRelay.prepareData(
    {
      Container: queryAggregator,
      queryConfig: queryAggregator.queryConfig,
    },
    networkLayer
  ).then(({ data, props: { environment, initialReadyState } }) => ({
    data,
    props: {
      ...renderProps,
      environment,
      initialReadyState,
      queryAggregator,
      render,
    },
  }));
}
