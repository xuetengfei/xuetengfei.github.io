<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/express-middleware-1573025943.jpg'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/plumbing-sound-1573698554.jpg'/>

```
中间件功能可以执行以下任务：
1. 执行任何代码。
2. 更改请求和响应对象。
3. 结束请求-响应周期。
4. 调用堆栈中的下一个中间件。
```

```javascript
const express = require('express');
const app = express();

const requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.use(myLogger);

app.get('/', (req, res) => {
  const responseText = `Hello World!<br> <small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

app.listen(3000);
```
