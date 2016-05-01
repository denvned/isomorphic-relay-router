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

Create a Relay network layer on the server.
And if you are using `Relay.DefaultNetworkLayer`, specify the full url to the GraphQL endpoint:
```javascript
const GRAPHQL_URL = `http://localhost:8080/graphql`;

const networkLayer = new Relay.DefaultNetworkLayer(GRAPHQL_URL);
```

When processing a request **on the server**, get `renderProps` using `match` function from
*react-router* (see
[here](https://github.com/reactjs/react-router/blob/v2.3.0/docs/guides/ServerRendering.md)),
prepare the data using `IsomorphicRouter.prepareData`, then render React markup using
`IsomorphicRouter.render` (pass the `props` returned by `IsomorphicRouter.prepareData`), and send
the React output along with the data to the client:
```javascript
import IsomorphicRouter from 'isomorphic-relay-router';

app.get('/*', (req, res, next) => {
  match({routes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    if (error) {
      next(error);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      IsomorphicRouter.prepareData(renderProps, networkLayer).then(render, next);
    } else {
      res.status(404).send('Not Found');
    }

    function render({data, props}) {
      const reactOutput = ReactDOMServer.renderToString(IsomorphicRouter.render(props));

      res.render(path.resolve(__dirname, '..', 'views', 'index.ejs'), {
        preloadedData: JSON.stringify(data),
        reactOutput
      });
    }
  });
});
```

On page load **in the browser**, create an instance of `Relay.Environment`, inject an Relay network
layer to it. Get `renderProps` using `match` function from *react-router*, inject the prepared data
to the Relay store using `IsomorphicRelay.injectPreparedData`, then prepare initial render using
`IsomorphicRelay.prepareInitialRender`, and render React using `Router` from *react-router* (pass
the `props` returned by `IsomorphicRouter.prepareInitialRender`):
```javascript
import IsomorphicRouter from 'isomorphic-relay-router';

const environment = new Relay.Environment();

environment.injectNetworkLayer(new Relay.DefaultNetworkLayer('/graphql'));

const data = JSON.parse(document.getElementById('preloadedData').textContent);

IsomorphicRelay.injectPreparedData(environment, data);

const rootElement = document.getElementById('root');

// use the same routes object as on the server
match({routes, history: browserHistory}, (error, redirectLocation, renderProps) => {
  IsomorphicRouter.prepareInitialRender(environment, renderProps).then(props => {
    ReactDOM.render(<Router {...props} />, rootElement);
  });
});
```

Example
-------
See [here](examples/todo).

[npm-badge]: https://img.shields.io/npm/v/isomorphic-relay-router.svg
[npm]: https://www.npmjs.com/package/isomorphic-relay-router
