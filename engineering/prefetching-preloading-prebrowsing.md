当我们谈到前端的性能时，有很多方法可以提高 Web 性能。总是会提到比如合并、压缩、
缓存或者在服务器上开启 gzip 之类的，目的都是为了让页面加载的更快。

## 预加载稍后需要的内容

其中一种方法是提前预加载稍后需要的内容。预取 CSS 文件、预渲染整个页面或提前解析
域 - 当您真正需要它时，您不必等待它。

以前这种实践也被称为『prebrowsing』。但这并不是一种单一的技术，实际上可以拆分成
很多小点：dns-prefetch, subresource, prefetch, preconnect, 和 prerender.

更酷的是浏览器有一个简单的内置方式来完成所有这些事情。有六个`<link rel>`标签指示
浏览器预加载内容：

我们可以利用这些技术提前告知浏览器 web 中用到的核心资源。

```javascript
<link rel="dns-prefetch" href="https://example.com" />
<link rel="prefetch" href="/style.css" as="style" />
<link rel="preload" href="/style.css" as="style" />
<link rel="preconnect" href="https://example.com" />
<link rel="prerender" href="https://example.com/about.html" />
<link rel="modulepreload" href="/script.js" />
```

```bash
preload– 当您在几秒钟内需要资源时
prefetch– 当您需要下一页的资源时
preconnect– 当你知道你很快就会需要一个资源，但你还不知道它的完整 URL
dns-prefetch– 当你知道你很快就会需要一个资源，但你还不知道它的完整 URL 时（对于旧浏览器）
prerender– 当您确定大多数用户将导航到特定页面，并且您想加快速度时
modulepreload– 当你很快需要一个 ES 模块脚本时
```

## preload

`<link rel="preload">`告诉浏览器尽快下载和缓存资源（如脚本或样式表）。当在加载页
面几秒钟后需要该资源并且想要加快速度时，它会很有帮助。下载资源后，浏览器不会对资
源执行任何操作。不执行脚本，不应用样式表。它只是被缓存了——所以当其他东西需要它时
，它可以立即可用。

```html
<link rel="preload" href="/style.css" as="style" />
<link rel="preload" href="comic-sans.woff2" as="font" />
```

as 可以是： style、script、font、image、video
、[others Link types | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload#what_types_of_content_can_be_preloaded)

不要过度使用它。preload 下载优先级最高。不会神奇地加快网站速度——相反，它可能会阻
止浏览器巧妙地安排所有内容。

## prefetch

`<link rel="prefetch">`要求浏览器在后台下载和缓存资源（如脚本或样式表）。下载以
低优先级进行，因此不会干扰更重要的资源。当您知道您将在后续页面上需要该资源并且您
希望提前缓存它时，它会很有帮助。

```html
<link rel="prefetch" href="/style.css" as="style" />
<link rel="prefetch" href="comic-sans.woff2" as="font" />
```

下载资源后，浏览器不会对资源执行任何操作。不执行脚本，不应用样式表。它只是被缓存
了——所以当其他东西需要它时，它可以立即可用。

浏览器通常以`最低优先级`安排 prefetch，因此它们不会干扰其他资源。这意味着
prefetch 很多东西可能是安全的。

不要用于紧急资源。不要`<link rel="prefetch">`在几秒钟内需要资源时使用。在这种情
况下，请`<link rel="preload">`改用。

## preconnect

和 DNS prefetch 类似，preconnect 不光会解析 DNS，还会建立 TCP 握手连接和 TLS 协
议（如果需要）。用法如下：

```html
<link rel="preconnect" href="https://api.my-app.com" />
```

现代浏览器竭尽所能的尝试预测网站可能需要哪些链接。通过提前连接，浏览器可以提前建
立必要的通信，消除了实际请求中 DNS、TCP 和 TLS 的耗时。不过，即使是只能的现代浏
览器，也没办法为每个网站可靠的预测所有连接。

开发者可以告诉浏览器哪些通信需要在实际请求发起前就提前建立连接。

## dns prefetch

DNS prefetching 通过指定具体的 URL 来告知客户端未来会用到相关的资源，这样浏览器
可以尽早的解析 DNS。比如我们需要一个在 example.com 的图片或者视频文件。
在`<head>` 就可以这么写：

```html
<link rel="dns-prefetch" href="//example.com" />
```

当请求这个域名下的文件时就不需要等待 DNS 查询了。项目中有用到第三方的代码时这么
做尤其有益（译者注：其他的使用场景，比如当静态资源和 HTML 不在一个域上，而在 CDN
上；又比如在重定向前可以加上 DNS prefetch）。

## Prerender

prerender 预渲染 是一个重量级的选项，它可以让浏览器提前加载指定页面的所有资源。
要求浏览器加载 URL 并将其呈现在不可见的选项卡中。当用户单击指向该 URL 的链接时，
应立即呈现该页面。当您确实确定用户接下来会访问特定页面并且您希望更快地呈现它时，
它会很有帮助。

```html
<link rel="prerender" href="/thenextpage.html" />
```

prerender 就像是在后台打开了一个隐藏的 tab，会下载所有的资源、创建 DOM、渲染页面
、执行 JS 等等。如果用户进入指定的链接，隐藏的这个页面就会进入马上进入用户的视线
。Google Search 多年前就利用了这个特性实现了 Instant Pages 功能。微软最近也宣布
会让 Bing 在 IE11 上用类似 prerender 的技术。

当您确实确定用户接下来会转到某个页面时。如果您有一个转化渠道，其中 70% 的访问者
从页面 A 转到页面 B，则`<link rel="prerender" />`在页面 A 中可能有助于超快速地呈
现页面 B。

不要过度使用它。预渲染页面的成本非常高——无论是在流量还是内存方面。不要使
用`<link rel="prerender" />`超过一页。

---

1. [Preload, prefetch and other <link> tags: what they do and when to use them · PerfPerfPerf](https://3perf.com/blog/link-rels/)
2. [Link types - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)
3. [Prefetching, preloading, prebrowsing | CSS-Tricks - CSS-Tricks](https://css-tricks.com/prefetching-preloading-prebrowsing/)
4. [一箩筐的预加载技术 | AlloyTeam](http://www.alloyteam.com/2015/10/prefetching-preloading-prebrowsing/)
