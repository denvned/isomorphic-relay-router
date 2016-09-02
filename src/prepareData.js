import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicQueryAggregator from './IsomorphicQueryAggregator';

export default function prepareData(renderProps, networkLayer, preloadedRequests) {
  const queryAggregator = new IsomorphicQueryAggregator(renderProps);

  return IsomorphicRelay.prepareData(
    {
      Container: queryAggregator.Container,
      queryConfig: queryAggregator.queryConfig,
    },
    networkLayer,
    preloadedRequests
  ).then(({ data, props: { environment, initialReadyState } }) => ({
    data,
    props: {
      ...renderProps,
      environment,
      initialReadyState,
      queryAggregator,
    },
  }));
}
