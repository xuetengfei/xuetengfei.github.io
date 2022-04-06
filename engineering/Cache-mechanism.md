# <a href="../engineering/Cache-mechanism.mm.html"  target="_blank">知识点脑图(大)</a>

[知识点脑图](./Cache-mechanism.mm.html ':include')

## HTTP 缓存

如何避免不必要的网络请求？浏览器的 HTTP 缓存是您的第一道防线。虽然它并非是最强大
或最灵活的方法，并且对缓存响应生命周期的控制有限，但它具有一定效率，所有浏览器均
支持，而且无需太多工作。

缓存是一种保存资源副本并在下次请求时直接使用该副本的技术。当 web 缓存发现请求的
资源已经被存储，它会拦截请求，返回该资源的拷贝，而不会去源服务器重新下载。这样带
来的好处有：缓解服务器端压力，提升性能(获取资源的耗时更短了)。对于网站来说，缓存
是达到高性能的重要组成部分。缓存需要合理配置，因为并不是所有资源都是永久不变的：
重要的是对一个资源的缓存应截止到其下一次发生改变（即不能缓存过期的资源）。

## 缓存操作的目标

HTTP 缓存不是必须的，但重用缓存的资源通常是必要的。然而常见的 HTTP 缓存只能存储
GET 响应，对于其他类型的响应则无能为力。缓存的关键主要包括 request method 和目标
URI（一般只有 GET 请求才会被缓存）。 普遍的缓存案例:

<!-- 1. 一个检索请求的成功响应: 对于 GET 请求，响应状态码为：200，则表示为成功。一个
   包含例如 HTML 文档，图片，或者文件的响应。
2. 永久重定向: 响应状态码：301。
3. 错误响应: 响应状态码：404 的一个页面。
4. 不完全的响应: 响应状态码 206，只返回局部的信息。
5. 除了 GET 请求外，如果匹配到作为一个已被定义的 cache 键名的响应。针对一些特定
   的请求，也可以通过关键字区分多个存储的不同响应以组成缓存的内容。 -->

<!-- ### 对 http 请求来说，客户端缓存分三类：

1. 不发任何请求，直接从缓存中取数据，代表的特性有： Expires
   ，Cache-Control=<\number！=0\>和 appcache
2. 发请求确认是否新鲜，再决定是否返回 304 并从缓存中取数据 :代表的特性有
   ：Last-Modified/If-Modified-Since，Etag/If-None-Match
3. 直接发送请求， 没有缓存，代表的特性有：Cache-Control：max-age=0/no-cache -->

<!-- ### 强缓存 200

用户发送的请求，直接从客户端缓存中获取，不发送请求到服务器，不与服务器发生交互行
为。

### 协商缓存 304

用户发送的请求，发送到服务器后，由服务器判定是否从缓存中获取资源。

两者共同点：客户端获得的数据最后都是从客户端缓存中获得。
两者的区别：从名字就可以看出，强缓存不与服务器交互，而协商缓存则需要与服务器交互
。 -->

## 浏览器缓存过程

浏览器第一次加载资源，服务器返回 200，浏览器将资源文件从服务器上请求下载下来，并
把 response header 及该请求的返回时间一并缓存；

下一次加载资源时，先比较当前时间和上一次返回 200 时的时间差，如果没有超过
cache-control 设置的 max-age，则没有过期，命中强缓存，不发请求直接从本地缓存读取
该文件（如果浏览器不支持 HTTP1.1，则用 expires 判断是否过期）；如果时间过期，则
向服务器发送 header 带有 If-None-Match 和 If-Modified-Since 的请求；

服务器收到请求后，优先根据 Etag 的值判断被请求的文件有没有做修改，Etag 值一致则
没有修改，命中协商缓存，返回 304；如果不一致则有改动，直接返回新的资源文件带上新
的 Etag 值并返回 200；

