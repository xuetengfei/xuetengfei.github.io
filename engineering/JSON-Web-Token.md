[JSON Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token#Use) 是一个互联网标准，用于**创建具有签名加密的令牌数据**. 使用私有密钥或公共、私有密钥对令牌进行签名。令牌可以由一方的私钥(通常是服务器的私钥)签名，以便该方随后可以验证令牌是合法的。 如果另一方通过某些合适和可靠的方式拥有相应的公开密钥，他们也能够验证该令牌的合法性。

Jwt 声明通常可用于在身份提供者和服务提供者之间传递经过身份验证的用户的身份，或业务流程所需的任何其他类型的声明。

---

### 无状态身份验证机制

例如，服务器可以生成声明为“ logged in as admin”的令牌，并将其提供给客户端。 然后客户端可以使用这个令牌来证明它是以 admin 身份登录的。

在身份验证中，当用户使用凭证成功登录时，将返回一个 JSON Web Token，并且必须在本地保存(通常保存在 localStorage、sessionStorage 中，但也可以使用 cookie) ，而不是传统的在服务器中创建会话 session 并返回 cookie 的方法。 无论何时用户想要访问受保护的路由或资源，用户代理都应该发送 JWT，通常在授权头中使用承载模式。 标题的内容可能如下所示:

```
Authorization: Bearer xxx...yyy...zzz
```

这是一种`无状态身份验证机制`，因为用户状态**从未**保存在服务器内存中。 服务器的受保护路由将在 [Authorization](/protocol/web-server?id=%e8%af%b7%e6%b1%82%e9%a6%96%e9%83%a8%e5%ad%97%e6%ae%b5%ef%bc%88reauest-header-fields%ef%bc%89%e5%ae%a2%e6%88%b7%e7%ab%af%e5%90%91%e6%9c%8d%e5%8a%a1%e5%99%a8%e5%8f%91%e9%80%81%e8%af%b7%e6%b1%82%e7%9a%84%e6%8a%a5%e6%96%87%e6%97%b6%e4%bd%bf%e7%94%a8%e7%9a%84%e9%a6%96%e9%83%a8)
头中检查是否有有效的 JWT，如果有，则允许用户访问受保护的资源。 由于 jwt 是自包含的，因此所有必要的信息都在那里，从而减少了多次查询数据库的需要。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200512120835%20jwt-work.jpg' alt='20200512120835jwt-work'/>

---

### Jwt Structure

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200427143111%20Handling-Authentication-in-SPA-with-JWT-and-cookies-1.png' alt='20200427143111Handling-Authentication-in-SPA-with-JWT-and-cookies-1'/>
