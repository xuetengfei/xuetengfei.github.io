# 前端开发的历史和趋势

前后端不分的时代

互联网发展的早期的 JavaWeb 项目前后端开发是一体的，前端代码是后端代码的一部分。

开发原理:那时的网站开发，采用的是后端 MVC 模式。前端只是后端 MVC 的 V。后端收到浏览器的请求,生成**静态页面**,发送到浏览器。

工作职责:那时的前端工程师，实际上是模板工程师，负责编写页面模板。后端代码读取模板，替换变量，渲染出页面。

项目的部署和发布: 前端页面的模版的代码打包陈 war(Web application Archive) 包，把 war 包放在 tomcat 目录的 webapp 下，tomcat 这种 Servlet 容器会认出 war 包并自动部署,tomcat 服务器在启动的时候可以直接使用这个 war 包。

```html
<!-- 一个典型的 PHP 模板 -->
<html>
  <head>
    <title>Car {{ $car->id }}</title>
  </head>
  <body>
    <h1>Car {{ $car->id }}</h1>
    <ul>
      <li>Make: {{ $car->make }}</li>
      <li>Model: {{ $car->model }}</li>
      <li>Produced on: {{ $car->produced_on }}</li>
    </ul>
  </body>
</html>
```

# Ajax

Ajax 技术促成了 Web 2.0 的诞生。前端不再是后端的模板，而是单独的一层，可以独立得到各种数据。

```
Web 1.0：静态网页，纯内容展示
Web 2.0：动态网页，富交互，前端数据处理
```

# 前端 MVC、MVVM 框架

前端通过 Ajax 得到数据，因此也有了处理数据的需求。
前端代码变得也需要保存数据、处理数据、生成视图，这导致了前端 MVC 框架的诞生。

# 前端分离

前后端分离以后，它们之间通过接口通信。后端暴露出接口，前端消费后端提供的数据。前后端的通信协议一般是 HTTP,后端接口一般是 REST 形式。`核心思想是前端 Html 页面通过 Ajax 调用后端的 API，并与 Json 数据交互。`

# 业界标准

前后端分离已成为互联网项目开发的业界标准使用方式，通过 nginx+tomcat 的方式（也可以中间加一个 nodejs）有效的进行解耦，并且前后端分离会为以后的大型分布式架构、弹性计算架构、微服务架构、多端化服务（多种客户端，例如：浏览器，车载终端，安卓，IOS 等等）打下坚实的基础。

# HTTP 服务器

HTTP 服务器本质上也是一种应用程序——它通常运行在服务器之上，绑定服务器的 IP 地址并监听某一个 tcp 端口来接收并处理 HTTP 请求，这样客户端（IE, Firefox，Chrome 等浏览器）就能够通过 HTTP 协议来获取服务器上的网页（HTML 格式）、文档（PDF 格式）、音频（MP4 格式）、视频（MOV 格式）等等资源。

Apache HTTP Server 是 Apache 软件基金会下的一个项目 。Nginx 同样也是一款开源的 HTTP 服务器软件（当然它也可以作为邮件代理服务器、通用的 TCP 代理服务器）。不仅仅是 Apache HTTP Server 和 Nginx，绝大多数编程语言所包含的类库中也都实现了简单的 HTTP 服务器方便开发者使用：`HttpServer (Java HTTP Server )、Python SimpleHTTPServer` 使用这些类库能够非常容易的运行一个 HTTP 服务器。

一个 HTTP Server 关心的是 HTTP 协议层面的传输和访问控制，所以在 Apache/Nginx 上可以看到代理、负载均衡等功能。客户端通过 HTTP Server 访问服务器上存储的资源（HTML 文件、图片文件等等）。但是一个 HTTP Server 始终只是把服务器上的文件如实的通过 HTTP 协议传输给客户端。

# Apache Tomcat

`Apache Tomcat` 则是 Apache 基金会下的另外一个项目，与 Apache HTTP Server 相比，Tomcat 能够动态的生成资源并返回到客户端。Apache HTTP Server 和 Nginx 都能够将某一个文本文件的内容通过 HTTP 协议返回到客户端，但是这个文本文件的内容是固定的——也就是说无论何时、任何人访问它得到的内容都是完全相同的，这样的资源我们称之为静态资源。动态资源则与之相反，在不同的时间、不同的客户端访问得到的内容是不同的。

Tomcat 运行在 JVM 之上，它和 HTTP 服务器一样，绑定 IP 地址并监听 TCP 端口，同时还包含以下指责：`管理 Servlet 程序的生命周期将 URL 映射到指定的 Servlet 进行处理与 Servlet 程序合作处理 HTTP 请求——根据 HTTP 请求生成 HttpServletResponse 对象并传递给 Servlet 进行处理，将 Servlet 中的 HttpServletResponse 对象生成的内容返回给浏览器`。

虽然 Tomcat 也可以认为是 HTTP 服务器，但通常它仍然会和 Nginx 配合在一起使用：

