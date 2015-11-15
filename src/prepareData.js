import IsomorphicRelay from 'isomorphic-relay';
import RouteAggregator from 'react-router-relay/lib/RouteAggregator';

export default function prepareData(renderProps) {
    const routeAggregator = new RouteAggregator();
    routeAggregator.updateRoute(renderProps);

    return IsomorphicRelay.prepareData({
        Component: routeAggregator,
        route: routeAggregator.route,
    });
}
