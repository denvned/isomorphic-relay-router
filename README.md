Isomorphic react-router-relay [![npm version][npm-badge]][npm]
=============================
Adds server side rendering support to
[react-router-relay](https://github.com/relay-tools/react-router-relay) using
[isomorphic-relay](https://github.com/denvned/isomorphic-relay).

Installation
------------

    npm install -S isomorphic-relay isomorphic-relay-router

How to use
----------

Don't forget to inject a network layer to Relay on the server.
And if you are using `Relay.DefaultNetworkLayer`, specify the full url to the GraphQL endpoint:
```javascript
const GRAPHQL_URL = `http://localhost:8080/graphql`;

Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(GRAPHQL_URL));
```

When processing a request **on the server**, get `renderProps`
using `match` function from *react-router* (see
[here](https://github.com/rackt/react-router/blob/v1.0.0/docs/guides/advanced/ServerRendering.md)),
prepare the data using `IsomorphicRouter.prepareData`,
then render React markup using `IsomorphicRouter.RouterContext` in place of `RelayRouterContext`
(pass the `props` returned by  `IsomorphicRouter.prepareData`), and send the React output along with
the data to the client:
```javascript
import IsomorphicRouter from 'isomorphic-relay-router';

app.get('/*', (req, res, next) => {
  match({routes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    if (error) {
      next(error);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      IsomorphicRouter.prepareData(renderProps).then(render, next);
    } else {
      res.status(404).send('Not Found');
    }

    function render({data, props}) {
      const reactOutput = ReactDOMServer.renderToString(
        <IsomorphicRouter.RouterContext {...props} />
      );

      res.render(path.resolve(__dirname, '..', 'views', 'index.ejs'), {
        preloadedData: JSON.stringify(data),
        reactOutput
      });
    }
  });
});
```

On page load **in the browser**, inject the prepared data to the Relay store
using `IsomorphicRelay.injectPreparedData`, then render React using `IsomorphicRouter.Router`
in place of `RelayRouter`:
```javascript
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';

const data = JSON.parse(document.getElementById('preloadedData').textContent);

IsomorphicRelay.injectPreparedData(data);

const rootElement = document.getElementById('root');

// use the same routes object as on the server
ReactDOM.render(
    <IsomorphicRouter.Router routes={routes} history={browserHistory} />,
    rootElement
);
```

Example
-------
See [here](examples/todo).

[npm-badge]: https://img.shields.io/npm/v/isomorphic-relay-router.svg
[npm]: https://www.npmjs.com/package/isomorphic-relay-router
