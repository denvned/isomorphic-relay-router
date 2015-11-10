import RouteAggregator from 'react-router-relay/lib/RouteAggregator';
import {storePreloadedData} from 'isomorphic-relay';

export default function(renderProps, queryResults) {
    const routeAggregator = new RouteAggregator();
    routeAggregator.updateRoute(renderProps);

    return storePreloadedData({Component: routeAggregator, route: routeAggregator.route}, queryResults);
}
