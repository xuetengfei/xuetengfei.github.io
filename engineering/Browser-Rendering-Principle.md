# 浏览器渲染原理 (TL;DR)

?> 浏览器的内核是指支持浏览器运行的最核心的程序，分为两个部分的，一是渲染引擎，
另一个是 JS 引擎。

不同的浏览器中渲染引擎也不都是相同的,常见的浏览器内核可以分为这四种
：Trident（IE）、Gecko（火狐）、Blink（Chrome、Opera）、Webkit（Safari）。这里面
大家最耳熟能详的可能就是 Webkit 内核了，Webkit 内核是当下浏览器世界真正的霸主。

## 页面的加载过程

```bash
1. 浏览器根据 DNS 服务器得到域名的 IP 地址；
2. 向这个 IP 的机器发送 HTTP 请求；
3. 服务器收到、处理并返回 HTTP 请求；
4. 浏览器得到返回内容，解析渲染。
```

## 浏览器渲染过程

```bash
1. 处理 HTML 标记并构建 DOM 树
2. 处理 CSS 标记并构建 CSSOM 树。
3. 将 DOM 与 CSSOM 合并成一个渲染树。
4. 根据渲染树来布局，以计算每个节点的几何信息。
5. 最后通过调用操作系统 GUI 的 API,将各个节点绘制到屏幕上。
```

## 渲染过程:构建对象模型之

### 构建文档对象模型 (DOM)

转换:浏览器从磁盘或网络读取 HTML 的原始字节，并根据文件的指定编码（例如 UTF-8）
将它们转换成各个字符。令牌化:浏览器将字符串转换成 W3C HTML5 标准规定的各种令牌，
例如，“`<html>`”、“`<body>`”，以及其他尖括号内的字符串。每个令牌都具有特殊含义和
一组规则。词法分析: 发出的令牌转换成定义其属性和规则的“对象”。最后，DOM 构建

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/render-dom-1555563655.jpg' width='700px'/>

### 构建 CSS 对象模型 (CSSOM)

在浏览器构建我们这个简单页面的 DOM 时，在文档的 head 部分遇到了一个 link 标记，
该标记引用一个外部 CSS 样式表：style.css。由于预见到需要利用该资源来渲染页面，它
会立即发出对该资源的请求，并返回以下内容：

```css
body {
  font-size: 16px;
}
p {
  font-weight: bold;
}
span {
  color: red;
}
p span {
  display: none;
}
img {
  float: right;
}
```

CSSOM 为何具有树结构？为页面上的任何对象计算最后一组样式时，浏览器都会先从适用于
该节点的最通用规则开始（例如，如果该节点是 body 元素的子项，则应用所有 body 样式
），然后通过应用更具体的规则（即规则“向下级联”）以递归方式优化计算的样式

默认情况下，CSS 被视为阻塞渲染的资源，这意味着浏览器将不会渲染任何已处理的内容，
直至 CSSOM 构建完毕。请务必精简您的 CSS，尽快提供它，并利用媒体类型和查询来解除
对渲染的阻塞。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/render-css-1555563655.jpg' width='700px'/>

## 渲染过程:渲染树构建、布局及绘制

1. DOM 树与 CSSOM 树合并后形成渲染树。
2. 渲染树只包含渲染网页所需的节点。
3. 布局计算每个对象的精确位置和大小。
4. 最后一步是绘制，使用最终渲染树将像素渲染到屏幕上。

在这一过程中，不是简单的将两者合并就行了。渲染树只会包括需要显示的节点和这些节点
的样式信息，如果某个节点是 display: none 的，那么就不会在渲染树中显示。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/render-tree-1555563655.jpg' width='700px'/>

## 阻塞渲染的 CSS

?> CSS 是阻塞渲染的资源。需要将它尽早、尽快地下载到客户端，以便缩短首次渲染的时
间。

HTML 和 CSS 都是阻塞渲染的资源,浏览器会下载所有 CSS 资源，无论阻塞还是不阻塞。最
后，请注意“阻塞渲染”仅是指浏览器是否需要暂停网页的首次渲染，直至该资源准备就绪。
无论哪一种情况，浏览器仍会下载 CSS 资源，只不过不阻塞渲染的资源优先级较低罢了。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/render-blocked-1555563220.jpg' width='700px'/>

