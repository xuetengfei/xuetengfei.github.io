`常见模式`

一种常见模式是，开发人员倾向于将 JWT 令牌存储在浏览器的本地存储中(通常保存在
localStorage、sessionStorage )，然后将该令牌包含在每个请求的授权
头**Authorization**中。 由于本地存储可以从 Javascript 读取，因此一个简单的跨站点
脚本攻击或 XSS 可以读取 JWT 令牌并打开大门来模拟用户。

`如果我们在 cookie 中存储 JWT 令牌会怎样？`

但是 cookies 也是 Javascript 可读的(document.cookie)。 因此，这与在浏览器的本地
存储中存储令牌的情况是一样的。当服务器使用 HttpOnly 标记设置 cookie 时
，Javascript 将无法读取该 cookie。

`旧的安全问题`

但是有了 cookies，旧的安全问题又变得重要起来。 当发送请求时，来自 cookie 域的所
有 cookie 也会被发送。 这意味着如果受害者从攻击者的恶意站点执行对 API 的请求，也
会发送 cookie，比如会话 cookie。 这种安全风险被称为 CSRF-跨站请求伪造。

`当前端需要使用JWT数据的时候怎么办？`

Jwt 令牌由三部分构成: 有效负载、签名和消息头。 一个简单的解决方案是将 JWT 令牌拆
分为两个 cookie，一个用于保存 payload，这个 cookie 的 httpOnly 设置为 false 。
另一个用于保存 signature and header,这个 cookie 的 httpOnly 设置为 true。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200427142735%20jwt-parts-1.jpg' alt='20200427142735jwt-parts-1'/>

当然，使用这种身份验证机制的主要好处是提高了应用程序的整体安全性。大部分工作是在
后端完成的， 前端不再需要考虑将会话数据存储在哪里，他感兴趣的只是如何读取有效负
载 cookie 的内容

---

1.  [Handling Authentication in SPA with JWT and cookies](https://povioremote.com/blog/handling-authentication-in-spa-with-jwt-and-cookies/)
