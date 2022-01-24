```
.
├── index.js
├── package.json
├── .eslintrc.json
├── .prettierrc
└── yarn.lock
```

<!-- <iframe src="https://github.com/xuetengfei/grocery/blob/9c81967f49048565e9ca5b4fdaa9c667b8e80a7c/express/express-api/app.js#L17-L30
"></iframe> -->

[xxx](https://github.com/xuetengfei/grocery/blob/9c81967f49048565e9ca5b4fdaa9c667b8e80a7c/express/express-api/app.js#L17-L30 ':include :type=code')

#### File: package.json

```json
{
  "name": "expressjs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js",
    "lint": "eslint --fix *.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "eslint": "^6.6.0",
    "eslint-config-airbnb-base": "^14.0.0",
    "eslint-plugin-import": "^2.18.2",
    "express": "^4.17.1"
  }
}
```

### Install deps

```
yarn add express mongoose eslint eslint-config-airbnb-base eslint-plugin-import
```

#### .eslintrc.json

```json
{
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": ["airbnb-base"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {}
}
```

### .prettierrc

```json
{
  "printWidth": 100,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid",
  "requirePragma": false,
  "proseWrap": "preserve"
}
```

### index.js

```javascript
const express = require('express');
const port = 3000;

const requestTime = (req, _res, next) => {
  req.requestTime = Date.now();
  next();
};

const app = express();
app.use(requestTime);

app.get('/', (req, res) => {
  const responseText = `Hello World!<br> <small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

app.use((_req, res, _next) => {
  res.status(404).send('Sorry cant find that!');
});
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

### start

```bash
yarn start
```

---

1. [Building a Simple CRUD Application with Express and MongoDB | Zell Liew](https://zellwk.com/blog/crud-express-mongodb/)
2. [Using Async/await in Express | Zell Liew](https://zellwk.com/blog/async-await-express/)

## Creat Data

编码 **index.js** 添加中间件 ** body-parser **，用于解析 **json** 。

```javascript
const express = require('express');
const mongoose = require('mongoose');
/* add body-parser Middleware */
const bodyParser = require('body-parser');
const dev = require('./routerHandler/dev');
const port = 3000;

require('dotenv').config();

const requestTime = (req, _res, next) => {
  req.requestTime = Date.now();
  next();
};

const app = express();
/* use bodyParser */
app.use(bodyParser.json());
app.use(requestTime);

app.use('/public', express.static(`${__dirname}/static`));
app.get('/', (req, res) => {
  const responseText = `Hello World!<br> <small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

app.use('/dev', dev);
app.use((_req, res, _next) => {
  res.status(404).send('Sorry cant find that!');
});
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connect Td DB!
mongoose.connect(process.env.DB_NAME, { useUnifiedTopology: true }, () => {
  console.log('connect is ok');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

编码 **routerHandler/dev.js**

```javascript
const express = require('express');
const Router = express.Router();

const LanguagesSchema = require('../schema/languages');

Router.get('/', async (_req, res) => {
  try {
    const result = await LanguagesSchema.find();
    res.json({
      status: 'success',
      list: result,
    });
  } catch (error) {
    console.log('error: ', error);
  }
});

/* post method to creat data add to my_db database */

Router.post('/add-languages', async (req, res) => {
  const Post = new LanguagesSchema({
    name: req.body.name,
  });
  try {
    const saveResult = await Post.save();
    h;
    res.json(saveResult);
  } catch (error) {
    res.json({ msg: error });
  }
});

module.exports = Router;
```

```bash
➜ curl -s -H "Content-Type: application/json"  \
-d '{"name":"js"}' \
-X POST "http://localhost:3000/dev/add-languages" | jq

{
  "date": "2019-12-01T08:55:42.144Z",
  "_id": "5de3806c0028a73bae044bef",
  "name": "js",
  "__v": 0
}
```

看一下数据库里面的数据。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Snipaste_2019-12-01_17-15-35-1575191857.jpg'/>
<!-- <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Snipaste_2019-12-01_17-13-20-1575191857.jpg'/> -->

现在，有数据后,再去调用一下之前的接口

```
➜  curl -s http://localhost:3000/dev | jq '.'
{
  "status": "success",
  "list": [
    {
      "date": "2019-12-01T08:26:41.165Z",
      "_id": "5de3794f8224b2394fda1fb3",
      "name": "node",
      "__v": 0
    },
    {
      "date": "2019-12-01T09:03:25.380Z",
      "_id": "5de381ea96ef213c9104454f",
      "name": "koa",
      "__v": 0
    }
  ]
}

```

## Read Data

在上一篇博客中，express 集成 MongoDB，项目的接入的是
**mongodb://127.0.0.1:27017/my_db**。在命令行中，查看一下现有的数据库发现没
有**my_db**这个数据库，没有关系。继续编写后续的代码。

```
> mongo
> show dbs
admin      0.000GB
bookMarks  0.000GB
config     0.000GB
local      0.000GB
>
```

<!-- ```shell
curl -I http://localhost:3000/dev && curl -s http://localhost:3000/dev | jq '.'
```

```bash
➜ curl -I http://localhost:3000/dev
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 30
ETag: W/"1e-tSl36b+VWIHQcP7R8EpOQ2+4Rp4"
Date: Sun, 01 Dec 2019 08:03:58 GMT
Connection: keep-alive
``` -->

文件组织关系如下

```
.
├── index.js
├── routerHandler
│   └── dev.js
├── schema
│   └── languages.js
├── package.json
└── yarn.lock
```

首先，编码 **schema/languages.js** [schema](MongoDB/mongo-schema)的概念在另一篇
文章中有讲解。

```javascript
const mongoose = require('mongoose');

const languagesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('languages', languagesSchema);
```

编码 **routerHandler/dev.js**

```javascript
const express = require('express');
const Router = express.Router();

const LanguagesSchema = require('../schema/languages');

Router.get('/', async (_req, res) => {
  try {
    const result = await LanguagesSchema.find();
    res.json({
      status: 'success',
      list: result,
    });
  } catch (error) {
    console.log('error: ', error);
  }
});

module.exports = Router;
```

```bash
➜  curl -s http://localhost:3000/dev | jq '.'
{
  "status": "success",
  "list": []
}
```
