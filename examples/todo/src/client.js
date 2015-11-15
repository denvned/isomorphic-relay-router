import createBrowserHistory from 'history/lib/createBrowserHistory';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';

const data = JSON.parse(document.getElementById('preloadedData').textContent);

IsomorphicRelay.injectPreparedData(data);

const rootElement = document.getElementById('root');

ReactDOM.render(
    <IsomorphicRouter.Router routes={routes} history={createBrowserHistory()} />,
    rootElement
);
