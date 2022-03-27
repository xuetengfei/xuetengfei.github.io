[跨域请求脑图](./CORS-mm.html ':include')
<a href="../Async/CORS-mm.html"  target="_blank">脑图(大)</a>  
<a href="../html/test-cors.html"  target="_blank">test-cors</a>

## why

要掌握跨域，首先要知道为什么会有跨域这个问题出现.

这个问题的始作俑者是浏览器的同源策略。同源策略是一个重要的安全策略，它用于限制一
个 [Origin](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin) 的文档或者
它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击
的媒介。

[浏览器的同源策略 - Web 安全 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

同源策略会让三种行为受限:

1. Cookie、LocalStorage 和 IndexDB 访问受限
2. 无法操作跨域 DOM（常见于 iframe）
3. Javascript 发起的 XHR 和 Fetch 请求受限

## 跨域请求

当`域、协议、端口`中任意一个不相同时，都算作不同域。不同域之间相互请求资源，就算
作`跨域`。

第一：如果是协议和端口造成的跨域问题“前台”是无能为力的。第二：在跨域问题上，仅仅
是通过“URL 的首部”来识别而不会根据域名对应的 IP 地址是否相同来判断。“URL 的首部”
可以理解为“协议, 域名和端口必须匹配”。

## 请求跨域了，那么请求到底发出去没有

在浏览器上面，CORS 限制的其实是「拿不到 response」，而不是「发不出 request」。所
以 request 其实已经发出去了，浏览器也拿到 response 了，只是它因为安全性考量不给
你。

出现「request has been blocked by CORS policy: No 'Access-Control-Allow-Origin'
header is present on the requested resource」 的错误。

因为归根结底，跨域是为了阻止用户读取到另一个域名下的内容，Ajax 可以获取响应，浏
览器认为这不安全，所以拦截了响应。但是表单并不会获取新的内容，所以可以发起跨域请
求。同时也说明了跨域并不能完全阻止 CSRF，因为请求毕竟是发出去了。

## 解决方法汇总

由简及深介绍各种存在的跨域请求解决方案，包括

```
document.domain、location.hash、 window.name、 window.postMessage、 JSONP、 WebSocket、 CORS 。
```

## 1. Jsonp(JSON with Padding)

jsonp 就是利用`<script>`标签没有跨域限制的“漏洞”,可以让网页从别的域名（网站）那
获取资料，即跨域读取数据。JSONP 都是 GET 和异步请求的，不存在其他的请求方式和同
步请求。JSONP 请求一定需要第三方的后端配合支持才可以。不安全可能会遭受 XSS 攻击
。

当需要通讯时，本站脚本创建一个`<script>`元素，地址指向第三方的 API 网址,并提供一
个回调函数来接收数据。

<a href="../html/JSONP.html"  target="_blank">test-JSONP</a>

```js
function jsonp({ url, params, callback }) {
  let script = document.createElement('script');
  params = { ...params, callback };
  let arrs = [];
  for (let key in params) {
    arrs.push(`${key}=${params[key]}`);
  }
  script.src = `${url}?${arrs.join('&')}`;
  script.type = 'text/javascript';
  script.async = true;
  // 当需要通讯时，本站脚本创建一个`<script>`元素，地址指向第三方的 API 网址
  var head = document.head;
  head.appendChild(script);
  // head.removeChild(script);
}

function jsonpCallback(data) {
  console.log('data: ', data);
}

jsonp({
  url: 'https://getbible.net/json',
  params: { passage: '1John1:1' },
  callback: 'jsonpCallback',
});
```

js 生成的头部的标签

```html
<script
  src="https://getbible.net/json?passage=1John1:1&amp;callback=jsonpCallback"
  type="text/javascript"
  async
></script>
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/jsonp-1558523147.jpg'/>

## 2. CORS

[跨源资源共享（CORS） - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)

跨域资源共享(CORS) 是一种机制，浏览器会自动进行 CORS 通信，实现 CORS 通信的关键
是后端。只要后端实现了 CORS，就实现了跨域。服务端设置
`Access-Control-Allow-Origin`就可以开启 CORS。 该属性表示哪些域名可以访问资源，
如果设置通配符则表示所有网站都可以访问资源。

![20220327-NkHZoq-add-header-Access-Control-Allow-Origin](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220327-NkHZoq-add-header-Access-Control-Allow-Origin.gif)

但是通过 CORS 这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为简单请
求和复杂请求。

## 有两种类型的跨源请求

### 简单的请求

一个 简单的请求 是指满足以下两个条件的请求：

1. 简单的方法：GET，POST 或 HEAD
2. 简单的 header —— 仅允许自定义下列 header：
   1. Accept、Accept-Language、Content-Language、Content-Type
   2. Content-Type 的值为 application/x-www-form-urlencoded、multipart/form-data
      、text/plain。

### 其他请求

当我们尝试发送一个非简单请求时，浏览器会发送一个特殊的“预检（preflight）”请求到
服务器 —— 询问服务器，你接受此类跨源请求吗？并且，除非服务器明确通过 header 进行
确认，否则非简单请求不会被发送。

## 用于简单请求的 CORS

如果一个请求是跨源的，浏览器始终会向其添加 `Origin` header。例如，如果我们从
`https://A.info/page` 请求 `https://B.com/request`，请求的 header 将会如下：

```bash
# 请求的 header 将会如下
# Origin 包含了确切的源（protocol/domain/port），没有路径

GET /request
Host: B.com
Origin: https://A.info
...
```

服务器可以检查 Origin，如果同意接受这样的请求，就会在响应中添加一个特殊的 header
`Access-Control-Allow-Origin`。该 header 包含了允许的源（示例中是
`https://A.info`），或者一个星号 `*`。然后响应成功，否则报错。

浏览器在这里扮演受被信任的中间人的角色：

浏览器确保发送的跨源请求带有正确的 Origin。它检查响应中的许可
Access-Control-Allow-Origin，如果存在，则允许 JavaScript 访问响应，否则将失败并
报错。

![20220327-rRLSYj-cors-简单请求](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220327-rRLSYj-cors-简单请求.gif)

```bash
# 一个响应示例：
200 OK
Content-Type:text/html; charset=UTF-8
Access-Control-Allow-Origin: https://A.info
```

![20220327-N0UjjO-Xnip2022-03-27_14-23-56](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220327-N0UjjO-Xnip2022-03-27_14-23-56.jpg)

## 用于“非简单”请求 CORS

可以使用任何 HTTP 方法：不仅仅是 GET/POST，也可以是 PATCH，DELETE 及其他。之前，
没有人能够设想网页能发出这样的请求。因此，可能仍然存在有些 Web 服务将非标准方法
视为一个信号：“这不是浏览器”。它们可以在检查访问权限时将其考虑在内。

因此，为了避免误解，任何“非标准”请求 —— 浏览器不会立即发出在过去无法完成的这类请
求。即在它发送这类请求前，会先发送“预检（preflight）”请求来请求许可。

预检请求使用 OPTIONS 方法，它没有 body，但是有两个 header：

`Access-Control-Request-Method` header 带有非简单请求的方法。
`Access-Control-Request-Headers` header 提供一个以逗号分隔的非简单 HTTP-header
列表。

如果服务器同意处理请求，那么它会进行响应，此响应的状态码应该为 200，没有 body，
只有 header：

`Access-Control-Allow-Origin` 必须为 `*` 或进行请求的源（例如 `https://A.info`）
才能允许此请求。 `Access-Control-Allow-Methods` 必须具有允许的方法。
`Access-Control-Allow-Headers` 必须具有一个允许的 header 列表。另外，header
Access-Control-Max-Age 可以指定缓存此权限的秒数。因此，浏览器不是必须为满足给定
权限的后续请求发送预检。

![20220327-wmjydp-Xnip2022-03-27_14-34-19](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220327-wmjydp-Xnip2022-03-27_14-34-19.jpg)

### 预检请求

预检请求发生在“幕后”，它对 JavaScript 不可见。 JavaScript 仅获取对主请求的响应，
如果没有服务器许可，则获得一个 error。

![20220327-cO3ZoM-预检请求](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220327-cO3ZoM-预检请求.gif)

```bash
OPTIONS /service.json
Host: site.com
Origin: https://javascript.info
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: Content-Type,API-Key
```

```bash
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Methods: PUT,PATCH,DELETE
Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
Access-Control-Max-Age: 86400
```

`Access-Control-Max-Age`带有一个表示秒的数字，则在给定的时间内，预检权限会被缓存
。上面的响应将被缓存 86400 秒，也就是一天。在此时间范围内，后续请求将不会触发预
检。假设它们符合缓存的配额，则将直接发送它们。

## 凭据（Credentials）

默认情况下，由 JavaScript 代码发起的跨源请求不会带来任何凭据（cookies 或者 HTTP
认证（HTTP authentication））。

这对于 HTTP 请求来说并不常见。通常，对 `http://site.com` 的请求附带有该域的所有
cookie。但是由 JavaScript 方法发出的跨源请求是个例外。例如
，`fetch('http://another.com')` 不会发送任何 cookie，即使那些 (!) 属于
another.com 域的 cookie。

为什么？这是因为具有凭据的请求比没有凭据的请求要强大得多。如果被允许，它会使用它
们的凭据授予 JavaScript 代表用户行为和访问敏感信息的全部权力。

服务器真的这么信任这种脚本吗？是的，它必须显式地带有允许请求的凭据和附加
header。

要在 fetch 中发送凭据，我们需要添加 credentials: "include" 选项，像这样：

```javascript
fetch('http://another.com', {
  credentials: 'include',
});
```

现在，fetch 将把源自 `another.com` 的 cookie 和我们的请求发送到该网站。

如果服务器同意接受 `带有凭据`的请求，则除了 `Access-Control-Allow-Origin` 外，服
务器还应该在响应 header 中添加 `Access-Control-Allow-Credentials: true`。

例如：

```bash
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Credentials: true
```

对于具有凭据的请求，禁止 Access-Control-Allow-Origin 使用星号`*`。如上所示，它必
须有一个确切的源。这是另一项安全措施，以确保服务器真的知道它信任的发出此请求的是
谁。

!>也就是说 response header 中存在 Access-Control-Allow-Credentials:true 那么
Access-Control-Allow-Origin 的值不能是通配符`*`。

## Response header

对于跨源请求，默认情况下，JavaScript 只能访问“简单” response header：
Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma

要授予 JavaScript 对任何其他 response header 的访问权限，服务器必须发送
Access-Control-Expose-Headers header。它包含一个以逗号分隔的应该被设置为可访问的
非简单 header 名称列表。

```bash
200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Expose-Headers: Content-Length,API-Key   # Expose-Headers
```

## Referer VS Origin

HTTP-header Referer，它通常包含发起网络请求的页面的 url。例如，当从
http://javascript.info/some/url fetch http://google.com 时，header 看起来如下：

```bash
Accept: */*
Accept-Charset: utf-8
Accept-Encoding: gzip,deflate,sdch
Connection: keep-alive
Host: google.com
Origin: http://javascript.info
Referer: http://javascript.info/some/url
```

是因为有时会没有 Referer。例如，当我们从 HTTPS（从高安全性访问低安全性）fetch
HTTP 页面时，便没有 Referer。我们需要 Origin，内容安全策略 可能会禁止发送
Referer。正如我们将看到的，fetch 也具有阻止发送 Referer 的选项，甚至允许修改它（
在同一网站内）。根据规范，Referer 是一个可选的 HTTP-header。正是因为 Referer 不
可靠，才发明了 Origin。浏览器保证跨源请求的正确 Origin。

<!--

## 总结

1. CORS 支持所有类型的 HTTP 请求，是跨域 HTTP 请求的根本解决方案
2. JSONP 只支持 GET 请求，JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS
   的网站请求数据。

不管是 Node 中间件代理还是 nginx 反向代理，主要是通过同源策略对服务器不加限制。
日常工作中，用得比较多的跨域方案是 cors 和 nginx 反向代理

-->

## 总结

CORS 就是通过由一堆的 response header 来跟浏览器讲说某些东西是前端有权限访问的

---

1. [跨源资源共享（CORS） - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)
2. [Fetch：跨源请求](https://zh.javascript.info/fetch-crossorigin#wei-shi-mo-xu-yao-cors-kua-yuan-qing-qiu-jian-shi)
3. [不要再问我跨域的问题了 - SegmentFault](https://segmentfault.com/a/1190000015597029)

<!--
[惊艳！15 张精美动图全面演示 CORS 过程！](https://mp.weixin.qq.com/s/Re1fvKKzi-rPpu6SmpqTJA)

业务场景
1. 去业务中台拉去一些数据的时候
2. API市场
 -->
