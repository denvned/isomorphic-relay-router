import Container from 'react-router-relay/lib/Container';
import React from 'react';
import RouteAggregator from 'react-router-relay/lib/RouteAggregator';
import IsomorphicRootComponent from './IsomorphicRootComponent';

export default class IsomorphicContainer extends React.Component {
    static propTypes = {
        Component: React.PropTypes.func.isRequired,
    };

    static contextTypes = {
        routeAggregator: React.PropTypes.instanceOf(RouteAggregator),
    };

    render() {
        const {routeAggregator} = this.context;
        const Component = routeAggregator ? Container : IsomorphicRootComponent;
        return <Component {...this.props} />;
    }
}
