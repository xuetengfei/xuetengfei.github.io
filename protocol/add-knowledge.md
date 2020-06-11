#### 端口

端口的作用：通过端口来区分出同一电脑内不同应用或者进程，从而实现一条物理网线(通过分组交换技术-比如 internet)同时链接多个程序 Port\_(computer_networking)

端口号是一个 16 位的 uint, 所以其范围为 1 to 65535 (对 TCP 来说, port 0 被保留，不能被使用. 对于 UDP 来说, source 端的端口号是可选的， 为 0 时表示无端口).

#### URL

RFC1738 定义的 url 格式笼统版本<scheme>:<scheme-specific-part>， scheme 有我们很熟悉的 http、https、ftp，以及著名的 ed2k，thunder。

通常我们熟悉的 url 定义成这个样子

```
<scheme>://<user>:<password>@<host>:<port>/<url-path>
```

用过 ftp 的估计能体会这么长的，网页上很少带 auth 信息，所以就精简成这样:

```
<scheme>://<host>:<port>/<url-path>
```
