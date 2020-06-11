```javascript
// index.js

var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function(req, res) {
  var q = req.query.q; // 从 req.query 中取出参数q
  var md5Value = utility.md5(q); // 使用 utility 这个库来生成 md5 值
  res.send(md5Value);
});

app.listen(7777, function(req, res) {
  console.log('app is running at port 7777');
});
```

开启命令

```javascript
node index.js
```

浏览器地址栏输入

```javascript
http://localhost:7777/?q=薛
```

浏览器输出内容

```
8b60090ce9d3a3509c94ab792f7849c8
```
