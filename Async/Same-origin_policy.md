?> 如果两个页面的`协议、端口（如果有指定）、主机`都相同，则两个页面具有相同的源。我们也可以把它称为"协议/主机/端口 tuple"。即便两个不同的域名指向同一个 ip 地址，也非同源。

?> 同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。

同源策略是一种约定，它是浏览器最核心也最基本的`安全功能`，如果缺少了同源策略，浏览器很容易受到 XSS、CSFR( [跨站请求伪造](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)) 等攻击。

```javascript
// 同源策略限制内容有：

1. Cookie、LocalStorage、IndexedDB 等存储性内容
2. DOM 节点无法获得
3. AJAX 请求发送后，被浏览器拦截
```

```javascript
// 但是有三个标签是允许跨域加载资源

1. <img>嵌入图片。<video> 和 <audio>嵌入多媒体资源。<frame> 和 <iframe> 载入的任何资源。
2. <link rel="stylesheet" href="..."> 标签嵌入CSS
3. <script src="..."></script> 标签嵌入跨域脚本
```

## 注意

第一、如果是协议和端口造成的跨域问题`前端`是无能为力的。  
第二、在跨域问题上，仅仅是通过`URL 的首部`来识别而不会根据域名对应的 IP 地址是否相同来判断。

<!-- `URL 的首部`可以理解为`协议, 域名和端口必须匹配`。 -->

## 请求跨域了，那么请求到底发出去没有？

跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。归根结底，跨域是为了阻止用户读取到另一个域名下的内容，Ajax 可以获取响应，浏览器认为这不安全，所以拦截了响应。

你可能会疑问明明通过表单的方式可以发起跨域请求，为什么 Ajax 就不会?
但是表单并不会获取新的内容，所以可以发起跨域请求。同时也说明了跨域并不能完全阻止 CSRF，因为请求毕竟是发出去了。

---

1. [浏览器的同源策略 - Web 安全 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)
