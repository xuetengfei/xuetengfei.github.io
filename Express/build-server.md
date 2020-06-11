最基础的文件组织，先把项目启动起来

```
.
├── index.js
├── package.json
├── .eslintrc.json
├── .prettierrc
└── yarn.lock
```

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
