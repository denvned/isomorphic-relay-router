import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicQueryAggregator from './IsomorphicQueryAggregator';
import render from './render';

export default function prepareInitialRender(environment, renderProps) {
  const queryAggregator = new IsomorphicQueryAggregator(renderProps);

  return IsomorphicRelay.prepareInitialRender({
    environment,
    Container: queryAggregator.Container,
    queryConfig: queryAggregator.queryConfig,
  }).then(({ initialReadyState }) => ({
    ...renderProps,
    environment,
    initialReadyState,
    queryAggregator,
    render,
  }));
}