如果服务器收到的请求没有 Etag 值，则将 If-Modified-Since 和被请求文件的最后修改
时间做比对，一致则命中协商缓存，返回 304；不一致则返回新的 last-modified 和文件
并返回 200；

### 浏览器缓存过程(总流程图)

![20220406-9XHiln-modified.e4f6e79a](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220406-9XHiln-modified.e4f6e79a.png)

#### 浏览器判定是否有缓存

```javascript
200 ok from cache
200 ok from disk cache
200 ok from memory cache
304 not modified
```

#### 缓存是否过期

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Cache-Control-1.png" width='500px'/>

Cache-Control 与 Expires 的作用一致，都是指明当前资源的有效期，控制浏览器是否直
接从浏览器缓存取数据还是重新发请求到服务器取数据。 只不过 Cache-Control 的选择更
多，设置更细致，如果同时设置的话，其优先级高于 Expires。

> expires

Http1.0 中的标准，表明过期时间，注意此处的时间都是指的是服务器的时间。

> Cache-Control

Http1.1 中的标准，可以看成是 expires 的补充。使用的是相对时间的概念。

简单介绍下 Cache-Control 的属性设置。

```md
1. max-age: 设置缓存的最大的有效时间，单位为秒（s）。max-age 会覆盖掉 Expires
2. s-maxage: 只用于共享缓存，比如 CDN 缓存（s -> share）。与 max-age 的区别是
   ：max-age 用于普通缓存，而 s-maxage 用于代理缓存。如果存在 s-maxage,则会覆盖
   max-age 和 Expires.
3. public：响应会被缓存，并且在多用户间共享。默认是 public。
4. private: 响应只作为私有的缓存，不能在用户间共享。如果要求 HTTP 认证，响应会自
   动设置为 private。
5. no-cache: 指定不缓存响应，表明资源不进行缓存。但是设置了 no-cache 之后并不代
   表浏览器不缓存，而是在缓存前要向服务器确认资源是否被更改。因此有的时候只设置
   no-cache 防止缓存还是不够保险，还可以加上 private 指令，将过期时间设为过去的
   时间。
6. no-store: 绝对禁止缓存。
7. must-revalidate: 如果页面过期，则去服务器进行获取。这个过程执行完后，如果判定
   为未过期，则使用客户端缓存。那么就是属于`强缓存`。
```

#### 跟服务器协商是否使用缓存

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/etag-1.png" width='500px'/>

<!-- 到这一步的时候，浏览器会向服务器发送请求，同时如果上一次的缓存中有 Last-modified
和 Etag 字段，
浏览器将在 request header 中加入 If-Modified-Since（对应于 Last-modified）， 和
If-None-Match（对应于 Etag）。
Last-modified: 表明请求的资源上次的修改时间。
If-Modified-Since：客户端保留的资源上次的修改时间。
Etag：资源的内容标识。（不唯一，通常为文件的 md5 或者一段 hash 值，只要保证写入
和验证时的方法一致即可）
If-None-Match： 客户端保留的资源内容标识。

通常情况下，如果同时发送 If-None-Match 、If-Modified-Since 字段，服务器只要比较
etag 的内容即可，当然具体处理方式，看服务器的约定规则。 -->

到这一步的时候，浏览器会向服务器发送请求， 同时如果上一次的缓存中有
Last-modified 和 Etag 字段，浏览器将在 request header 中加入 If-Modified-Since（
对应于 Last-modified）， 和 If-None-Match（对应于 Etag）。

ETag 和 If-None-Match：这两个要一起说。Etag 是上一次加载资源时，服务器返回的
response header，是对该资源的一种唯一标识，只要资源有变化，Etag 就会重新生成。浏
览器在下一次加载资源向服务器发送请求时，会将上一次返回的 Etag 值放到 request
header 里的 If-None-Match 里，服务器接受到 If-None-Match 的值后，会拿来跟该资源
文件的 Etag 值做比较，如果相同，则表示资源文件没有发生改变，命中协商缓存。

