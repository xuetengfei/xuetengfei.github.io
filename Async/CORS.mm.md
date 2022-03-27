# 跨源请求

## 同源策略

```md
域、协议、端口三者相同为同源
```

```md
一个网站的脚本无法访问另一个网站的内容。这个简单有力的规则是互联网安全的基础
```

## 跨源请求解决方案

### CORS

```md
一个请求是跨源的，浏览器始终会向其添加 Origin header
```

#### 分类

##### 简单请求

###### 简单方法

```md
GET，POST 或 HEAD
```

###### 简单 header

```md
Accept、Accept-Language、Content-Language、Content-Type
(Content-Type:application/x-www-form-urlencoded、multipart/form-data
、text/plain)
```

##### 非简单请求

```md
其他非简单方法的请求
```

#### 详情

##### 简单的 CORS

```shell
1.浏览器request。header带上`Origin`
2.服务器respond。header带上`Access-Control-Allow-Origin`
3.浏览器对比两个header
```

##### 非简单的 CORS

```shell
1.预检请求（preflight request） OPTIONS请求
2.预检响应（preflight response）
3.实际请求（actual request）
4.实际响应（actual response）
```

#### 其他细节

##### 凭据（Credentials）

```markdown
默认情况下，由 JavaScript 代码发起的跨源请求不会带来任何凭据（cookies 或者 HTTP
认证（HTTP authentication））。
```

```markdown
要在 fetch 中发送凭据，我们需要添加 credentials: "include" 选项，像这样：
fetch('http://another.com', { credentials: "include" });
```

```bash
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Credentials: true
```

```bash
对于具有凭据的请求，禁止 Access-Control-Allow-Origin 使用星号 *。
如上所示，它必须有一个确切的源。这是另一项安全措施，以确保服务器真的知道它信任的发出此请求的是谁。
```

##### Response header

```markdown
对于跨源请求，默认情况下，JavaScript 只能访问“简单” response
header：Cache-Control Content-Language Content-Type Expires Last-Modified Pragma
```

```bash
要授予 JavaScript 对任何其他 response header 的访问权限，

服务器必须发送 Access-Control-Expose-Headers header。
它包含一个以逗号分隔的应该被设置为可访问的非简单 header 名称列表。

200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://A.info
Access-Control-Expose-Headers: Content-Length,API-Key
```

### JSONP
