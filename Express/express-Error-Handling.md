```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use('/public', express.static(__dirname + '/static'));
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`App listening on port ${port}!`));

// 在堆栈的最底部（在其他所有函数之下）添加一个中间件函数来处理 404、500 响应

/* 404 */
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
/* 500 */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```