## 浏览器如果渲染过程中遇到 JS 文件怎么处理？

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link href="style.css" rel="stylesheet" />
    <title>Critical Path: Script</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg" /></div>
    <script>
      var span = document.getElementsByTagName('span')[0];
      span.textContent = 'interactive';
      span.style.display = 'inline';
    </script>
  </body>
</html>
```

注意上例中的内联脚本靠近网页底部。为什么呢？亲自尝试一下。如果我们将脚本移至
`span`元素之上，您就会注意到脚本运行失败，并提示在文档中找不到对任何 `span` 元素
的引用 - 即 `getElementsByTagName(‘span')` 会返回 `null`。

这透露出一个重要事实：`我们的脚本在文档的何处插入，就在何处执行。`当 HTML 解析器
遇到一个 script 标记时，它会暂停构建 DOM，将控制权移交给 JavaScript 引擎；等
JavaScript 引擎运行完毕，浏览器会从中断的地方恢复 DOM 构建,除非将 JavaScript 显
式声明为异。

如果浏览器尚未完成 CSSOM 的下载和构建，而我们却想在此时运行脚本，会怎样？答案很
简单，对性能不利：浏览器将延迟脚本执行和 DOM 构建，直至其完成 CSSOM 的下载和构建
。

“优化关键渲染路径”在很大程度上是指了解和优化 HTML、CSS 和 JavaScript 之间的依赖
关系谱。

也就是说，如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件，这也是都建议将
script 标签放在 body 标签底部的原因。当然在当下，并不是说 script 标签必须放在底
部，因为你可以给 script 标签添加 defer 或者 async 属性。 为了实现最佳性能，可以
让您的 JavaScript 异步执行，并去除关键渲染路径中任何不必要的 JavaScript。

---

## 几点补充说明

### async 和 defer 的作用是什么？有什么区别?

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/async-defer-1555565496.png' width='700px'/>

### 回流和重绘

当浏览器生成渲染树以后，就会根据渲染树来进行布局（也可以叫做回流）。这一阶段浏览
器要做的事情是要弄清楚各个节点在页面中的确切位置和大小。通常这一行为也被称为“自
动重排”。

布局流程的输出是一个“盒模型”，它会精确地捕获每个元素在视口内的确切位置和尺寸，所
有相对测量值都将转换为屏幕上的绝对像素。

布局完成后，浏览器会立即发出“Paint Setup”和“Paint”事件，将渲染树转换成屏幕上的像
素

这里重要要说两个概念，一个是 Reflow，另一个是 Repaint

重绘 Repaint ：当我们对 DOM 的修改导致了样式的变化、却并未影响其几何属性（比如修
改了颜色或背景色）时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式
。

回流 Reflow：当我们对 DOM 的修改引发了 DOM 几何尺寸的变化（比如修改元素的宽、高
或隐藏元素等）时，浏览器需要重新计算元素的几何属性（其他元素的几何属性和位置也会
因此受到影响），然后再将计算的结果绘制出来，这个过程就是回流（也叫重排）。

我们知道，当网页生成的时候，至少会渲染一次。在用户访问的过程中，还会不断重新渲染
。重新渲染会重复回流 + 重绘或者只有重绘。

回流必定会发生重绘，重绘不一定会引发回流。重绘和回流会在我们设置节点样式时频繁出
现，同时也会很大程度上影响性能。回流所需的成本比重绘高的多，改变父节点里的子节点
很可能会导致父节点的一系列回流。

---

1. [关键渲染路径  |  Web  |  Google Developers](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/?hl=zh-cn)
2. [你不知道的浏览器渲染原理](https://www.infoq.cn/article/DltDuLToZIk_ZRqfb4jG)
3. [图解浏览器的工作原理](https://www.infoq.cn/article/CS9-WZQlNR5h05HHDo1b)
4. [Asynchronous vs Deferred JavaScript](https://bitsofco.de/async-vs-defer/)
5. [Understanding the Critical Rendering Path](https://bitsofco.de/understanding-the-critical-rendering-path/)
