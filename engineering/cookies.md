# HTTP Cookie

> As old as the Web itself.Servers set cookies using the Set-Cookie header. Your
> browser sends cookies back in the Cookie header.Cookies may come from a
> variety of different domains on one page.

HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本
地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。
通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie
使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能。 Cookie 主要用于以下三个方
面：

1. 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
2. 个性化设置（如用户自定义设置、主题等）
3. 浏览器行为跟踪（如跟踪分析用户行为等）

## 工作流程

当服务器收到 HTTP 请求时，服务器可以在响应头里面添加一个 Set-Cookie 选项。浏览器
收到响应后通常会保存下 Cookie，之后浏览器对该服务器每一次请求中都通过 Cookie 请
求头部将 Cookie 信息发送给服务器。另外，Cookie 的过期时间、域、路径、有效期、适
用站点都可以根据需要来指定。Cookie 可能会被完全移除，例如在浏览器的隐私设置里面
设置为禁用 cookie。

![工作流程示意图](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200512114240%20cook-work.jpg)

```javascript
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

## 设置 Cookie

设置 Cookie 其实是通过在 HTTP 响应中设置 set-cookie 头完成的，每一个 set-cookie
都会让浏览器在 Cookie 中存一个键值对。在设置 Cookie 值的同时，协议还支持许多参数
来配置这个 Cookie 的传输、存储和权限。

[Set-Cookie - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie)

```javascript
// Set-Cookie
Set-Cookie: <cookie-name>=<cookie-value>
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
Set-Cookie: <cookie-name>=<cookie-value>; Secure
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly

Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Strict
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Lax

// Multiple directives are also possible, for example:
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly

Set-Cookie: sessionid=38afes7a8; HttpOnly; Path=/
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly

```

## 获取 Cookie

服务器使用 **set-cookie** 标头设置 cookie。浏览器在 **Cookie 头**中发送回 Cookie
。由于 HTTP 请求中的 Cookie 是在一个 header 中传输过来的，可以从 Cookie 中获取键
值对。

[Document.cookie - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)

```js
Cookie: <cookie-list>
Cookie: name=value
Cookie: name=value; name2=value2; name3=value3
Cookie: PHPSESSID=298zf09hf012fh2; csrftoken=u32t4o3tb3gg43; _gat=1;
```

## First-Party vs Third-Party Cookie

访问网站 **a.com** 并尝试从相同的域名 **a.com** 访问服务，则生成的 Cookie 将被视
为第一方 Cookie。 由于 Cookie 是由同一网站创建的，因此您可以在访问 a.com 的网络
服务时享受同一网站上已保存的登录信息，购物车项目，网站偏好设置等。

而如果您访问 a.com 网站，但该页面包含来自其他域名 b.com 的内容（图像，iframe 等
），如果 b.com 设置了 Cookie，那么这个 cookies 会被视为第三方 Cookie，因为它们的
名称与网址栏中的名称不同：a.com。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200421203254%20same-site-cookie-diagram-1.png' alt='20200421203254same-site-cookie-diagram-1'/>

<figure>
 <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200421161333%20tmall-cookies.jpg' alt='20200421161333tmall-cookies'/>
  <figcaption>天猫里面有很多阿里妈妈广告联盟的请求，设置了很多阿里妈妈的 cookies，便于跟踪。</figcaption>
</figure>

## Sending Cookies in Express.js

```javascript
// sentTokenCookie creates a cookie which expires after one day
const sendUserIdCookie = (userId, res) => {
  // Our token expires after one day
  const oneDayToSeconds = 24 * 60 * 60;
  res.cookie('userId', userId, {
    maxAge: oneDayToSeconds,
    // You can't access these tokens in the client's javascript
    httpOnly: true,
    // Forces to use https in production
    secure: process.env.NODE_ENV === 'production' ? true : false,
  });
};

// returns an object with the cookies' name as keys
const getAppCookies = req => {
  // We extract the raw cookies from the request headers
  const rawCookies = req.headers.cookie.split('; ');
  // rawCookies = ['myapp=secretcookie, 'analytics_cookie=beacon;']

  const parsedCookies = {};
  rawCookies.forEach(rawCookie => {
    const parsedCookie = rawCookie.split('=');
    // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
    parsedCookies[parsedCookie[0]] = parsedCookie[1];
  });
  return parsedCookies;
};

// Returns the value of the userId cookie
const getUserId = (req, res) => getAppCookies(req, res)['userId'];
```

[Sending and Receiving Cookies from Express.js ← Alligator.io](https://alligator.io/nodejs/express-cookies/)

---

1. [Cookie - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie)
2. [HTTP cookies - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)
3. [SameSite cookie 配方](https://web.dev/samesite-cookie-recipes/)
4. [SameSite cookies - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
5. [Chrome's Changes Could Break Your App: Prepare for SameSite Cookie Updates | Heroku](https://blog.heroku.com/chrome-changes-samesite-cookie)
6. [Express cookie-session middleware](http://expressjs.com/en/resources/middleware/cookie-session.html)
