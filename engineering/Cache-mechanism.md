## 背景

在对页面的性能优化时，特别是移动端的优化，缓存是非常重要的一环。
浏览器缓存机制设置众多：html5 appcache，Expires，Cache-control，Last-Modified/If-Modified-Since，Etag/If-None-Match，max-age=0/no-cache..., 之前对某一个或几个特性了解一二，但是混在一起再加上浏览器的行为，就迷（meng）糊(bi)了.

### 对 http 请求来说，客户端缓存分三类：

1. 不发任何请求，直接从缓存中取数据，代表的特性有： Expires ，Cache-Control=<\number！=0\>和 appcache
2. 发请求确认是否新鲜，再决定是否返回 304 并从缓存中取数据 :代表的特性有：Last-Modified/If-Modified-Since，Etag/If-None-Match
3. 直接发送请求， 没有缓存，代表的特性有：Cache-Control：max-age=0/no-cache

### 强缓存 200

用户发送的请求，直接从客户端缓存中获取，不发送请求到服务器，不与服务器发生交互行为。

### 协商缓存 304

用户发送的请求，发送到服务器后，由服务器判定是否从缓存中获取资源。

两者共同点：客户端获得的数据最后都是从客户端缓存中获得。  
两者的区别：从名字就可以看出，强缓存不与服务器交互，而协商缓存则需要与服务器交互。

### 浏览器缓存总流程图

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/cache.png" width='600px'/>

图中有(a)(b)(c)(d)四个过程的处理方式

### a.浏览器判定是否有缓存

```javascript
200 ok from cache
200 ok from disk cache
200 ok from memory cache
304 not modified
```

### b.缓存是否过期

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Cache-Control-1.png" width='500px'/>

Cache-Control 与 Expires 的作用一致，都是指明当前资源的有效期，控制浏览器是否直接从浏览器缓存取数据还是重新发请求到服务器取数据。 只不过 Cache-Control 的选择更多，设置更细致，如果同时设置的话，其优先级高于 Expires。

> expires

Http1.0 中的标准，表明过期时间，注意此处的时间都是指的是服务器的时间。

> Cache-Control

Http1.1 中的标准，可以看成是 expires 的补充。使用的是相对时间的概念。

简单介绍下 Cache-Control 的属性设置。

1. max-age: 设置缓存的最大的有效时间，单位为秒（s）。max-age 会覆盖掉 Expires
2. s-maxage: 只用于共享缓存，比如 CDN 缓存（s -> share）。与 max-age 的区别是：max-age 用于普通缓存，
   而 s-maxage 用于代理缓存。如果存在 s-maxage,则会覆盖 max-age 和 Expires.
3. public：响应会被缓存，并且在多用户间共享。默认是 public。
4. private: 响应只作为私有的缓存，不能在用户间共享。如果要求 HTTP 认证，响应会自动设置为 private。
5. no-cache: 指定不缓存响应，表明资源不进行缓存。但是设置了 no-cache 之后并不代表浏览器不缓存，而是在缓存前要向服务器确认资源是否被更改。因此有的时候只设置 no-cache 防止缓存还是不够保险，还可以加上 private 指令，将过期时间设为过去的时间。
6. no-store: 绝对禁止缓存。
7. must-revalidate: 如果页面过期，则去服务器进行获取。

这个过程执行完后，如果判定为未过期，则使用客户端缓存。那么就是属于`强缓存`。

### c.跟服务器协商是否使用缓存

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/etag-1.png" width='500px'/>

到这一步的时候，浏览器会向服务器发送请求，同时如果上一次的缓存中有 Last-modified 和 Etag 字段，  
浏览器将在 request header 中加入 If-Modified-Since（对应于 Last-modified）， 和 If-None-Match（对应于 Etag）。  
Last-modified: 表明请求的资源上次的修改时间。  
If-Modified-Since：客户端保留的资源上次的修改时间。  
Etag：资源的内容标识。（不唯一，通常为文件的 md5 或者一段 hash 值，只要保证写入和验证时的方法一致即可）  
If-None-Match： 客户端保留的资源内容标识。

通常情况下，如果同时发送 If-None-Match 、If-Modified-Since 字段，服务器只要比较 etag 的内容即可，当然具体处理方式，看服务器的约定规则。

### d.协商缓存

在这个阶段，服务器一般会将 Cache-control、expires 、last-modified、date、etag 等字段在 response header 中返回，便于下次缓存。当然具体的场景，也是看服务器的约定规则设定。

1. Last-Modified：标示这个响应资源的最后修改时间。web 服务器在响应请求时，告诉浏览器资源的最后修改时间。

2. If-Modified-Since：当资源过期时（使用 Cache-Control 标识的 max-age），发现资源具有 Last-Modified 声明，则再次向 web 服务器请求时带上头 If-Modified-Since，表示请求时间。web 服务器收到请求后发现有头 If-Modified-Since 则与被请求资源的最后修改时间进行比对。若最后修改时间较新，说明资源又被改动过，则响应整片资源内容（写在响应消息包体内），HTTP 200；若最后修改时间较旧，说明资源无新修改，则响应 HTTP 304 (无需包体，节省浏览)，告知浏览器继续使用所保存的 cache。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Last-Modified_If-Modified-Since.jpg"/>

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/304size.jpg"/>

Etag：web 服务器响应请求时，告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器决定，具体下文中介绍）。
If-None-Match：当资源过期时（使用 Cache-Control 标识的 max-age），发现资源具有 Etage 声明，则再次向 web 服务器请求时带上头 If-None-Match （Etag 的值）。 web 服务器收到请求后发现有头 If-None-Match 则与被请求资源的相应校验串进行比对，决定返回 200 或 304。
为什么有了 Last-Modified 还要 Etag
你可能会觉得使用 Last-Modified 已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要 Etag（实体标识）呢？HTTP1.1 中 Etag 的出现主要是为了解决几个 Last-Modified 比较难解决的问题：

Last-Modified 标注的最后修改只能精确到秒级，如果某些文件在 1 秒钟以内，被修改多次的话，它将不能准确标注文件的修改时间如果某些文件会被定期生成，当有时内容并没有任何变化，但 Last-Modified 却改变了，导致文件没法使用缓存有可能存在服务器没有准确获取文件修改时间，或者与代理服务器时间不一致等情形 Etag 的实现

### 用户行为

用户行为影响浏览器的缓存行为。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/user-cache.png" width='500px'/>

1. [etoah/BrowserCachePolicy: Detail of Browser Cache Policy](https://github.com/etoah/BrowserCachePolicy)
1. [深入理解浏览器的缓存机制](https://www.infoq.cn/article/8VU-VCrhoxducaFPrNOL)
