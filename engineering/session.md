在[Cookie](engineering/cookies.md) 文章中,我们了解到,cookie 实际上是一小段的文本
信息,是客户端保存用户信息的一种机制,用来记录用户的一些信息。

session 是另一种记录客户状态的机制。如果说 cookie 机制是通过检查客户身上的“通信
证”,那么 session 机制就是通过检查服务器上的“花名册”来确认客户身份。

大多数的应用都是用 Cookie 来实现 session 跟踪的,第一次账号密码登录后,创建
session 的时候,服务端使用 Set-Cookie 在浏览器 Cookie 里面「种」一个 session ID,
以后每次请求把这个会话 ID 发送到服务器,就知道你是谁了。

session 是在服务端保存的一个数据, 这个数据可以保存在集群、数据库 、文件中
。Cookie 是客户端保存用户信息的一种机制, 用来记录用户的一些信息,也是实现 session
的一种方式。不同的是 cookie 保存在客户端浏览器中,而 session 保存在服务器上。

![20220224-9axdGR-356_2255943654_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220224-9axdGR-356_2255943654_.webp)

如果客户端的浏览器禁用了 Cookie 怎么办？一般这种情况下,会使用一种叫做 URL 重写的
技术来进行会话跟踪,即每次 HTTP 交互,URL 后面都会被附加上一个诸如 sid=xxxxx 这样
的参数,服务端据此来识别用户。
