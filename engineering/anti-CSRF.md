<!-- CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，
在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭
证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。 -->

1. [一个 jsonp 劫持造成的新浪某社区 CSRF 蠕虫](https://www.cnblogs.com/blacksunny/p/9124578.html)
2. [CSRF 攻击和防御 - Web 安全常识 - YouTube](https://www.youtube.com/watch?v=gEPii2y3ISQ)
3. [CSRF 案例及防范 · 白帽与安全](https://www.kancloud.cn/noahs/src_hacker/2395021)

## 跨站请求伪造

**跨站请求伪造**（英语：Cross-site request forgery），也被称为 **one-click
attack** 或者 **session riding**，通常缩写为 **CSRF** 或者 **XSRF**， 是一种挟制
用户在当前已登录的 Web 应用程序上执行非本意的操作的攻击方法。和 XSS 不同的是
，CSRF 攻击不需要将恶意代码注入用户的页面，仅仅是利用服务器的漏洞和用户的登录状
态来实施攻击，利用的是网站对用户网页浏览器的信任。

## 攻击的细节

跨站请求攻击，简单地说，是攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾
经认证过的网站并执行一些操作（如发邮件，发消息，甚至财产操作如转账和购买商品）。
由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去执行。这利用了
web 中用户身份验证的一个漏洞：简单的身份验证只能保证请求是发自某个用户的浏览器，
却不能保证请求本身是用户自愿发出的。

## 例子

假如一家银行用以执行转账操作的 URL 地址如下

```md
https://bank.example.com/withdraw?account=AccoutName&amount=1000&for=PayeeName
```

那么，一个恶意攻击者可以在**另一个网站**上放置如下代码：

```md
<img src="https://bank.example.com/withdraw?account=Alice&amount=1000&for=Badman" />
```

如果 Alice 的用户访问了恶意站点，而她之前刚访问过银行不久，登录信息尚未过期，那
么她就会损失 1000 资金。

这种恶意的网址可以有很多种形式，藏身于网页中的许多地方。此外，攻击者也不需要控制
放置恶意网址的网站。例如他可以将这种地址藏在**论坛，博客**等任何用户生成内容的网
站中。这意味着如果服务端没有合适的防御措施的话，用户即使访问熟悉的可信网站也有受
攻击的危险。

比如:小明同学登录了某网上银行，他来到了网上银行的帖子区，看到一个帖子下面有一个
链接写着**科学理财，年收益率 70％**，小明同学好奇的点开了这个链接，结果发现自己
的账户少了 10000 元。这是这么回事呢？

原来黑客在链接中藏了一个请求，这个请求直接利用小明同学的身份给银行发送了一个转账
请求，也就是通过你的 Cookie 向银行发出请求。
`＜a src＝http://www.bank.com/transfer?bankld＝007＆money＝10000＞科学理财，年收益率70％＜／＞`，

能够看出，攻击者并不能通过 CSRF 攻击来直接获取用户的账户控制权，也不能直接窃取用
户的任何信息。他们能做到的，是欺骗用户的浏览器，让其以用户的名义执行操作。

## 防御措施

### 检查 Referer 字段,同源检测

在 HTTP 协议中，每一个异步请求都会携带两个 Header，用于标记来源域名：Origin
Header 、Referer Header。这两个 Header 在浏览器发起请求时，大多数情况会自动带上
，并且不能由前端自定义内容。服务器可以通过解析这两个 Header 中的域名，确定请求的
来源域。

使用严格的 Referer 验证策略来防御登陆 CSRF，因为登陆的表单一般都是通 过 HTTPS 发
送，在合法请求里面的 Referer 都是真实可靠的。通过 referer 判断页面 来源进行 CSRF
防护，该方式无法防止站内 CSRF 攻击及 referer 字段伪造。

对于更长远的建议，我们希望能用 Origin 字段来替代 Referer，因为这样既保 留了既有
效果，又尊重了用户的隐私。最终要废除利用 token 来防御 CSRF 的方式，因 为这样网站
就可以更好的保护无论是 HTTP 还是 HTTPS 请求，而不用担心 token 是否 会泄露。

### 添加校验 token

由于 CSRF 的本质在于攻击者欺骗用户去访问自己设置的地址，所以如果要求在访问敏感数
据请求时，要求用户浏览器提供不保存在 cookie 中，并且攻击者无法伪造的数据作为校验
，那么攻击者就无法再执行 CSRF 攻击。这种数据通常是窗体中的一个数据项。服务器将其
生成并附加在窗体中，其内容是一个伪随机数。当客户端通过窗体提交请求时，这个伪随机
数也一并提交上去以供校验。正常的访问时，客户端浏览器能够正确得到并传回这个伪随机
数，而通过 CSRF 传来的欺骗性攻击中，攻击者无从事先得知这个伪随机数的值，服务端就
会因为校验 token 的值为空或者错误，拒绝这个可疑请求。

### CSRF Token

令牌同步模式（英语：Synchronizer token pattern，简称 STP）。  
原理是：当用户发送请求时，服务器端应用将 token 嵌入 HTML 表格，并发送给客户端。
客户端提交 HTML 表格时候，会将令牌发送到服务端，令牌的验证是由服务端实行的。令牌
可以通过任何方式生成，只要确保随机性和唯一性（如：使用随机种子）。这样确保攻击者
发送请求时候，由于没有该令牌而无法通过验证。

比如:Django 框架默认带有 STP 功能

```php
<form method="post">
    {% csrf_token %}
</form>
```

```php
<form method="post">
    <input type="hidden" name="csrfmiddlewaretoken" value="KbyUmhTLMpYj7CD2di7JKP1P3qmLlkPt" />
</form>
```

### token

STP 能在 HTML 下运作顺利，但会导致服务端的复杂度升高，复杂度源于令牌的生成和验证
。因为令牌是唯一且随机，如果每个表格都使用一个唯一的令牌，那么当页面过多时，服务
器由于生产令牌而导致的负担也会增加。而使用会话（session）等级的令牌代替的话，服
务器的负担将没有那么重。

通过 token 方式进行 CSRF 防护，在服务器端对比 POST 提交参数的 token 与 Session
中绑定的 token 是否一致。

### 验证码

重要业务上功能点使用动态验证码进行 CSRF 防护原密码: 对于修改密码操作 ，推荐附加
上原密码的验证白名单： 对于那些有特定跨站需求的请求，网站应该建立一 份白名单，比
如主页等。

### http method

校验请求严格区分好 POST 与 GET 的数据请求

### Samesite 属性

最新的谷歌浏览器支持了最新的 HTTP 协议，那就是为 Set-Cookie 响应头新增 Samesite
属性，从源头上解决这个问题。它用来标明这个 Cookie 是个“同站 Cookie”，同站 Cookie
只能作为第一方 Cookie，不能作为第三方 Cookie，Samesite 有两个属性值，分别是
Strict 和 Lax。 实际上，这意味着只有当 cookie 的站点与浏览器的 URL 栏中当前显示
的站点相匹配时，cookie 才会被发送。

```shell
Set-Cookie: Auth=USER123ABCD; SameSite=Strict; secure; httponly;
```

假如，淘宝网站用来识别用户登录与否的 Cookie 被设置成了 Samesite=Strict。

那么用户从 百度搜索页面 甚至 天猫页面 的链接点击进入淘宝后，淘宝都不会是登录状态
，因为淘宝的服务器不会接受到那个 Cookie，其它网站发起的对淘宝的任意请求`都不会带
上那个 Cookie。

### 双重 Cookie

显然单纯的 csrf 只能让请求中带有 cookie 但是并不能读取 cookie 加入到 POST 或 URL
中。在提交前先用 js 读取用于验证的 cookie 值加入到提交字段。这样就形成了双提交（
验证字段有两份，一份在 cookie 中，一份在 POST 或 URL 中）。

相较于与 token，双重 cookie 不需要服务器做额外扩容。只需要在请求中加一个额外的字
段，其值和 cookie 一致。因为上文提到过，攻击者没法获取到 cookie，只是在发起请求
时会携带。在服务端收到请求时，如果没有和 cookie 值一样的额外字段，就可以认为是来
自恶意网站。

### LocalStorage

在 LocalStorage 里存放登录凭证 CSRF 的关键是：cookie 是自动附在请求里的，那如果
登录凭证不是放在 cookie 而是 LocalStorage 里的话，比如使用 jwt 方案，那就从根本
上破解了 CSRF 攻击了，不过这样的话，就需要防止 XSS 攻击了。

### 其他

其他的还有，Token 验证、CSRF token 验证 、自定义请求头、验证码、短信 OTP(一次性
密码)。 在 LocalStorage 里存放登录凭证

<!--

1. 自定义请求头。比如:"X-CSRF-Token"，然后在服务器端进行检查。 这是可行的，因为只有 JavaScript 可以用于在 Ajax 请求上添加自定义头，而且只能在其原始内部
1. [为什么cookie会有sameSite属性?-真实案例解释CSRF的三种攻击方式 - 掘金](https://juejin.cn/post/6859276462504017927#heading-3)

-->

---

1. [Cross-Site Request Forgery (CSRF) Explained - YouTube](https://www.youtube.com/watch?v=eWEgUcHPle0)
