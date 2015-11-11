import createBrowserHistory from 'history/lib/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import {createIsomorphicElement, storePreloadedData} from 'isomorphic-relay-router';
import {match, Router} from 'react-router';
import routes from './routes';

const {pathname, search} = window.location;

match({routes, location: pathname + search}, (error, redirectLocation, renderProps) => {
    if (renderProps) {
        const data = JSON.parse(document.getElementById('preloadedData').textContent);

        storePreloadedData(renderProps, data).then(render, render);
    } else {
        render();
    }
});

function render() {
    const rootElement = document.getElementById('root');

    ReactDOM.render(
        <Router
            createElement={createIsomorphicElement}
            history={createBrowserHistory()}
            routes={routes}
        />,
        rootElement
    );
}
