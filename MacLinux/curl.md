Curl 是一个命令行工具，用于通过 HTTP（s），FTP 和许多您可能没有听说过的其他协议发出请求。 它可以下载文件，检查响应头，并自由访问远程数据。

在 Web 开发中，curl 通常用于测试连接和使用 RESTful API。

#### Fetch the headers of a URL.

```javascript
~ » curl -I http://www.baidu.com

HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform
Connection: Keep-Alive
Content-Length: 277
Content-Type: text/html
Date: Sun, 21 Jul 2019 05:35:11 GMT
Etag: "575e1f72-115"
Last-Modified: Mon, 13 Jun 2016 02:50:26 GMT
Pragma: no-cache
Server: bfe/1.0.8.18
```
