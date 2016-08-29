import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicQueryAggregator from './IsomorphicQueryAggregator';

export default function prepareData(renderProps, networkLayer) {
  const queryAggregator = new IsomorphicQueryAggregator(renderProps);

  return IsomorphicRelay.prepareData(
    {
      Container: queryAggregator.Container,
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
    },
  }));
}
