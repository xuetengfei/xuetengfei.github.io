# 使用 express mock data

mockjs 是用来生产随机的数据(姓名、地址、字符串、url、省份、颜色、文字、段落、时
间戳等)。

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

// npm install cors --save-dev
// const cors = require('cors');
// app.use(cors());

// or set CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PATCH, PUT, DELETE',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
  );
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

require('./mock-serve');

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
  console.log(`http://localhost:${port}`);
  displayRoutes(app);
});
```

#### mock-serve.js

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

app.all('*', (_req, res) =>
  res.json({
    status: '1',
    data: {},
  }),
);
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2019-12-26_19-47-33-1577361040.jpg'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2019-12-26_19-49-46-1577361040.jpg'/>

---

2. [Mock.js 示例:数据模板定义](http://mockjs.com/examples.html)
1. [typicode/json-server: Get a full fake REST API with zero coding in less than 30 seconds (seriously)](https://github.com/typicode/json-server)
