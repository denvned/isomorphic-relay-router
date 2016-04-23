import IsomorphicRelay from 'isomorphic-relay';
import RouteAggregator from 'react-router-relay/lib/RouteAggregator';
import render from './render';

export default function injectPreparedData(environment, renderProps, data) {
  const routeAggregator = new RouteAggregator();
  routeAggregator.updateRoute(renderProps);

  return IsomorphicRelay.injectPreparedData(
    environment,
    {
      Container: routeAggregator,
      queryConfig: routeAggregator.route,
    },
    data
  ).then(({ initialReadyState }) => ({
    ...renderProps,
    environment,
    initialReadyState,
    render,
    routeAggregator,
  }));
}
