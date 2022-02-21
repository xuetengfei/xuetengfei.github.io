# JWT

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200427143111%20Handling-Authentication-in-SPA-with-JWT-and-cookies-1.png' alt='20200427143111Handling-Authentication-in-SPA-with-JWT-and-cookies-1'/>

[JSON Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token#Use)（简称 JWT）是
目前最流行的跨域认证解决方案,是一种认证授权机制。JWT 是一个互联网标准，用于**创
建具有签名加密的令牌数据**. 使用私有密钥或公共、私有密钥对令牌进行签名。令牌可以
由一方的私钥(通常是服务器的私钥)签名，以便该方随后可以验证令牌是合法的。 如果另
一方通过某些合适和可靠的方式拥有相应的公开密钥，他们也能够验证该令牌的合法性。

Jwt 声明通常可用于在身份提供者和服务提供者之间传递经过身份验证的用户的身份，或业
务流程所需的任何其他类型的声明。

---

### 无状态身份验证机制

例如，服务器可以生成声明为“logged in as admin”的令牌，并将其提供给客户端。 然后
客户端可以使用这个令牌来证明它是以 admin 身份登录的。在身份验证中，当用户使用凭
证成功登录时，将返回一个 JSON Web Token，并且必须在本地保存(通常保存在
localStorage、sessionStorage 中，但也可以使用 cookie) ，而不是传统的在服务器中创
建会话 session 并返回 cookie 的方法。 无论何时用户想要访问受保护的路由或资源，用
户代理都应该发送 JWT，通常在授权头中使用承载模式。 标题的内容可能如下所示:

```md
Authorization: Bearer xxx...yyy...zzz
```

这是一种`无状态身份验证机制`，因为用户状态**从未**保存在服务器中。 服务器的受保
护路由将在
[Authorization](/protocol/web-server?id=%e8%af%b7%e6%b1%82%e9%a6%96%e9%83%a8%e5%ad%97%e6%ae%b5%ef%bc%88reauest-header-fields%ef%bc%89%e5%ae%a2%e6%88%b7%e7%ab%af%e5%90%91%e6%9c%8d%e5%8a%a1%e5%99%a8%e5%8f%91%e9%80%81%e8%af%b7%e6%b1%82%e7%9a%84%e6%8a%a5%e6%96%87%e6%97%b6%e4%bd%bf%e7%94%a8%e7%9a%84%e9%a6%96%e9%83%a8)
头中检查是否有有效的 JWT，如果有，则允许用户访问受保护的资源。 由于 jwt 是自包含
的，因此所有必要的信息都在那里，从而减少了多次查询数据库的需要。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200512120835%20jwt-work.jpg' alt='20200512120835jwt-work'/>

---

### JWT 实现

```bash
# 目录结构
. express-app
├── index.js
├── routes
│   ├── authentication.js
│   └── index.js
└── package.json

1 directory, 6 files
```

```json
//  package.json
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

```js
// index.js
const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());

routes(app);

app.listen(port);
console.log(`server is on port:${port}`);
```

```javascript
// /routes/index.js
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

```javascript
// routes/authentication.js
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

## [JWT Online Test](https://jwt.herokuapp.com/auth)

![20220221-YCgFcG-292_2252941730_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220221-YCgFcG-292_2252941730_.png)

---

1. [JSON Web Tokens - jwt.io](https://jwt.io/)
2. [JWT Online Test](https://jwt.herokuapp.com/auth)
3. [Node.js+MongoDB 对于 RestfulApi 中用户 token 认证的实践 - CNode 技术社区](https://cnodejs.org/topic/58c1477b06dbd608756d0bca)
4. [开发安全的 API 所需要核对的清单](https://github.com/shieldfy/API-Security-Checklist/blob/master/README-zh.md)
5. [A collection of useful resources for building RESTful HTTP+JSON APIs.](https://github.com/yosriady/api-development-tools)
6. [JSON Web Token 入门教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
