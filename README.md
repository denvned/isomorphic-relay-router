Isomorphic react-router-relay [![npm version][npm-badge]][npm]
=============================
Adds server side rendering support to [react-router-relay](https://github.com/relay-tools/react-router-relay) using [isomorphic-relay](https://github.com/denvned/isomorphic-relay).

Installation
------------

    npm install -S isomorphic-relay isomorphic-relay-router

How to use
----------

The instructions are mostly the same as presented
[here](https://github.com/denvned/isomorphic-relay/blob/v0.4.0/README.md),
but with few differences described below.

Load *isomorphic-relay-router* module:
```javascript
import IsomorphicRouter from 'isomorphic-relay-router';
````

When processing a request **on the server**, get `renderProps`
using `match` function from *react-router*
(see [here](https://github.com/rackt/react-router/blob/v1.0.0/docs/guides/advanced/ServerRendering.md)),
prepare the data using `IsomorphicRouter.prepareData`,
then render React using `IsomorphicRouter.RoutingContext` in place of `RelayRoutingContext`,
and send the React output along with the data to the client:
```javascript
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

    function render(data) {
      const reactOutput = ReactDOMServer.renderToString(
        <IsomorphicRouter.RoutingContext {...renderProps} />
      );

      res.render(path.resolve(__dirname, '..', 'views', 'index.ejs'), {
        preloadedData: JSON.stringify(data),
        reactOutput
      });
    }
  });
});
```

Render `IsomorphicRouter.Router` instead of `IsomorphicRelay.RootContainer` **in the browser:**
```javascript
ReactDOM.render(
    <IsomorphicRouter.Router routes={routes} history={createBrowserHistory()} />,
    rootElement
);
```

Example
-------
See [here](examples/todo).

[npm-badge]: https://img.shields.io/npm/v/isomorphic-relay-router.svg
[npm]: https://www.npmjs.com/package/isomorphic-relay-router
