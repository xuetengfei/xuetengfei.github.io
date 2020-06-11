# Http 报头 Accept 与 Content-Type 的区别

首先让我们看一下通过 HTTP 协议传输的媒体类型及如何表示媒体类型：

一、Media Type：

互联网媒体类型，一般就是我们所说的 MIME 类型，用来确定请求的内容类型或响应的内容类型

```
application/json ： JSON 数据格式
application/xml ： XML 数据格式
application/octet-stream ： 二进制流数据（如常见的文件下载）。
application/xhtml+xml ：XHTML 格式
```

```
3.7 Media Types

   HTTP uses Internet Media Types [17] in the Content-Type (section
   14.17) and Accept (section 14.1) header fields in order to provide
   open and extensible data typing and type negotiation.

       media-type     = type "/" subtype *( ";" parameter )
       type           = token
       subtype        = token

   Parameters MAY follow the type/subtype in the form of attribute/value
   pairs (as defined in section 3.6).

   The type, subtype, and parameter attribute names are case-
   insensitive. Parameter values might or might not be case-sensitive,
   depending on the semantics of the parameter name. Linear white space
   (LWS) MUST NOT be used between the type and subtype, nor between an
   attribute and its value. The presence or absence of a parameter might
   be significant to the processing of a media-type, depending on its
   definition within the media type registry.
```

1. [RFC 2616 - Hypertext Transfer Protocol -- HTTP/1.1](https://tools.ietf.org/html/rfc2616#section-3.7)
2. [RFC 1590 - Media Type Registration Procedure](https://tools.ietf.org/html/rfc1590)
3. [HTTP Content-type 对照表](http://tool.oschina.net/commons)
4. [Accept - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept)

---

> Accept 属于请求头， Content-Type 属于实体头。

Accept 请求头用来告知（服务器）客户端可以处理的内容类型，这种内容类型用 MIME 类型来表示。借助内容协商机制, 服务器可以从诸多备选项中选择一项进行应用，并使用 Content-Type 应答头通知客户端它的选择。浏览器会基于请求的上下文来为这个请求头设置合适的值，比如获取一个 CSS 层叠样式表时值与获取图片、视频或脚本文件时的值是不同的。

```
Accept: <MIME_type>/<MIME_subtype>
Accept: <MIME_type>/*
Accept: */*

// Multiple types, weighted with the quality value syntax:
Accept: text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8
```

在响应中，Content-Type 标头告诉客户端实际返回的内容的内容类型。浏览器会在某些情况下进行 MIME 查找，并不一定遵循此标题的值; 为了防止这种行为，可以将标题 X-Content-Type-Options 设置为 nosniff。

```
Content-Type: text/html; charset=utf-8
Content-Type: multipart/form-data; boundary=something
```

Http 报头分为通用报头，请求报头，响应报头和实体报头。  
请求方的 http 报头结构：通用报头|请求报头|实体报头  
响应方的 http 报头结构：通用报头|响应报头|实体报头

> Accept 代表发送端（客户端）希望接受的数据类型。

比如：Accept：text/xml;  
代表客户端希望接受的数据类型是 xml 类型

> Content-Type 代表发送端（客户端|服务器）发送的实体数据的数据类型。

比如：Content-Type：text/html;  
代表发送端发送的数据格式是 html。

二者合起来，
Accept:text/xml;  
Content-Type:text/html  
即代表希望接受的数据类型是 xml 格式，本次请求发送的数据的数据格式是 html。

---

```java
@RequestMapping(value = "/hello", method = RequestMethod.GET)
public User index() {
    List<String> testList = new ArrayList<String>();
    testList.add("aa");
    testList.add("bb");
    User user=new User();
    user.setName("Grace");
    user.setTestList(testList);
    return user;
}
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/o_api_default_-1572492359.png'/>
