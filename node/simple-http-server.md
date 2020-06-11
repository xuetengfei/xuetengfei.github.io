#### 目录结构

```
.
└── server
    └── server.js

1 directory, 1 file
```

#### 编写 server.js

```javascript
var http = require('http');
var server = http.createServer();
server.listen(9998);
```

- 首先，我们全局安装了 node.js
- `var http = require('http');`Node.js 中自带了一个叫做“http”的模块，我们在我们的代码中请求它并把返回值赋给一个本地变量。 这把我们的本地变量变成了一个拥有所有 http 模块所提供的公共方法的对象。
- 接下来，我们调用 http 模块提供的函数：createServer(), 这个函数会返回一个对象，这个对象有一个 叫做 listen 的方法,这个方法有一个数值参数，指定这个 HTTP 服务器监听的端口号。
- 这段代码只会启动一个侦听 9998 端口的服务器，它不做任何别的事情，甚至连请求都不会应答。

#### 给 createServer( )传参

createServer( )接受唯一一个参数，是一个函数。我们可以直接在 createServer()里面直接定义这个匿名函数。这是 js 的函数传递.

```javascript
var http = require('http');

http
  .createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Hello World');
    response.end();
  })
  .listen(9998);
console.log('Server has started.');
```

我们可以换一种更清晰的写法,代码如下.

```javascript
var http = require('http');

function onRequest(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Hello World');
  response.end();
}

http.createServer(onRequest).listen(9998);
```

- 在命令行中运行 `node server.js`,看到打印结果`Server has started`
- 在浏览器中打开`http://localhost:9998/`,看到`Hello World`

#### 基于事件驱动的回调

也许现在我们问个问题：我们为什么要用这种方式(传递函数)呢？因为 `Node 是基于事件驱动的回调`.怎么理解这句话呢?这个问题可不好回答,不过这是 Node.js 原生的工作方式。它是事件驱动的，这也是它为什么这么快的原因。我们关闭正在命令行中运行的`node server.js`,稍微修改一个`server.js`代码,加一行`console.log()`,代码如下.

```javascript
var http = require('http');

function onRequest(request, response) {
  console.log('Request received.'); // ++++ add this line code ++++
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Hello World');
  response.end();
}

http.createServer(onRequest).listen(9998);
console.log('Server has started.');
```

当我们与往常一样，运行它 node server.js 时，它会马上在命令行上输出“Server has started.”。当我们向服务器发出请求（在浏览器访问 http://localhost:9998/）. `Request received`这条消息就会在命令行中出现。（请注意，当我们在服务器访问网页时，我们的服务器可能会输出两次“Request received.”。那是 因为大部分服务器都会在你访问 http://localhost:9998 /时尝试读取 http://localhost:9998/favicon.ico )

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Jietu20181028-170705.jpg"   width="600px">

