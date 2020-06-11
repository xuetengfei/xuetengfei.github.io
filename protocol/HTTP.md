# HTTP 简介

HTTP 协议是 Hyper Text Transfer Protocol（超文本传输协议）的缩写,是用于从万维网（WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议。HTTP 是一个基于`TCP/IP 通信协议`来传递数据（HTML 文件, 图片文件, 查询结果等）。

## HTTP 工作原理

HTTP 协议工作于客户端-服务端架构上。浏览器作为 HTTP 客户端通过 URL 向 WEB 服务器发送所有请求。Web 服务器有：Apache，IIS,Nginx,Node,python 等。Web 服务器根据接收到的请求后，向客户端发送响应信息。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/http1548605710.jpg' />

HTTP 协议定义了客户端和服务器之间交互的消息内容和步骤，其基本思路非常简单。客户端会向服务器发送请求消息。 请求消息中包含的内容是“对什么”`URI`和“进行怎样的操作”`方法`两个部分。

## HTTP 三点注意事项：

1. HTTP 是无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。
2. HTTP 是媒体独立的：这意味着，只要客户端和服务器知道如何处理的数据内容，任何类型的数据都可以通过 HTTP 发送。客户端以及服务器指定使用适合的 MIME-type 内容类型。
3. HTTP 是无状态：HTTP 协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。

## 浏览器解析 URL

<!-- <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/url-knowleage-1.jpg'  width='600px'/> -->
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/requset1548605710.jpg' width='600px'/>

### TCP/IP 通信传输流

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/chuanshu1548603073.jpg' width='600px'/>

发送端在层与层之间传输数据时，每经过一层时必定会被打上一个该层所属的首部信息。反之，接收端在层与层传输数据时，每经过一层 时会把对应的首部消去。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/front-end-interact-1571460593.jpg'/>
