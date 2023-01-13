# Phase 2: Error Handling

The next step is to set up your server error handlers.

Connect the following error handling middlewares after your route connections in
`app.js` (i.e., after `app.use(routes)`). Here is a refresher on how to create
an [Express error-handling middleware].

## Resource Not Found Error-Handler

The first error handler is actually just a regular middleware. It will catch
any requests that don't match any of the routes defined and create a server
error with a status code of `404`.

```js
// backend/app.js
// ...
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});
```
