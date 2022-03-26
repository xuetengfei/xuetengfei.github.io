## why

要掌握跨域，首先要知道为什么会有跨域这个问题出现.

这个问题的始作俑者是浏览器的同源策略。同源策略是一个重要的安全策略，它用于限制一
个 origin 的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意
文档，减少可能被攻击的媒介。

[浏览器的同源策略 - Web 安全 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

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

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>jsonp callback</title>
  </head>
  <body>
    <script>
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
    </script>
  </body>
</html>
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

但是通过 CORS 这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为简单请
求和复杂请求。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/CORS-1558523420.png'/>

<!--
## 3.document.domain

该方式只能用于二级域名相同的情况下，比如** a.test.com **和** b.test.com** 适用于
该方式。只需要给页面添加 **document.domain = 'test.com'** 表示二级域名都相同就可
以实现跨域

## 4.postMessage

这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断
来源并接收消息

```js
// 发送消息端
window.parent.postMessage('message', 'http://test.com');
// 接收消息端
var mc = new MessageChannel();
mc.addEventListener('message', event => {
  var origin = event.origin || event.originalEvent.origin;
  if (origin === 'http://test.com') {
    console.log('验证通过');
  }
});
```

## 总结

1. CORS 支持所有类型的 HTTP 请求，是跨域 HTTP 请求的根本解决方案
2. JSONP 只支持 GET 请求，JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS
   的网站请求数据。

不管是 Node 中间件代理还是 nginx 反向代理，主要是通过同源策略对服务器不加限制。
日常工作中，用得比较多的跨域方案是 cors 和 nginx 反向代理

-->

---

1. [跨源资源共享（CORS） - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)
2. [Fetch：跨源请求](https://zh.javascript.info/fetch-crossorigin#wei-shi-mo-xu-yao-cors-kua-yuan-qing-qiu-jian-shi)
3. [不要再问我跨域的问题了 - SegmentFault](https://segmentfault.com/a/1190000015597029)
