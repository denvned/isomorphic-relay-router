import QueryAggregator from 'react-router-relay/lib/QueryAggregator';
import getAggregateContainer from './getAggregateContainer';

export default class IsomorphicQueryAggregator extends QueryAggregator {
  updateQueryConfig(routerProps) {
    super.updateQueryConfig(routerProps);

    this.Container = getAggregateContainer(this.fragmentSpecs);
  }
}
