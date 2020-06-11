#### 之前版本

之前我们自己使用 node 自带的 http 模块,编写了一个简易的服务器应用,`index.js` 代码如下.

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

#### 使用 express 框架

```javascript
// index.js
var express = require('express');
var app = express();
app.get('/', function(req, res) {
  res.send('Hello World at post 7777');
});
app.listen(7777, function() {
  console.log('app is listening at port 7777');
});
```

#### 注释说明

```javascript
// 这句的意思就是引入 `express` 模块，并将它赋予 `express` 这个变量等待使用。
var express = require('express');

// 调用 express 实例，它是一个函数，不带参数调用时，会返回一个 express 实例，将这个变量赋予 app 变量。
var app = express();

// app 本身有很多方法，其中包括最常用的 get、post、put/patch、delete，
// 在这里我们调用其中的 get 方法，为我们的 `/` 路径指定一个 handler 函数。
// 这个 handler 函数会接收 req 和 res 两个对象，他们分别是请求的 request 和 response。
// request 中包含了浏览器传来的各种信息，比如 query 啊，body 啊，headers 啊之类的，都可以通过 req 对象访问到。
// res 对象，我们一般不从里面取信息，而是通过它来定制我们向浏览器输出的信息，比如 header 信息，
// 比如想要向浏览器输出的内容。这里我们调用了它的 #send 方法，向浏览器输出一个字符串。
app.get('/', function(req, res) {
  res.send('Hello World at post 7777');
});

// 定义好我们 app 的行为之后，让它监听本地的 3000 端口。
// 这里的第二个函数是个回调函数，会在 listen 动作成功后执行，我们这里执行了一个命令行输出操作，告诉我们监听动作已完成。
app.listen(7777, function() {
  console.log('app is listening at port 7777');
});
```

#### 修改一下 package.json

修改一下文件项目里面的`package.json`文件夹,加入`scripts`命令,我使用的是 yarn,那么`yarn start`就是 `node index.js`

```javascript
{
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.16.4"
  }
}
```
