<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/serve-do-1548649316.jpg'/>

### HTTP 的请求报文

请求报文由三部分组成  
1.请求行：请求方法（GET 或 POST）+URL（路径）+HTTP 协议版本  
2.请求头：它是响请求首部字段,是由关键字/关键值对组成，每行一对，关键字与值用英文冒号":"分隔开； 其中典型的请求头： Content-Type,User-Agent,Accept,Host...  
3.请求体：(请求正文) post,put 等请求携带的数据，参数

### HTTP 的响应报文

响应报文有三部分组成  
1.响应行：协议版本+状态码+状态码的原因短语组成--->HTP/1.1 200 OK  
2.响应头：它是响应首部字段，也是由关键字/关键值对组成  
3.响应体：服务器响应的数据

### HTTP 的部首

#### 通用首部字段（General Header Fields）：请求报文和响应报文两方都会使用的首部

```
Cache-Control  控制缓存 ✨
Connection 连接管理、逐条首部 ✨
Upgrade  升级为其他协议
via 代理服务器的相关信息
Wraning 错误和警告通知
Transfor-Encoding 报文主体的传输编码格式 ✨
Trailer 报文末端的首部一览
Pragma 报文指令
Date 创建报文的日期
```

#### 实体首部字段（Entiy Header Fields）:针对请求报文和响应报文的实体部分使用首部

```
Allow 资源可支持 http 请求的方法 ✨
Content-Language 实体的资源语言
Content-Encoding 实体的编码格式
Content-Length 实体的大小（字节）
Content-Type 实体媒体类型
Content-MD5 实体报文的摘要
Content-Location 代替资源的 yri
Content-Rnages 实体主体的位置返回
Last-Modified 资源最后的修改资源 ✨
Expires 实体主体的过期资源 ✨
```

#### 请求首部字段（Reauest Header Fields）:客户端向服务器发送请求的报文时使用的首部

```
Accept 客户端或者代理能够处理的媒体类型 ✨
Accept-Encoding 优先可处理的编码格式
Accept-Language 优先可处理的自然语言
Accept-Charset 优先可以处理的字符集
If-Match 比较实体标记（ETage） ✨
If-None-Match  比较实体标记（ETage）与 If-Match 相反 ✨
If-Modified-Since  比较资源更新时间（Last-Modified）✨
If-Unmodified-Since 比较资源更新时间（Last-Modified），与 If-Modified-Since 相反 ✨
If-Rnages 资源未更新时发送实体 byte 的范围请求
Range 实体的字节范围请求 ✨
Authorization web 的认证信息 ✨
Proxy-Authorization 代理服务器要求 web 认证信息
Host 请求资源所在服务器 ✨
From 用户的邮箱地址
User-Agent 客户端程序信息 ✨
Max-Forwrads 最大的逐跳次数
TE 传输编码的优先级
Referer 请求原始放的 url
Expect 期待服务器的特定行为
```

响应首部字段（Response Header Fields）:从服务器向客户端响应时使用的字段

```
Accept-Ranges 能接受的字节范围
Age 推算资源创建经过时间
Location 令客户端重定向的 URI ✨
vary  代理服务器的缓存信息
ETag 能够表示资源唯一资源的字符串 ✨
WWW-Authenticate 服务器要求客户端的验证信息
Proxy-Authenticate 代理服务器要求客户端的验证信息
Server 服务器的信息 ✨
Retry-After 和状态码 503 一起使用的首部字段，表示下次请求服务器的时间
```

### HTTP 的 keep-alive

在早期的 HTTP/1.0 中，每次 http 请求都要创建一个连接，而创建连接的过程需要消耗资源和时间，为了减少资源消耗，缩短响应时间，就需要重用连接。在后来的 HTTP/1.0 中以及 HTTP/1.1 中，引入了重用连接的机制，就是在 http 请求头中加入 Connection: keep-alive 来告诉对方这个请求响应完成后不要关闭，下一次咱们还用这个请求继续交流。协议规定 HTTP/1.0 如果想要保持长连接，需要在请求头中加上 Connection: keep-alive。
keep-alive 的优点：

较少的 CPU 和内存的使用（由于同时打开的连接的减少了）
允许请求和应答的 HTTP 管线化
降低拥塞控制 （TCP 连接减少了）
减少了后续请求的延迟（无需再进行握手）
报告错误无需关闭 TCP 连

### 跨域解决常见方案

1）jsonp：靠 script 标签的 src 发出请求，它只支持 get 请求；
2）cors：跨域资源共享，在服务器端指定请求头中的 Access-Control-Allow-Origin 字段即可，在后端配置访问服务器白名单。（遵循最小授权的原则
3）代理服务器：在前端开一个代理服务器，代理服务器与前端处于同一个域下，而代理服务器再去请求其它服务器时也不存在跨域问题
4）iframs：浮动框架，里面有 src 标签，利用 src 来进行请求
5）websocket：协议，可以使服务器主动的推送消息到客户端
6）nginx 反向代理解决跨域--->隐藏跨域 翻墙软件--->正向代理
7）iframs+document.domain：要求两个页面属于一个基础域，使用同一个协议和同一个端口，这样就可以给他们同时添加 document.domain 来跨子域，它只适用于不同子域（父类与子类）的框架间的交互。如果使用 ajax 的方法进行交互或者 JS 调用，可以让 iframs 载入一个与你想要通过 ajax 获取数据的目标页面处于相同的域的页面 html 文件，然后就可利用 ajax 来获取数据，另外再使用 document.domain
8）window.name+iframs：配置代理文件，是没有任何内容的 html 文件，需要它和前端渲染的页面处于同一域下 iframs 的 src 属性由外域转向本地域，跨域的数据内容由 iframs 的 window.name 从外域传递到本地域，从而解决了跨域
