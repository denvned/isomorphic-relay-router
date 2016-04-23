import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, match, Router } from 'react-router';
import Relay from 'react-relay';
import routes from './routes';

const environment = new Relay.Environment();

environment.injectNetworkLayer(new Relay.DefaultNetworkLayer('/graphql'));

const data = JSON.parse(document.getElementById('preloadedData').textContent);

const rootElement = document.getElementById('root');

match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
  IsomorphicRouter.injectPreparedData(environment, renderProps, data).then(props => {
    ReactDOM.render(<Router {...props} />, rootElement);
  });
});
