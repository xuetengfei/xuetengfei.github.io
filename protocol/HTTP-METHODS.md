<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/http-methods1548607998.jpg'/>

根据 HTTP 标准，HTTP 请求可以使用多种请求方法。  
HTTP1.0 定义了三种请求方法： GET, POST 和 HEAD 方法。这三种属于简单请求。  
HTTP1.1 新增了五种请求方法：OPTIONS, PUT, DELETE, TRACE 和 CONNECT 方法。

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

get 只产生一个 tcp 数据包,post 产生两个 tcp 数据包。
get 参数通过 url 传递，post 放在 request body 中。
get 请求在 url 中传递的参数是有长度限制的，而 post 没有。
get 比 post 更不安全，因为参数直接暴露在 url 中，所以不能用来传递敏感信息。
get 请求只能进行 url 编码，而 post 支持多种编码方式
get 请求会浏览器主动 cache，而 post 支持多种编码方式。
get 请求参数会被完整保留在浏览历史记录里，而 post 中的参数不会被保留。

- 对于 GET 方式的请求，浏览器会把 http header 和 data 一并发送出去，服务器响应 200（返回数据）；
- 而对于 POST，浏览器先发送 header，服务器响应 100 continue，浏览器再发送 data，服务器响应 200 ok（返回数据）。

<!--

[GET和POST两种基本请求方法的区别 - 在途中# - 博客园](https://www.cnblogs.com/logsharing/p/8448446.html)
 -->
