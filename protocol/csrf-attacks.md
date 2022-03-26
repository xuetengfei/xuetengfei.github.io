csrf-attacks.md Cross Site Request Forgery (CSRF)

跨站请求伪造，也被称为 CSRF 或 XSRF，已经基本上永远存在。 它源于一个站点必须向另
一个站点发出请求的简单功能。 假设我在这个页面中嵌入了以下表单。

As old as the Web itself 和网络本身一样古老

[What is CSRF (Cross-site request forgery)? Tutorial & Examples | Web Security Academy](https://portswigger.net/web-security/csrf)

// SameSite 本月初，Firefox 60 浏览器发布。它有一个很大的亮点，我看提到的人不多
，就是它解决了 CSRF 攻击。

所谓 CSRF 攻击，就是使用真实的 Cookie 进行恶意行为。比如，用户访问 B 网站，页面
上有一张来自 A 图站的图片，这时浏览器就会向 A 网站发出请求，并带上 A 网站的
Cookie。如果这张图片的 URL 被精心伪造过（比如是划款请求），麻烦就来了。因为 A 网
站的服务器会以为，这个请求是真实的请求，因为 Cookie 是对的，从而授权进行各种操作
。

Firefox 60 按照最新的标准，为 Cookie 新增了一个 SameSite 属性，明确规定访问 B 网
站时向 A 网站发出的请求，一律不许带上 Cookie，这就从根本上防止了 CSRF 攻击。

另外，Firefox 60 还默认打开了 ES6 模块支持，至此所有浏览器都默认支持 ES6 模块。

[浅谈 CSRF - 简书](https://www.jianshu.com/p/7f33f9c7997b)
[理解 Cookie 和 Session 机制 - Andrew.Zhou - 博客园](https://www.cnblogs.com/andy-zhou/p/5360107.html)
[CSRF 攻击与防御（写得非常好）\_数据库\_freeking101 的博客-CSDN 博客](https://blog.csdn.net/freeking101/article/details/86537087?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1)
[CSRF Attacks: Anatomy, Prevention, and XSRF Tokens | Acunetix](https://www.acunetix.com/websitesecurity/csrf-attacks/)

就其本质而言，httpget 是一种幂等的请求方法。 这意味着不应该使用这个 HTTP 方法来
执行状态更改。 发送 GET 请求不应导致任何数据发生更改。 然而，一些 web 应用程序仍
然使用 GET 而不是更合适的 POST 来执行更改状态的操作，比如更改密码或添加用户。

[13. Cross Site Request Forgery (CSRF)](https://docs.spring.io/spring-security/site/docs/3.2.0.CI-SNAPSHOT/reference/html/csrf.html)
[What is CSRF (Cross-site request forgery)? Tutorial & Examples | Web Security Academy](https://portswigger.net/web-security/csrf)
[Cross-Site Request Forgery Prevention · OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#use-built-in-or-existing-csrf-implementations-for-csrf-protection)

<!--

[1. 从跨域到 CORS · 跨域资源共享](https://cors.rails365.net/chapters/1.html)
[Cookie 的 SameSite 属性 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
[Cross-Site Request Forgery is dead!](https://scotthelme.co.uk/csrf-is-dead/)

 -->
