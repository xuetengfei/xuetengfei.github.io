# HTTP 简介

HTTP 协议是 Hyper Text Transfer Protocol（超文本传输协议）的缩写,是用于从万维网
（WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议。HTTP 是一个基
于`TCP/IP 通信协议`来传递数据（HTML 文件, 图片文件, 查询结果等）。

## HTTP 工作原理

HTTP 协议工作于客户端-服务端架构上。浏览器作为 HTTP 客户端通过 URL 向 WEB 服务器
发送所有请求。Web 服务器有：Apache，IIS,Nginx,Node,python 等。Web 服务器根据接收
到的请求后，向客户端发送响应信息。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/http1548605710.jpg' />

HTTP 协议定义了客户端和服务器之间交互的消息内容和步骤，其基本思路非常简单。客户
端会向服务器发送请求消息。 请求消息中包含的内容是“对什么”`URI`和“进行怎样的操作
”`方法`两个部分。

## HTTP 三点注意事项

1. HTTP 是无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请
   求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。
2. HTTP 是媒体独立的：这意味着，只要客户端和服务器知道如何处理的数据内容，任何类
   型的数据都可以通过 HTTP 发送。客户端以及服务器指定使用适合的 MIME-type 内容类
   型。
3. HTTP 是无状态：HTTP 协议是无状态协议。无状态是指协议对于事务处理没有记忆能力
   。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连
   接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。

## 浏览器解析 URL

<!-- <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/url-knowleage-1.jpg'  width='600px'/> -->
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/requset1548605710.jpg' width='600px'/>

### TCP/IP 通信传输流

网络通信就是交换数据包。电脑 A 向电脑 B 发送一个数据包，后者收到了，回复一个数据
包，从而实现两台电脑之间的通信。数据包的结构，基本上是下面这样：

![20220222-TJFWlf-330_2253944316_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220222-TJFWlf-330_2253944316_.jpg)

发送端在层与层之间传输数据时，每经过一层时必定会被打上一个该层所属的首部信息。反
之，接收端在层与层传输数据时，每经过一层 时会把对应的首部消去。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/chuanshu1548603073.jpg' width='600px'/>

## HTTP 请求方法

根据 HTTP 标准，HTTP 请求可以使用多种请求方法。  
HTTP1.0 定义了三种请求方法： GET, POST 和 HEAD 方法。这三种属于简单请求。  
HTTP1.1 新增了五种请求方法：OPTIONS, PUT, DELETE, TRACE 和 CONNECT 方法。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/http-methods1548607998.jpg'/>

| 方法    | 描述                                                                               |
| ------- | ---------------------------------------------------------------------------------- |
| GET     | 请求指定的页面信息，并返回实体主体                                                 |
| HEAD    | 类似于 get 请求，只不过返回的响应中没有具体的内容，用于获取报头                    |
| POST    | 向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。 |
| PUT     | 从客户端向服务器传送的数据取代指定的文档的内容                                     |
| DELETE  | 请求服务器删除指定的页面                                                           |
| OPTIONS | 允许客户端查看服务器的性能                                                         |
| TRACE   | 回显服务器收到的请求，主要用于测试或诊断                                           |

### GET 、POS 二者的差别

get 只产生一个 tcp 数据包,post 产生两个 tcp 数据包。 get 参数通过 url 传递，post
放在 request body 中。 get 请求在 url 中传递的参数是有长度限制的，而 post 没有。
get 比 post 更不安全，因为参数直接暴露在 url 中，所以不能用来传递敏感信息。 get
请求只能进行 url 编码，而 post 支持多种编码方式 get 请求会浏览器主动 cache，而
post 支持多种编码方式。 get 请求参数会被完整保留在浏览历史记录里，而 post 中的参
数不会被保留。

- 对于 GET 方式的请求，浏览器会把 http header 和 data 一并发送出去，服务器响应
  200（返回数据）；
- 而对于 POST，浏览器先发送 header，服务器响应 100 continue，浏览器再发送 data，
  服务器响应 200 ok（返回数据）。

<!--

[GET和POST两种基本请求方法的区别 - 在途中# - 博客园](https://www.cnblogs.com/logsharing/p/8448446.html)
 -->

## HTTP Status Codes

```javascript
export const HTTP_STATUS = {
  SUCCESS: 200,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};
```

```javascript
1×× Informational

100 Continue
101 Switching Protocols
102 Processing

2×× Success

200 OK
201 Created
202 Accepted
203 Non-authoritative Information
204 No Content
205 Reset Content
206 Partial Content
207 Multi-Status
208 Already Reported
226 IM Used

3×× Redirection

300 Multiple Choices
301 Moved Permanently
302 Found
303 See Other
304 Not Modified
305 Use Proxy
307 Temporary Redirect
308 Permanent Redirect

4×× Client Error

400 Bad Request
401 Unauthorized
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
409 Conflict
410 Gone
411 Length Required
412 Precondition Failed
413 Payload Too Large
414 Request-URI Too Long
415 Unsupported Media Type
416 Requested Range Not Satisfiable
417 Expectation Failed
418 I'm a teapot
421 Misdirected Request
422 Unprocessable Entity
423 Locked
424 Failed Dependency
426 Upgrade Required
428 Precondition Required
429 Too Many Requests
431 Request Header Fields Too Large
444 Connection Closed Without Response
451 Unavailable For Legal Reasons
499 Client Closed Request

5×× Server Error

500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
505 HTTP Version Not Supported
506 Variant Also Negotiates
507 Insufficient Storage
508 Loop Detected
510 Not Extended
511 Network Authentication Required
599 Network Connect Timeout Error
```

[HTTP Status Codes — httpstatuses.com](https://httpstatuses.com/)
