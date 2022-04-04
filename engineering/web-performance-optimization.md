?> 网络层面的优化

1. 尽量减少 HTTP 请求个数
2. 使用 CDN（内容分发网络） CDN 部署与缓存
3. 使 AJAX 缓存 http
4. 使用 GET 来完成 AJAX 请求
5. DNS Prefetch DNS 缓存

```html
<link rel=“dns-prefetch” href=“//img.alicdn.com”>
```

?> 数据层面的优化

1. 减小资源体积
2. Optimize Images 优化图片 、图片预加载
   、[图片懒加载](engineering/Picture-Lazy-Loading.md)
3. Http 缓存机制作为 web 性能优化的重要手段，
4. Gzip Components Gzip 压缩
5. 善用 LocalStorage
6. Add an Expires or a Cache-Control Header 设置“ 头文件过期”或者“ 静态缓存”
7. 优化 CSS Spirite
8. Minify Javascript CSS 减小 JS 和 CSS 的体积
9. 写 JS 和 CSS 都是有技巧的，用最少的代码实现同样的功能，减少空白，增强逻辑性，
   用缩写方式等等，当然也有不少工具也能够帮你实现这一点。
10. Code Splitting 、Tree Shaking、Dynamic import
11. 为文件头指定 Expires 或 Cache-Control ，使内容具有缓存性。
12. Post-load Components 延迟加载组件
13. Preload components 预加载组件
14. Split Components Across Domains 跨域分离组件

?> DOM 操作与渲染层面的优化

1. 防抖（Debouncing）和节流（Throttling）高性能滚动 scroll 及页面渲染优化
2. 重排和重绘
3. 把 CSS 放到顶部,把 JS 放到底部,避免使用 CSS 表达式,将 CSS 和 JS 放到外部文件
   中,精简 CSS 和 JS
4. 减少 DOM 元素个数
5. Put Stylesheets at the Top 把 CSS 放顶部
6. Put Scripts at the Bottom 把 JS 放底部
7. Reduce the Number of DOM Elements 减少 DOM 元素数量
8. 减少 DOM 访问
9. 避免空的 src 和 href

---

3.  性能测量 `window.performace`能展示绝大多数检测 Web 性能的指标，在业务代码中
    埋点收集 window.performance 的值，可以为网页性能短板做很好的测量与统计。
4.  在一些场景下，每次用户进入时数据的变化不会太大，比如不怎么更新的个人博客页面
    。这个时候就可以使用 LocalStorage 去做 HTML 的缓存，页面进入的时候直接从
    Storage 中获取缓存，然后 append 到页面上，等接口数据回来之后，再 Diff 做更新
    。在新版本浏览器中，可以用 indexedDB 等代替 LocalStorage。

5.  尽早刷新输出缓冲尽量减少 iframe 的个数开发智能事件处理程序

---

- 首屏加载时进度条的显示 _异步请求的优化_：
- 使用正常的 json 数据格式进行交互
- 部分常用数据的缓存
- 数据埋点和统计

2. JSON 交互」，JSON 的数据格式轻巧，结构简单，往往可以大大优化前后端的数据通信
   。「常用数据的缓存」，可以将一些用户的基本信息等常用的信息做一个缓存，这样可
   以保证 ajax 请求的减少。同时，HTML5 新增的 storage 的内容，也不用怕 cookie 暴
   露，引起的信息泄漏问题。「数据埋点和统计」，对于资深的程序员来说，比较了解。
   而且目前的大部分公司也会做这方面的处理。有心的小伙伴可以自行查阅。

最后，还有就是大量数据的运算。对于 javascript 语言来说，本身的单线程就限制了它并
不能计算大量的数据，往往会造成页面的卡顿。而可能业务中有些复杂的 UI 需要去运行大
量的运算，所以，*webWorker 的使用*是至关重要的。或许，前端标准普及的落后，会导致
大家对于这些新生事物的短暂缺失吧。

---

1. [小胡子哥 github Issues · 性能专栏](https://github.com/barretlee/performance-column/issues)
2. [DNS Prefetching - The Chromium Projects](https://www.chromium.org/developers/design-documents/dns-prefetching)
3. [JavaScript 的时间消耗 · Issue #59 ](https://github.com/dwqs/blog/issues/59)
