# Read Data

在上一篇博客中，express 集成 MongoDB，项目的接入的是 **mongodb://127.0.0.1:27017/my_db**。在命令行中，查看一下现有的数据库
发现没有**my_db**这个数据库，没有关系。继续编写后续的代码。

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

首先，编码 **schema/languages.js** [schema](MongoDB/mongo-schema)的概念在另一篇文章中有讲解。

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
