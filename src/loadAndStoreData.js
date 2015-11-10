import RouteAggregator from 'react-router-relay/lib/RouteAggregator';
import {loadAndStoreData} from 'isomorphic-relay';

export default function(renderProps) {
    const routeAggregator = new RouteAggregator();
    routeAggregator.updateRoute(renderProps);

    return loadAndStoreData({Component: routeAggregator, route: routeAggregator.route});
}
