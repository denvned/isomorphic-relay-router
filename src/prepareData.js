import IsomorphicRelay from 'isomorphic-relay';
import RouteAggregator from 'react-router-relay/lib/RouteAggregator';
import render from './render';

export default function prepareData(renderProps, networkLayer) {
  // HACK: workaround for https://github.com/denvned/isomorphic-relay-router/issues/26
  renderProps.router.replace(renderProps.location);

  const routeAggregator = new RouteAggregator();
  routeAggregator.updateRoute(renderProps);

  return IsomorphicRelay.prepareData(
    {
      Container: routeAggregator,
      queryConfig: routeAggregator.route,
    },
    networkLayer
  ).then(({ data, props: { environment, initialReadyState } }) => ({
    data,
    props: {
      ...renderProps,
      environment,
      initialReadyState,
      render,
      routeAggregator,
    },
  }));
}
