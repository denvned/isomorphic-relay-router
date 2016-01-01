// load before "react-relay" to prevent "self is not defined"
import 'isomorphic-relay';
import IsomorphicRelayRouter from './IsomorphicRelayRouter';
import IsomorphicRelayRouterContext from './IsomorphicRelayRouterContext';
import prepareData from './prepareData';

export default {
    prepareData,
    Router: IsomorphicRelayRouter,
    RouterContext: IsomorphicRelayRouterContext,
};
