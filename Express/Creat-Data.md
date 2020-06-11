# Creat Data

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
