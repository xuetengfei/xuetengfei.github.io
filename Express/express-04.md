路由是指应用程序的端点（URI）如何响应客户端请求。在 express 中有**三种**路由注册
方式。

## 1.Basic route:

`app.METHOD(PATH, HANDLER)`

```javascript
const express = require('express');
const app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world');
});
```

<!-- Route methods

```javascript
// GET method route
app.get('/', function(req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function(req, res) {
  res.send('POST request to the homepage');
});

/*
There is a special routing method, app.all(), used to load middleware functions at a path for all HTTP request methods. For example, the following handler is executed for requests to the route “/secret” whether using GET, POST, PUT, DELETE, or any other HTTP request method supported in the http module.
 */
app.all('/secret', function(req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
``` -->

## 2 Chainable route

`app.route()` You can create **chainable route** handlers for a route path by
using app.route().

```javascript
app
  .route('/book')
  .get(function (req, res) {
    res.send('Get a random book');
  })
  .post(function (req, res) {
    res.send('Add a book');
  })
  .put(function (req, res) {
    res.send('Update the book');
  });
```

## 3 Express.Router

使用 express.Router 类创建模块化的可安装路由处理程序。 路由器实例是一个完整的中
间件和路由系统。因此，它通常被称为“迷你应用程序”。推荐使用这种路由注册方式,**职
责单一,高内聚,低耦合。**

```javascript
const express = require('express');
const dev = require('./dev');

const app = express();
const port = 3000;

app.use('/dev', dev);
app.get('/', (_req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`App listening on port ${port}!`));
```

dev.js

```javascript
const express = require('express');
const ModuleRouter = express.Router();

// middleware that is specific to this router
ModuleRouter.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
ModuleRouter.get('/', (req, res) => {
  res.send('Code change the world');
});
// define the about route
ModuleRouter.get('/frontEnd', (req, res) => {
  res.send('前端开发');
});

module.exports = ModuleRouter;
```

access.log

```log
::1 - - "GET /dev HTTP/1.1" 200 21 "-"
::1 - -  "GET /dev/frontEnd HTTP/1.1" 200 12 "-"
```