Last-Modified 和 If-Modified-Since：这两个也要一起说。Last-Modified 是该资源文件
最后一次更改时间，服务器会在 response header 里返回，同时浏览器会将这个值保存起
来，在下一次发送请求时，放到 request header 里的 If-Modified-Since 里，服务器在
接收到后也会做比对，如果相同则命中协商缓存。

![验证器,确保缓存内容仍然可用](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220221-ZT7SbW-275_2252940556_.jpg)

#### 协商缓存

在这个阶段，服务器一般会将 Cache-control、expires 、last-modified、date、etag 等
字段在 response header 中返回，便于下次缓存。当然具体的场景，也是看服务器的约定
规则设定。

1. Last-Modified：标示这个响应资源的最后修改时间。web 服务器在响应请求时，告诉浏
   览器资源的最后修改时间。

2. If-Modified-Since：当资源过期时（使用 Cache-Control 标识的 max-age），发现资
   源具有 Last-Modified 声明，则再次向 web 服务器请求时带上头
   If-Modified-Since，表示请求时间。web 服务器收到请求后发现有头
   If-Modified-Since 则与被请求资源的最后修改时间进行比对。若最后修改时间较新，
   说明资源又被改动过，则响应整片资源内容（写在响应消息包体内），HTTP 200；若最
   后修改时间较旧，说明资源无新修改，则响应 HTTP 304 (无需包体，节省浏览)，告知
   浏览器继续使用所保存的 cache。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Last-Modified_If-Modified-Since.jpg"/>

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/304size.jpg"/>

Etag：web 服务器响应请求时，告诉浏览器当前资源在服务器的唯一标识（生成规则由服务
器决定，具体下文中介绍）。 If-None-Match：当资源过期时（使用 Cache-Control 标识
的 max-age），发现资源具有 Etage 声明，则再次向 web 服务器请求时带上头
If-None-Match （Etag 的值）。 web 服务器收到请求后发现有头 If-None-Match 则与被
请求资源的相应校验串进行比对，决定返回 200 或 304。为什么有了 Last-Modified 还要
Etag 你可能会觉得使用 Last-Modified 已经足以让浏览器知道本地的缓存副本是否足够新
，为什么还需要 Etag（实体标识）呢？HTTP1.1 中 Etag 的出现主要是为了解决几个
Last-Modified 比较难解决的问题：

Last-Modified 标注的最后修改只能精确到秒级，如果某些文件在 1 秒钟以内，被修改多
次的话，它将不能准确标注文件的修改时间如果某些文件会被定期生成，当有时内容并没有
任何变化，但 Last-Modified 却改变了，导致文件没法使用缓存有可能存在服务器没有准
确获取文件修改时间，或者与代理服务器时间不一致等情形 Etag 的实现

## 用户行为对浏览器缓存的控制

地址栏访问，链接跳转是正常用户行为，将会触发浏览器缓存机制； F5 刷新，浏览器会设
置 max-age=0，跳过强缓存判断，会进行协商缓存判断； ctrl+F5 刷新，跳过强缓存和协
商缓存，直接从服务器拉取资源。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/user-cache.png" width='500px'/>

1. [深入理解浏览器的缓存机制](https://www.infoq.cn/article/8VU-VCrhoxducaFPrNOL)
2. [HTTP 缓存 - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)
3. [Cache-Control - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)
4. [HTTP 缓存 | 网络基础 | 谷歌开发者](https://developers.google.com/web/fundamentals/performance/get-started/httpcaching-6)
5. [使用 HTTP 缓存避免不必要的网络请求](https://web.dev/http-cache/)
6. [Module ngx_http_headers_module](http://nginx.org/en/docs/http/ngx_http_headers_module.html)
7. [Express 4.x - API Reference](https://expressjs.com/en/api.html#express.static)
