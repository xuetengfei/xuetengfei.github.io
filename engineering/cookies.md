<!-- <figure>
  <img src='https://webdev.imgix.net/samesite-cookies-explained/set-cookie-response-header.png
'/>
  <figcaption>Servers set cookies using the Set-Cookie header.</figcaption>
</figure>

<figure>
 <img src='https://webdev.imgix.net/samesite-cookies-explained/cookie-request-header.png'/>
  <figcaption>Your browser sends cookies back in the Cookie header.</figcaption>
</figure>

<figure>
 <img src='https://webdev.imgix.net/samesite-cookies-explained/cross-site-set-cookie-response-header.png'/>
  <figcaption>Cookies may come from a variety of different domains on one page.</figcaption>
</figure> -->

#### As old as the Web itself

cookie 是向 web 站点添加持久状态的方法之一。服务器使用 **set-cookie** 标头设置 cookie。您的浏览器在 Cookie 头中发送回 Cookie
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200512114240%20cook-work.jpg' alt='20200512114240cook-work'/>

#### 设置 Cookie

cookie 是向 web 站点添加持久状态的方法之一。设置 Cookie 其实是通过在 HTTP 响应中设置 set-cookie 头完成的，每一个 set-cookie 都会让浏览器在 Cookie 中存一个键值对。在设置 Cookie 值的同时，协议还支持许多参数来配置这个 Cookie 的传输、存储和权限。

```md
- {Number} maxAge: 设置这个键值对在浏览器的最长保存时间。是一个从服务器当前时刻开始的毫秒数。

- {Date} expires: 设置这个键值对的失效时间，
  如果设置了 maxAge，expires 将会被覆盖。如果 maxAge 和 expires 都没设置，
  Cookie 将会在浏览器的会话失效（一般是关闭浏览器时）的时候失效。

- {String} path: 设置键值对生效的 URL 路径，默认设置在根路径上（/），
  也就是当前域名下的所有 URL 都可以访问这个 Cookie。

- {String} domain: 设置键值对生效的域名，默认没有配置，可以配置成只在指定域名才能访问。

- {Boolean} httpOnly: 设置是否可以被 js 访问，
  默认为 true，不允许被 js 访问。** document.cookie 是否可以读写 **

- {Boolean} secure: 设置只在 HTTPS 连接上传输，
  框架会帮我们判断当前是否在 HTTPS 连接上自动设置 secure 的值。
```

#### 获取 Cookie

服务器使用 **set-cookie** 标头设置 cookie。浏览器在 **Cookie 头**中发送回 Cookie 。由于 HTTP 请求中的 Cookie 是在一个 header 中传输过来的，可以从 Cookie 中获取键值对。

#### First-Party vs Third-Party Cookie

访问网站 **a.com** 并尝试从相同的域名 **a.com** 访问服务，则生成的 Cookie 将被视为第一方 Cookie。 由于 Cookie 是由同一网站创建的，因此您可以在访问 a.com 的网络服务时享受同一网站上已保存的登录信息，购物车项目，网站偏好设置等。

而如果您访问 a.com 网站，但该页面包含来自其他域名 b.com 的内容（图像，iframe 等），如果 b.com 设置了 Cookie，那么这个 cookies 会被视为第三方 Cookie，因为它们的名称与网址栏中的名称不同：a.com。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200421203254%20same-site-cookie-diagram-1.png' alt='20200421203254same-site-cookie-diagram-1'/>

<figure>
 <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200421161333%20tmall-cookies.jpg' alt='20200421161333tmall-cookies'/>
  <figcaption>天猫里面有很多阿里妈妈广告联盟的请求，设置了很多阿里妈妈的 cookies，便于跟踪。</figcaption>
</figure>

<!--
https://blog.heroku.com/chrome-changes-samesite-cookie
https://searchengineland.com/the-state-of-tracking-and-data-privacy-in-2020-329259
https://web.dev/samesite-cookies-explained/
https://auth0.com/blog/browser-behavior-changes-what-developers-need-to-know/
https://juejin.im/post/5e97124df265da47b27d97ff#heading-1
http://madmartech.com/first-party-cookie-vs-third-party-cookie/

 -->
