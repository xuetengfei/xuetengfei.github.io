# curl : client url

Curl 是一个命令行工具，用于通过 HTTP（s），FTP 和许多可能没有听说过的其他协议发
出请求。它可以下载文件，检查响应头，并自由访问远程数据。在 Web 开发中，curl 通常
用于测试连接和使用 RESTful API。curl 命令可能比这复杂得多,它的功能非常强大，命令
行参数多达几十种。如果熟练的话，完全可以取代 Postman 这一类的图形界面工具 有很多
选项可用于控制标头，cookie，身份验证等。

### Fetch the headers of a URL.

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

### Make a GET request to a remote API

```javascript
~ » curl http://numbersapi.com/random/trivia

160 is the lowest radio frequency band allocation
in meters available to amateur radio operators in most countries.
```

---

1. [curl](https://curl.haxx.se/)
1. [curl-markdown](https://ec.haxx.se/)
1. [Curl Cookbook](https://catonmat.net/cookbooks/curl)
1. [curl-reference-阮一峰](http://www.ruanyifeng.com/blog/2019/09/curl-reference.html)
1. [jakubroztocil/httpie: As easy as httpie /aitch-tee-tee-pie/ 🥧 Modern command line HTTP client – user-friendly curl alternative with intuitive UI, JSON support, syntax highlighting, wget-like downloads, extensions, etc. https://twitter.com/clihttp](https://github.com/jakubroztocil/httpie)
