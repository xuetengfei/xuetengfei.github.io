?> JSON Web Token（简称 JWT）是目前最流行的跨域认证解决方案,是一种认证授权机制。 JWT 和 Session 都可以为网站提供用户的身份认证，但是它们不是一回事。

### 搭建一个简易项目用来演示

首先是目录结构

```
. express-app ($root)
├── index.js
├── routes
│   ├── authentication.js
│   └── index.js
└── package.json

1 directory, 6 files
```

`$root/package.json`

```
{
  "name": "express-mock-jwt",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "nodemon index.js"
  },
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1"
  }
}

```

`$root/index.js`

```
const express = require("express");
const routes = require("./routes/index");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());

routes(app);

app.listen(port);
console.log(`server is on port:${port}`);

```

`$root/routes/index.js`

```javascript
const { Authorizate, Authenticate } = require('./authentication');
// Authorizate  授权、 Authenticate 鉴权

const cb = (_req, res, payload) => {
  res.json({
    status: 0,
    payload,
    msg: 'success get profile',
  });
};

const routes = app => {
  app.post('/login', Authorizate); // 登陆授权后 获得token
  app.get('/profile', Authenticate(cb)); // request header里面带上 token
};

module.exports = routes;
```

`$root/routes/authentication.js`

```javascript
const jwt = require('jsonwebtoken');

const jwtkey = 'some-local-private.key'; // Mock jwt key file
const getUser = () => {
  return {
    id: 10,
  };
};

// 授权 Authorization
const Authorizate = (request, response) => {
  if (request.body.email && request.body.password) {
    const user = getUser(request.body.email); // Mock  Fetch user's data
    jwt.sign(user, jwtkey, (error, token) => {
      console.log('error: ', error);
      response.json({
        id: user.id,
        token,
      });
    });
  } else {
    response.json({
      status: 0,
      msg: 'please sign in',
    });
  }
};

// 鉴权 Authentication
// Authenticate vt. 鉴定；证明…是真实的
const Authenticate = callback => (request, response) => {
  jwt.verify(request.headers.token, jwtkey, (error, payload) => {
    if (error) {
      response.json({
        status: 0,
        msg: 'please sign in',
      });
    } else {
      callback(request, response, payload);
    }
  });
};

module.exports = {
  Authorizate,
  Authenticate,
};
```

## 演示

`第一步,先使用email和password字段,请求登陆接口`
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200510174702%20jwt-1.jpg' alt='20200510174702jwt-1'/>
`第二步，在请求头中带上之前我们得到的token`
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200510174702%20jwt-2.jpg' alt='20200510174702jwt-2'/>
`修改一下token后,重新请求`
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200510174828%20jwt-3.jpg' alt='20200510174828jwt-3'/>

---

`论坛的文章和资源`

1. [Node.js+MongoDB 对于 RestfulApi 中用户 token 认证的实践 - CNode 技术社区](https://cnodejs.org/topic/58c1477b06dbd608756d0bca)
2. [开发安全的 API 所需要核对的清单](https://github.com/shieldfy/API-Security-Checklist/blob/master/README-zh.md)
3. [A collection of useful resources for building RESTful HTTP+JSON APIs.](https://github.com/yosriady/api-development-tools)
4. [JSON Web Token 入门教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
