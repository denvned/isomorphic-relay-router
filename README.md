Isomorphic react-router-relay
=============================
Adds server side rendering support to [react-router-relay](https://github.com/relay-tools/react-router-relay) using [isomorphic-relay](https://github.com/denvned/isomorphic-relay).

Installation
------------

    npm install -S isomorphic-relay isomorphic-relay-router

How to use
----------

Make sure *isomorphic-relay* or *isomorphic-relay-router* modules are loaded before *react-relay* on the server, because it prevents *"self is not defined"* error (see [facebook/fbjs#47](https://github.com/facebook/fbjs/issues/47)).

Inject a network layer to *isomorphic-relay* (but not to Relay itself) **on the server**:
```javascript
import {injectNetworkLayer} from 'isomorphic-relay';
injectNetworkLayer(new Relay.DefaultNetworkLayer('http://localhost:8080/graphql'));
```
Inject a no-op batching strategy into `GraphQLStoreChangeEmitter` **on the server**:
```javascript
import GraphQLStoreChangeEmitter from 'react-relay/lib/GraphQLStoreChangeEmitter';
GraphQLStoreChangeEmitter.injectBatchingStrategy(() => {});
```
When processing a request **on the server**, get `renderProps` using `match` function from *react-router* (see [here](https://github.com/rackt/react-router/blob/v1.0.0/docs/guides/advanced/ServerRendering.md)), preload data using `loadAndStoreData` from *isomorphic-relay-router*, then render React supplying `createIsomorphicElement` function to `RoutingContext` component of *react-router*, and send the React output along with the data to the client:
```javascript
import {
  createIsomorphicElement,
  loadAndStoreData,
} from 'isomorphic-relay-router';

app.get('/*', (req, res, next) => {
  match({routes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    if (error) {
      next(error);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      loadAndStoreData(renderProps).then(render, next);
    } else {
      res.status(404).send('Not Found');
    }

    function render(data) {
      const reactOutput = ReactDOMServer.renderToString(
        <RoutingContext
          {...renderProps}
          createElement={createIsomorphicElement}
        />
      );
      res.render(path.resolve(__dirname, '..', 'views', 'index.ejs'), {
        preloadedData: JSON.stringify(data),
        reactOutput
      });
    }
  });
});
```
On initial page load **in the browser**, get `renderProps` using `match` function from *react-router*, store the preloaded data in the Relay store using `storePreloadedData` from *isomorphic-relay-router*, then render React supplying `createIsomorphicElement` function to `Router` component of *react-router*:
```javascript
import {
  createIsomorphicElement,
  storePreloadedData,
} from 'isomorphic-relay-router';

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
```

Example
-------
See [here](https://github.com/denvned/isomorphic-relay-router/tree/master/examples/todo).
