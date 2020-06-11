# 使用 express mock data

<!--
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/mock-1555260711.jpg' width='700px'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/mockdata-1555260122.jpg'/>
 -->

mockjs 是用来生产随机的数据(姓名、地址、字符串、url、省份、颜色、文字、段落、时间戳等)。

#### Install Deps

```bash
yarn init -y && yarn add express express-routemap mockjs body-parser cors
```

#### index.js

```javascript
// index.js
const express = require('express');
const displayRoutes = require('express-routemap');
const Mock = require('mockjs');
const bodyParser = require('body-parser');

const app = express();
const port = 6254;
exports.app = app;

app.use(bodyParser.json());

require('./api-1');
// require('./api-2');
// require('./api-3');

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
  console.log(`http://localhost:${port}`);
  displayRoutes(app);
});
```

#### api-1.js

```javascript
const Mock = require('mockjs');
const { app } = require('./index');

app.all('/logrecord', (_req, res) =>
  res.json(
    Mock.mock({
      status: '1',
      data: {
        'content|5': [
          {
            user: '@word(5,8)',
            time: '@date("yyyy-MM")',
            log: '@sentence()',
          },
        ],
      },
    }),
  ),
);
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2019-12-26_19-47-33-1577361040.jpg'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2019-12-26_19-49-46-1577361040.jpg'/>

---

2. [Mock.js 示例:数据模板定义](http://mockjs.com/examples.html)
1. [typicode/json-server: Get a full fake REST API with zero coding in less than 30 seconds (seriously)](https://github.com/typicode/json-server)