1. 动静态资源分离——运用 Nginx 的反向代理功能分发请求：所有动态资源的请求交给 Tomcat，而静态资源的请求（例如图片、视频、CSS、JavaScript 文件等）则直接由 Nginx 返回到浏览器，这样能大大减轻 Tomcat 的压力。、
2. 负载均衡，当业务压力增大时，可能一个 Tomcat 的实例不足以处理，那么这时可以启动多个 Tomcat 实例进行水平扩展，而 Nginx 的负载均衡功能可以把请求通过算法分发到各个不同的实例进行处理

严格的来说，Apache/Nginx 应该叫做「HTTP Server」；而 Tomcat 则是一个「Application Server」，或者更准确的来说，是一个「Servlet/JSP」应用的容器。

Application Server，则是一个应用执行的容器。它首先需要支持开发语言的 Runtime（对于 Tomcat 来说，就是 Java），保证应用能够在应用服务器上正常运行。为了方便，应用服务器往往也会集成 HTTP Server 的功能，但是不如专业的 HTTP Server 那么强大，所以应用服务器往往是运行在 HTTP Server 的背后，执行应用，将动态的内容转化为静态的内容之后，通过 HTTP Server 分发到客户端。

# Nginx 搭配 Tomcat

```
Nginx:静态分发，负载均衡；

Tomcat:动态分发

搭配一下：动静分离、负载均衡。
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200524-sYHXtU-nginx-proxy-pass.png' alt='20200524-sYHXtU-nginx-proxy-pass'/>

nginx 配置文件大致长这个样子

```
server {
  listen 80;
  server_name xxx.com;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # 反向代理:简单来说就是代理服务器
  location /api {
    proxy_pass http://api.xxx.yyy.zzz;
  }

  # 为带 hash 值的文件配置永久缓存
  location ~* \.(?:css|js)$ {
      try_files $uri =404;
      expires 1y;
      add_header Cache-Control "public";
  }

  location ~ ^.+\..+$ {
      try_files $uri =404;
  }
}
```

# 前后端分离后

对于后端 Java 工程师

追求的是，三高（高并发，高可用，高性能），安全，存储，业务等等。
后端 Java 工程师,把精力放在 Java 基础，设计模式，jvm 原理，spring+springmvc 原理及源码，linux，mysql 事务隔离与锁机制，mongodb，http/tcp，多线程，分布式架构，弹性计算架构，微服务架构，Java 性能优化，以及相关的项目管理等等。

对于前端工程师

追求的是，页面表现，速度流畅，兼容性，用户体验等等。前端工程师把精力放在 html5，css3，webpack，less/sass，gulp，nodejs，Google V8 引擎，javascript 多线程，模块化，面向切面编程，设计模式，浏览器兼容性，性能优化等等。前端追求的是：页面表现，速度流畅，兼容性，用户体验等等。术业有专攻。

# 前后端职责清晰了

`后端`

```
提供数据
处理业务逻辑
Server-side MVC架构
代码跑在服务器上
```

`前端`

```
接收数据，返回数据
处理渲染逻辑
Client-side MV* 架构
代码跑在浏览器上
```

# 现存的问题

前端 UI 库 react，vue 的发展。渲染，取值都在浏览器进行，存在性能问题。主要表现是：

```
1. 渲染，取值都在客户端进行，有性能的问题
2. 需要等待资源到齐才能进行，会有短暂白屏与闪动
3. 在移动设备低速网路的体验奇差无比
4. 渲染都在客户端，模版无法重用，SEO实现麻烦
```

<!-- 那么，模板到底应该在什么地方跟数据结合？

这个问题就比较折腾了，有部分人尝试像 B 类项目那样，使用 js 模板，然后在浏览器端执行，这是存在一些问题的，比如说 seo 不友好，首屏性能不够，尤其对于首页 DOM 量很大的电商类网站，差距很明显。 -->

# Node 层

淘宝的前端团队提出的中途岛(Midway Framework)的设计，增加 node.js 作为中间层，架构如下图所示：

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200524-CT6OKW-iShot2020-05-2422.35.31.jpg' alt='20200524-CT6OKW-iShot2020-05-2422.35.31'/>

# SSR

---

1. [jstraining/history.md at master · ruanyf/jstraining](https://github.com/ruanyf/jstraining/blob/master/docs/history.md)
2. [前后端分离架构概述_Hopefully Sky的博客-CSDN博客_前后端分离](https://blog.csdn.net/fuzhongmin05/article/details/81591072)
2. [proxy_pass url 反向代理的坑 | Nginx 入门教程](https://xuexb.github.io/learn-nginx/example/proxy_pass.html#url-%E5%8F%AA%E6%98%AF-host)
3. [淘宝前后端分离实践](https://2014.jsconfchina.com/slides/herman-taobaoweb/index.html#/48)
4. [Serverless 来袭](https://mp.weixin.qq.com/s?__biz=MzIzOTU0NTQ0MA==&mid=2247489844&idx=1&sn=2a0cc520053cba4d62114aa1e9a46976&chksm=e929243bde5ead2db3962ad3f07135e364d84aba908158079c75e26c96c12fc5758759372441)


