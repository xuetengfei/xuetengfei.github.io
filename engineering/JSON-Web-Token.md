在[Session](engineering/session.md)文章中,我们了解到,Session 是一种记录用户状态
的机制,是在服务端保存的一个数据, 这个数据可以保存在集群、数据库、文件中。

但是,Session 的维护给服务端造成很大困扰,必须找地方存放它,又要考虑分布式的问题 ,
甚至要单独为了它启用一套 Redis 集群。有没有更好的办法？

有办法的。服务端**不用保存**用户身份验证的数据,而是将**数据加密**后放到浏览器
cookie 里面。因为用户状态**从未**保存在服务器中。这是一种无状态身份验证机制,相当
于服务端现在没有“花名册”了,还是校验用户端返回的“通行证”。

只不过现在的这个“通行证”是经过加密的,可以辨别真伪的,相当于日常生活中的验证钞票真
伪,在这里我们把这个钞票称之为**token**。

![20220224-QyqMNp-check-the-authenticity-of-money-picture-id676313906](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220224-QyqMNp-check-the-authenticity-of-money-picture-id676313906.jpg)

JWT 就是一种给通行证做防伪加密的方法,是一种处理数据的手法,它通过签名保证了信息的
不可篡改。

## Token

[JSON Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token#Use)（JWT）是目前
最流行的跨域认证解决方案,是一种认证授权机制,定义了一种传递 JSON 信息的方式。这些
信息通过数字签名确保可信。

JWT 是一个互联网标准,用于**创建具有签名加密的令牌数据**. 使用私有密钥或公共、私
有密钥对令牌进行签名。令牌可以由一方的私钥(通常是服务器的私钥)签名,以便该方随后
可以验证令牌是合法的。 如果另一方通过某些合适和可靠的方式拥有相应的公开密钥,他们
也能够验证该令牌的合法性。

Jwt 可用于在身份提供者和服务提供者之间传递经过身份验证的用户的身份,或业务流程所
需的任何其他类型的声明。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200427143111%20Handling-Authentication-in-SPA-with-JWT-and-cookies-1.png' alt='20200427143111Handling-Authentication-in-SPA-with-JWT-and-cookies-1'/>

token 的流程是这样的

![20220224-42r5LO-358_2255942738_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220224-42r5LO-358_2255942738_.webp)

<!--

## 无状态身份验证机制

例如,服务器可以生成声明为“logged in as admin”的令牌,并将其提供给用户端。 然后
用户端可以使用这个令牌来证明它是以 admin 身份登录的。在身份验证中,当用户使用凭
证成功登录时,将返回一个 JSON Web Token,并且必须在本地保存(通常保存在
localStorage、sessionStorage 中,但也可以使用 cookie) ,而不是传统的在服务器中创
建会话 session 并返回 cookie 的方法。 无论何时用户想要访问受保护的路由或资源,用
户代理都应该发送 JWT,通常在授权头中使用承载模式。 标题的内容可能如下所示:

`````md
Authorization: Bearer xxx...yyy...zzz

````

这是一种无状态身份验证机制,因为用户状态**从未**保存在服务器中。 服务器的受保护
路由将在
[Authorization](/protocol/web-server?id=%e8%af%b7%e6%b1%82%e9%a6%96%e9%83%a8%e5%ad%97%e6%ae%b5%ef%bc%88reauest-header-fields%ef%bc%89%e5%ae%a2%e6%88%b7%e7%ab%af%e5%90%91%e6%9c%8d%e5%8a%a1%e5%99%a8%e5%8f%91%e9%80%81%e8%af%b7%e6%b1%82%e7%9a%84%e6%8a%a5%e6%96%87%e6%97%b6%e4%bd%bf%e7%94%a8%e7%9a%84%e9%a6%96%e9%83%a8)
头中检查是否有有效的 JWT,如果有,则允许用户访问受保护的资源。 由于 jwt 是自包含
的,因此所有必要的信息都在那里,从而减少了多次查询数据库的需要。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200512120835%20jwt-work.jpg' alt='20200512120835jwt-work'/>


-->

---

## JWT 实现

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

第一步,先使用 email 和 password 字段,请求登陆接口
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200510174702%20jwt-1.jpg' alt='20200510174702jwt-1'/>
JWT 将数据按特定格式进行序列化,标记过期时间,对数据进行『签名』后编码为 URL Safe
的 Base64URL 。通过签名保证了信息的不可篡改。

第二步,在请求头中带上之前我们得到的 token
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200510174702%20jwt-2.jpg' alt='20200510174702jwt-2'/>

修改一下 token 后,重新请求
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200510174828%20jwt-3.jpg' alt='20200510174828jwt-3'/>

## 传递和储存 Token

<!-- HTTP header 用 cookie 还是自定义字段,按照业务情况而定,没有强制要求。也可以放到
请求首部字段 Authorization 里面。
use-cookies-save-jwt-token -->

一种常见模式是,将 JWT 令牌存储在浏览器的本地存储中(通常保存在
localStorage、sessionStorage ),然后将该令牌包含在每个请求头的
**Authorization**中。 由于本地存储可以从 Javascript 读取,因此一个简单的跨站点脚
本攻击或 XSS 可以读取 JWT 令牌并打开大门来模拟用户。

如果我们在 cookie 中存储 JWT 令牌会怎样？

但是 cookies 也是 Javascript 可读的(document.cookie)。 因此,这与在浏览器的本地存
储中存储令牌的情况是一样的。当服务器使用 HttpOnly 标记设置 cookie 时 ,Javascript
将无法读取该 cookie。

但是有了 cookies,旧的安全问题又变得重要起来。 当发送请求时,来自 cookie 域的所有
cookie 也会被发送。 这意味着如果受害者从攻击者的恶意站点执行对 API 的请求,也会发
送 cookie,比如会话 cookie。 这种安全风险被称为 CSRF-跨站请求伪造。

## 拆分 JWT Token

Jwt 令牌由三部分构成: 有效负载、签名和消息头。
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200427143111%20Handling-Authentication-in-SPA-with-JWT-and-cookies-1.png' alt='20200427143111Handling-Authentication-in-SPA-with-JWT-and-cookies-1'/>

一个简单的解决方案是将 JWT 令牌拆分为两个 cookie,一个用于保存 payload,这个
cookie 的 httpOnly 设置为 false 。另一个用于保存 signature and header,这个
cookie 的 httpOnly 设置为 true。

使用这种身份验证机制的主要好处是提高了应用程序的整体安全性。大部分工作是在后端完
成的,前端不再需要考虑将会话数据存储在哪里, 前端也可以读取使用 JWT payload 的数据
。

## JWT Online Test

[JWT Online Test](https://jwt.herokuapp.com/auth)
![20220221-YCgFcG-292_2252941730_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220221-YCgFcG-292_2252941730_.png)

---

1. [JSON Web Tokens - jwt.io](https://jwt.io/)
2. [Node.js+MongoDB 对于 RestfulApi 中用户 token 认证的实践 - CNode 技术社区](https://cnodejs.org/topic/58c1477b06dbd608756d0bca)
3. [开发安全的 API 所需要核对的清单](https://github.com/shieldfy/API-Security-Checklist/blob/master/README-zh.md)
4. [A collection of useful resources for building RESTful HTTP+JSON APIs.](https://github.com/yosriady/api-development-tools)
5. [JSON Web Token 入门教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
6. [Handling Authentication in SPA with JWT and cookies](https://povioremote.com/blog/handling-authentication-in-spa-with-jwt-and-cookies/)

  <!-- - [HttpOnly's cookies save JWT](engineering/use-cookies-save-jwt-token.md) -->
