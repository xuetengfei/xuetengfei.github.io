浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识,浏览器每次
拿到返回的请求结果都会将该结果和缓存标识存入浏览器缓存中

以上两点结论就是浏览器缓存机制的关键，他确保了每个请求的缓存存入与读取，只要我们
再理解浏览器缓存的使用规则，那么所有的问题就迎刃而解了，本文也将围绕着这点进行详
细分析。为了方便大家理解，这里我们根据是否需要向服务器重新发起 HTTP 请求将缓存过
程分为两个部分，分别是强制缓存和协商缓存。

```md
1. 按缓存位置分类 (memory cache, disk cache, Service Worker 等)
1. 按失效策略分类 (Cache-Control, ETag 等) 帮助理解原理的一些案例缓存的应用模式
```

## 按缓存位置分类

我看过的大部分讨论缓存的文章会直接从 HTTP 协议头中的缓存字段开始，例如
Cache-Control, ETag, max-age 等。但偶尔也会听到别人讨论 memory cache, disk cache
等。那这两种分类体系究竟有何关联？是否有交叉？

实际上，HTTP 协议头的那些字段，都属于 disk cache 的范畴，是几个缓存位置的其中之
一。因此本着从全局到局部的原则，我们应当先从缓存位置开始讨论。等讲到 disk cache
时，才会详细讲述这些协议头的字段及其作用。

我们可以在 Chrome 的开发者工具中，Network -> Size 一列看到一个请求最终的处理方式
：如果是大小 (多少 K， 多少 M 等) 就表示是网络请求，否则会列出 from memory
cache, from disk cache 和 from ServiceWorker。

它们的优先级是：(由上到下寻找，找到即返回；找不到则继续)

- Service Worker
- Memory Cache
- Disk Cache
- 网络请求

## disk cache

disk cache 也叫 HTTP cache，顾名思义是存储在硬盘上的缓存，因此它是持久存储的，是
实际存在于文件系统中的。而且它允许相同的资源在跨会话，甚至跨站点的情况下使用，例
如两个站点都使用了同一张图片。

disk cache 会严格根据 HTTP 头信息中的各类字段来判定哪些资源可以缓存，哪些资源不
可以缓存；哪些资源是仍然可用的，哪些资源是过时需要重新请求的。当命中缓存之后，浏
览器会从硬盘中读取资源，虽然比起从内存中读取慢了一些，但比起网络请求还是快了不少
的。绝大部分的缓存都来自 disk cache。

关于 HTTP 的协议头中的缓存字段，我们会在稍后进行详细讨论。

凡是持久性存储都会面临容量增长的问题，disk cache 也不例外。在浏览器自动清理时，
会有神秘的算法去把“最老的”或者“最可能过时的”资源删除，因此是一个一个删除的。不过
每个浏览器识别“最老的”和“最可能过时的”资源的算法不尽相同，可能也是它们差异性的体
现。

## 按失效策略分类

memory cache 是浏览器为了加快读取缓存速度而进行的自身的优化行为，不受开发者控制
，也不受 HTTP 协议头的约束，算是一个黑盒。Service Worker 是由开发者编写的额外的
脚本，且缓存位置独立，出现也较晚，使用还不算太广泛。所以我们平时最为熟悉的其实是
disk cache，也叫 HTTP cache (因为不像 memory cache，它遵守 HTTP 协议头中的字段
)。平时所说的强制缓存，对比缓存，以及 Cache-Control 等，也都归于此类。

## 强制缓存 (也叫强缓存)

强制缓存的含义是，当客户端请求后，会先访问缓存数据库看缓存是否存在。如果存在则直
接返回；不存在则请求真的服务器，响应后再写入缓存数据库。

强制缓存直接减少请求数，是提升最大的缓存策略。 它的优化覆盖了文章开头提到过的请
求数据的全部三个步骤。如果考虑使用缓存来优化网页性能的话，强制缓存应该是首先被考
虑的。

## 对比缓存 (也叫协商缓存)

当强制缓存失效(超过规定时间)时，就需要使用对比缓存，由服务器决定缓存内容是否失效
。

流程上说，浏览器先请求缓存数据库，返回一个缓存标识。之后浏览器拿这个标识和服务器
通讯。如果缓存未失效，则返回 HTTP 状态码 304 表示继续使用，于是客户端继续使用缓
存；如果失效，则返回新的数据和缓存规则，浏览器响应数据后，再把规则写入到缓存数据
库。

对比缓存在请求数上和没有缓存是一致的，但如果是 304 的话，返回的仅仅是一个状态码
而已，并没有实际的文件内容，因此 在响应体体积上的节省是它的优化点。它的优化覆盖
了文章开头提到过的请求数据的三个步骤中的最后一个：“响应”。通过减少响应体体积，来
缩短网络传输时间。所以和强制缓存相比提升幅度较小，但总比没有缓存好。

对比缓存是可以和强制缓存一起使用的，作为在强制缓存失效后的一种后备方案。实际项目
中他们也的确经常一同出现。

对比缓存有 2 组字段(不是两个)：

### Last-Modified & If-Modified-Since

服务器通过 Last-Modified 字段告知客户端，资源最后一次被修改的时间，例如

```
Last-Modified: Mon, 10 Nov 2018 09:10:11 GMT
```

浏览器将这个值和内容一起记录在缓存数据库中。

下一次请求相同资源时时，浏览器从自己的缓存中找出“不确定是否过期的”缓存。因此在请
求头中将上次的 Last-Modified 的值写入到请求头的 If-Modified-Since 字段

服务器会将 If-Modified-Since 的值与 Last-Modified 字段进行对比。如果相等，则表示
未修改，响应 304；反之，则表示修改了，响应 200 状态码，并返回数据。

但是他还是有一定缺陷的：

如果资源更新的速度是秒以下单位，那么该缓存是不能被使用的，因为它的时间单位最低是
秒。

如果文件是通过服务器动态生成的，那么该方法的更新时间永远是生成的时间，尽管文件可
能没有变化，所以起不到缓存的作用。

### Etag & If-None-Match

为了解决上述问题，出现了一组新的字段 Etag 和 If-None-Match

Etag 存储的是文件的特殊标识(一般都是 hash 生成的)，服务器存储着文件的 Etag 字段
。之后的流程和 Last-Modified 一致，只是 Last-Modified 字段和它所表示的更新时间改
变成了 Etag 字段和它所表示的文件 hash，把 If-Modified-Since 变成了
If-None-Match。服务器同样进行比较，命中返回 304, 不命中返回新资源和 200。

Etag 的优先级高于 Last-Modified