嗯，这就是 Node.js/JavaScript 的事件驱动设计.
我们创建了服务器， 并且向创建它的方法传递了一个函数(onRequest)。 无论何时我们的服务器收到一个请求(在浏览器访问 http://localhost:9998/）, 这个函数(onRequest)就会被调用。 我们不知道这件事情什么时候会发生,这个就是传说中的 `回调` 。
我们给某个方法传递了一个函数，这个方法在有相应事件发生时调用这个 函数来进行 回调 。

这样简单理解一下

```javascript
var p = document.getElementById('foo');
p.onclick = function(event) {
  alert('moot!');
};
```

#### 服务器是如何处理请求的

```javascript
function onRequest(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Hello World');
  response.end();
}
```

接下来我们简单分析一下我们服务器代码中剩下的部分，也就是我们的回调函数 onRequest() 的主体部分。当回调启动，我们的 onRequest() 函数被触发的时候，有两个参数被传入：request 和 response 。 它们是对象，你可以使用它们的方法来处理 HTTP 请求的细节，并且响应请求（比如向发出请求的 浏览器发回一些东西）。 所以我们的代码就是：当收到请求时， 使用 response.writeHead() 函数发送一个 HTTP 状态 200 和 HTTP 头的内容类型（content-type），使用 response.write() 函数在 HTTP 相应主体中发送文本 “Hello World”。 最后，我们调用 response.end() 完成响应。 目前来说，我们对请求的细节并不在意，所以我们没有使用 request 对象。

#### 组织文件

把`某段代码`变成`模块`来合理的组织我们的代码.构建应用的模块,我们编写 node 代码时采用的是 commonJS 的组织规范.

```javascript
// server.js
var http = require('http');

function start() {
  function onRequest(request, response) {
    console.log('Request received.');
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Hello World');
    response.end();
  }
  http.createServer(onRequest).listen(9998);
  console.log('Server has started.');
}

exports.start = start;
```

```javascript
// index.js
var server = require('./server');
server.start();
```

命令行`node index.js`开启服务器

#### 路由选择

到此为止,我们拥有整个服务器应用的最初部分:我们可以接收 HTTP 请求,但是仅仅是监听 9998 这个端口.但是我们得做点什么——对于不同的 URL 请求，服务器应该有不同的反应。

处理不同的 HTTP 请求在我们的代码中是一个不同的部分，叫做“路由选择”，接下来就创造一个叫做`路由`的模块。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2018-10-28_17-47-29.jpg"   width="600px">

查看 HTTP 请求，从中提取出请求的 URL 以及 GET/POST 参数,所有数据都会包含在`request`对象中，该对象作为 `onRequest()回调函数`的第一个参数传递。但是为了解析这些数据，我们需要额外的 Node.JS 模块，它们分别是 `url`和 `querystring` 模块。

#### 解析 URL

现在我们来给 onRequest()函数加上一些逻辑，用来找出浏览器请求的 URL 路径：

```javascript
var http = require('http');
var url = require('url');

function start() {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received.');
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Hello World');
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log('Server has started.');
}

exports.start = start;
```

在浏览器中输入`http://localhost:9998/hello`命令行中输出`Request for /hello received.`现在可以通过请求的 URL 路径来区别不同请求了—这使我们得以使用路由（来将请求以 URL 路径为基准映射到处理程序上。 在我们所要构建的应用中，这意味着来自不同路由的请求可以使用不同的代码来处理。

#### 路由

现在我们可以来编写路由了，建立一个名为 router.js 的文件，添加以下内容：

```javascript
// router.js
function route(pathname) {
  console.log('About to route a request for ' + pathname);
}
module.exports = {
  route: route,
};
```

```javascript
// server.js
var http = require('http');
var url = require('url');

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received.');
    route(pathname); // +++++++++++
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Hello World');
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log('Server has started.');
}

exports.start = start;
```

```javascript
// index.js
var server = require('./server/server');
var router = require('./server/router').route;
server.start(router);
```

运行`node index.js`后，在浏览器输入`http://localhost:9998/foo`,命令行输出如下

```
Request for /foo received.
About to route a request for /foo
```

这表明我们的路由雏形完成了。接下来我们来做不同路由的处理函数。这就好比，物流公司在入口分拣快递，然后分发到不同的传送带上,然后进行后续的工资。

#### 请求处理程序

暂时把作为路由目标的函数称为请求处理程序。现在我们不要急着来开发路由模块，因为如果请求处理程序没有就绪的话，再怎么完善路由模块也没有多大意义。

我们新启一个文件，叫做 `requestHandlers.js` 来处理不同路由分发的请求处理函数，最后这些函数会被导出，在其他文件中引入使用。
我们现在的目标做一个微型应用，这个应用有两个功能。

- 当用户请求 htpp://localhost:9998/start 时，可以看到一个欢迎页面，页面上有一个文件上传的表单。
- 用户可以选择一个图片并提交表单，随后文件将被上传到 htpp://localhost:9998/upload，该页面完成
  上传后会把图片显示在页面上。

那么，完成需求我们需要有两个路由,那么我们也需要两个对于的请求处理函数。对于路由这两个函数，我们命名就叫做`start`和`upload`

```javascript
// requestHandlers.js
function start() {
  console.log("Request handler 'start' was called.");
}
function upload() {
  console.log("Request handler 'upload' was called.");
}
exports.start = start;
exports.upload = upload;
```

```javascript
// index.js
var server = require('./server/server');
var router = require('./server/router').route;
var requestHandlers = require('./server/requestHandlers');

var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;

server.start(router, handle);
```

注意看上面的代码，`handle`现在是一些请求处理程序的集合 ，将不同的 URL 映射到相同的请求处理程序上是很容易的：只要在对象中添加一个键为"/"的属性，对应 requestHandlers.start 即可，这样我们就可以干净简洁地配置/start 和/的请求都交由 start 这一处理程序处理。

#### 修改 serve.js 、route.js

在 start()函数里添加了 handle 参数，并且把 handle 对象作为第一个参数传递给了 route()回调函数。

```javascript
// server.js
var http = require('http');
var url = require('url');

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received.');
    route(handle, pathname); // +++++++++++
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Hello World');
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log('Server has started.');
}

exports.start = start;
```

然后我们相应地在 route.js 文件中修改 route()函数：

```javascript
// route.js
function route(handle, pathname) {
  console.log('About to route a request for ' + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname]();
  } else {
    console.log('No request handler found for ' + pathname);
  }
}

module.exports = {
  route: route,
};
```

通过以上代码，我们首先检查给定的路径对应的请求处理程序是否存在，如果存在的话直接调用相应的函数。我们可以用从关联数组中获取元素一样的方式从传递的对象中获取请求处理函数，因此就有了简洁流畅的形如`handle[pathname]();`的表达式，有了这些，我们就把服务器、路由和请求处理程序在一起了。现在我们启动应用程序并在浏览器中
访问 `http://localhost:9998/start，`以下日志可以说明系统调用了正确的请求处理程序：

```
Server has started.
Request for /start received.
About to route a request for /start
Request handler 'start' was called.
```

#### 让请求处理程序作出响应

我们需要让请求处理程序能够像 onRequest 函数那样可以和浏览器进行“对话” 。

请求路由需要将请求处理程序返回给它的信息返回给服务器。因此，我们需要将 router.js 修改为如下形式.当请求无法路由的时候，我们也返回了一些相关的错误信息。

```javascript
// route.js
function route(handle, pathname) {
  console.log('About to route a request for ' + pathname);
  if (typeof handle[pathname] === 'function') {
    return handle[pathname]();
  } else {
    console.log('No request handler found for ' + pathname);
    return '404 Not found';
  }
}
module.exports = {
  route: route,
};
// exports.route = route;
```

正如上述代码所示，
最后，我们需要对我们的 server.js 进行重构以使得它能够将请求处理程序通过请求路由返回的内容响
应给浏览器，如下所示：

```javascript
//  server.js

var http = require('http');
var url = require('url');
function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received.');
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    var content = route(handle, pathname); // 得到请求处理函数,返回的处理结果
    response.write(content);
    response.end();
  }
  http.createServer(onRequest).listen(9998);
  console.log('Server has started.');
}
exports.start = start;
```

如果我们运行重构后的应用，一切都会工作的很好：请求 http://localhost:9998/start, 浏览器会输出“HelloStart” ，请求 http://localhost:9998/upload 会输出“HelloUpload”,而请求 http://localhost:9998/foo 会输出“404 Not found” 。

#### 阻塞和非阻塞

到此为止,我们的代码更加完善一些,但是有一个严重的 bugs,那就是阻塞操作.

```javascript
// requestHandlers.js
function start() {
  console.log("Request handler 'start' was called.");
  function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }
  sleep(10000);
  return 'Hello Start';
}
function upload() {
  console.log("Request handler 'upload' was called.");
  return 'Hello Upload';
}
exports.start = start;
exports.upload = upload;
```

上述代码中，当函数 `start()`中人为的加了延迟来模拟阻塞.那么,当请求`/start URL`时候 `start()`被调用，Node.js 会先等待 10 秒，之后才会返回“Hello Start” 。
当调用 `upload()`的时候，会和此前一样立即返回。

测试一下,当谷歌浏览器打开两个新的 tab 页面,一个输入 `http://localhost:9998/start`另外一个输入`http://localhost:9998/upload`,然后我们同时敲下回车键后,注意，发生了什么：`/start URL` 加载花了 10 秒，这和我们预期的一样。但是，`/upload URL` 居然也花了 10 秒，而`/upload URL`在对应的请求处理程序中并没有类似于`sleep()`这样的操作！
这到底是为什么呢？原因就是 `start()`包含了阻塞操作。形象的说就是`它阻塞了所有其他的处理工作` 。

#### 非阻塞操作的方式

接下来，我们会介绍一种错误的使用非阻塞操作的方式。

```javascript
// requestHandlers.js
var exec = require('child_process').exec;
function start() {
  console.log("Request handler 'start' was called.");
  var content = 'empty';
  exec('ls -lah', function(error, stdout, stderr) {
    content = stdout;
  });
  return content;
}
function upload() {
  console.log("Request handler 'upload' was called.");
  return 'Hello Upload';
}
exports.start = start;
exports.upload = upload;
```

#### 以非阻塞操作进行请求响应

之前从 `route()`函数获取返回值的做法，这次我们将 `response` 对象作为第三个参数传递给
`route()`函数，并且，我们将 `onRequest()`处理程序中所有有关 `response` 的函数调都移除，因为我们希
望这部分工作让 `route()`函数来完成。
下面就来看看我们的 router.js:

```javascript
//  server.js
var http = require('http');
var url = require('url');
function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received.');
    route(handle, pathname, response);
  }
  http.createServer(onRequest).listen(8888);
  console.log('Server has started.');
}
exports.start = start;
```

```javascript
// router.js
function route(handle, pathname, response) {
  console.log('About to route a request for ' + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response);
  } else {
    console.log('No request handler found for ' + pathname);
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('404 Not found');
    response.end();
  }
}
exports.route = route;
```

同样的模式：相对此前从请求处理程序中获取返回值，这次取而代之的是直接传递 response 对象。
如果没有对应的请求处理器处理，我们就直接返回“404”错误。

```javascript
// requestHandler.js
var exec = require('child_process').exec;
function start(response) {
  console.log("Request handler 'start' was called.");
  exec('ls -lah', function(error, stdout, stderr) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(stdout);
    response.end();
  });
}
function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Hello Upload');
  response.end();
}
exports.start = start;
exports.upload = upload;
```

```javascript
// index.js
var server = require('./server/server');
var router = require('./server/router').route;
var requestHandlers = require('./server/requestHandlers');

var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;

server.start(router, handle);
```

现在我们做到了非阻塞操作相应.运行服务器后,`(http://localhost:9998/strat` 中会显示

```
total 1.0K
drwxr-xr-x 1 Administrator 197121   0 Oct 30 17:28 .
drwxr-xr-x 1 Administrator 197121   0 Oct 30 17:28 ..
-rw-r--r-- 1 Administrator 197121 329 Oct 30 20:43 index.js
drwxr-xr-x 1 Administrator 197121   0 Oct 30 17:28 server
```

访问`http://localhost:9998/upload`后显示

```
Hello Upload
```
