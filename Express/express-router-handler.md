```
.
├── index.js
├── routerHandler
│   └── dev.js
├── static
│   └── img
│       └── test.png
├── package.json
└── yarn.lock
```

#### index.js

```javascript
const express = require('express');
const fs = require('fs');
const path = require('path');
const dev = require('./routerHandler/dev');

const app = express();
const port = 3000;

const requestTime = (req, _res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.use('/public', express.static(`${__dirname}/static`));
app.get('/', (req, res) => {
  const responseText = `Hello World!`;
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

#### routerHandler/dev.js

```javascript
const express = require('express');
const ModuleRouter = express.Router();

ModuleRouter.get('/', (req, res) => {
  res.send(`Code change the world.RequestTime:${req.requestTime}`);
});

ModuleRouter.get('/frontEnd', (req, res) => {
  res.send(`I'm a frontEnd Dev`);
});

module.exports = ModuleRouter;
```

<!-- <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Snipaste_2019-11-30_13-21-19-1575091454.jpg'/> -->
