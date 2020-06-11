CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

CSRF 通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对 CSRF 的防护能力来提升安全性。CSRF（通常）发生在第三方域名。CSRF 攻击者不能获取到 Cookie 等信息，只是使用。

比如：银行钓鱼网站诱导用户操作，盗取用户在银行网页的 cookies 信息等。钓鱼网站使用用户 cookies 信息来调用银行网页 api 访问和操作用户数据。

```
1. 阻止不明外域的访问
    1.1 同源检测
    1.2 Samesite Cookie

2. 提交时要求附加本域才能获取的信息
    2.1 CSRF Token
    2.2 双重 Cookie 验证
```

`同源检测`

在 HTTP 协议中，每一个异步请求都会携带两个 Header，用于标记来源域名：Origin Header 、Referer Header。这两个 Header 在浏览器发起请求时，大多数情况会自动带上，并且不能由前端自定义内容。服务器可以通过解析这两个 Header 中的域名，确定请求的来源域。

`Samesite 属性`

最新的谷歌浏览器支持了最新的 HTTP 协议，那就是为 Set-Cookie 响应头新增 Samesite 属性，从源头上解决这个问题。它用来标明这个 Cookie 是个“同站 Cookie”，同站 Cookie 只能作为第一方 Cookie，不能作为第三方 Cookie，Samesite 有两个属性值，分别是 Strict 和 Lax。 实际上，这意味着只有当 cookie 的站点与浏览器的 URL 栏中当前显示的站点相匹配时，cookie 才会被发送。

```
Set-Cookie: __Auth=USER123ABCD; SameSite=Strict; secure; httponly;
```

```md
假如，淘宝网站用来识别用户登录与否的 Cookie 被设置成了 Samesite=Strict。

那么用户从 百度搜索页面 甚至 天猫页面 的链接点击进入淘宝后，淘宝都不会是登录状态，
因为淘宝的服务器不会接受到那个 Cookie，其它网站发起的对淘宝的任意请求`都不会带上那个 Cookie。
```

其他的还有，Token 验证、双重 Cookie 验证、CSRF token 验证 、自定义请求头、验证码、短信 OTP(一次性密码)。

<!--

1. 自定义请求头。比如:"X-CSRF-Token"，然后在服务器端进行检查。 这是可行的，因为只有 JavaScript 可以用于在 Ajax 请求上添加自定义头，而且只能在其原始内部

-->
