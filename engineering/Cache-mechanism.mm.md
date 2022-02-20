<!-- 脑图源文件 -->

# 浏览器 HTTP 缓存

## 缓存类型

### 维度 1：按照用户区分

#### 私有缓存

```md
"Cache-Control: private" 表示该响应是专用于某单个用户的，中间人不能缓存此响应，
该响应只能应用于浏览器私有缓存中。
```

#### 公共缓存

```md
"Cache-Control: public" 表示该响应可以被任何中间人（比如中间代理、CDN 等）缓存。
```

### 维度 2：按照工作原理区分

#### 1.强缓存

```md
不会向服务器发送请求，直接从缓存中读取资源，在 network 选项中可以看到返回 200 的
状态码，并且 size 显示 from disk cache 或 from memory cache；
```

#### 2.协商缓存

```markdown
向服务器发送请求，服务器会根据这个请求的 request header 的一些参数来判断是否命中
协商缓存，如果命中，则返回 304 状态码并带上新的 response header 通知浏览器从缓存
中读取资源；
```

#### 二者比较

##### 相同

```md
都是从客户端缓存中读取资源
```

##### 不同

```markdown
区别是强缓存不会发请求，协商缓存会发请求
```

## 响应标头(按照功能区分成两类)

### Caching Headers(缓存控制)

```md
1. expires 过期时间，浏览器再次加载资源时，如果在这个过期时间内，则命中强缓存。
1. Cache-Control 当值设为 max-age=300 时，则代表在这个请求正确返回时间（浏览器也
   会记录下来）的 300s 内再次加载资源，就会命中强缓存。如果不一致则有改动，直接
   返回新的资源文件带上新的 Etag 值并返回 200；
```

<!--
Expires和Cache-Control:max-age=*** 的作用是差不多的，区别就在于 Expires 是http1.0的产物，Cache-Control是http1.1的产物，两者同时存在的话，Cache-Control优先级高于Expires；在某些不支持HTTP1.1的环境下，Expires就会发挥用处。所以Expires其实是过时的产物，现阶段它的存在只是一种兼容性的写法
 -->

### Validators(验证器,确保缓存内容仍然可用)

```md
1. Etag 上一次加载资源时，服务器返回的 response header，是对该资源的一种唯一标识
   ，只要资源有变化，Etag 就会重新生成。
2. If-None-Match 下一次加载资源向服务器发送请求时,value 等于上一次的 Etag，服务
   器接受到 If-None-Match 的值后，会拿来跟该资源文件的 Etag 值做比较，如果相同，
   则表示资源文件没有发生改变，命中协商缓存。
3. Last-Modified 是该资源文件最后一次更改时间，服务器会在 response header 里返回
   ，同时浏览器会将这个值保存起来
4. If-Modified-Since 在下一次发送请求时，放到 request header 里的
   If-Modified-Since 里，服务器在接收到后也会做比对，如果相同则命中协商缓存。
```

<!-- ETag和If-None-Match：这两个要一起说。Etag是上一次加载资源时，服务器返回的response header，是对该资源的一种唯一标识，只要资源有变化，Etag就会重新生成。浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的Etag值放到request header里的If-None-Match里，服务器接受到If-None-Match的值后，会拿来跟该资源文件的Etag值做比较，如果相同，则表示资源文件没有发生改变，命中协商缓存。

Last-Modified和If-Modified-Since：这两个也要一起说。Last-Modified是该资源文件最后一次更改时间，服务器会在response header里返回，同时浏览器会将这个值保存起来，在下一次发送请求时，放到request header里的If-Modified-Since里，服务器在接收到后也会做比对，如果相同则命中协商缓存。

Etag / If-None-Match优先级高于Last-Modified / If-Modified-Since，同时存在则只有Etag / If-None-Match生效。
-->

#### 比较

```md
ETag 和 Last-Modified 的作用和用法也是差不多，说一说他们的区别。

首先在精确度上，Etag 要优于 Last-Modified。第二在性能上，Etag 要逊于
Last-Modified，毕竟 Last-Modified 只需要记录时间，而 Etag 需要服务器通过算法来计
算出一个 hash 值。第三在优先级上，服务器校验优先考虑 Etag。

Etag / If-None-Match 优先级高于 Last-Modified / If-Modified-Since，同时存在则只
有 Etag / If-None-Match 生效。
```
