<!-- Token,作为权限守护者,最重要的就是「安全」。业务接口用来鉴权的 token,我们称之
为 access token。越是权限敏感的业务,我们越希望 access token 有效期足够短,以避
免被盗用。但过短的有效期会造成 access token 经常过期,过期后怎么办呢？一种办法是
,让用户重新登录获取新 token,显然不够友好,要知道有的 access token 过期时间可能
只有几分钟。另外一种办法是,再来一个 token,一个专门生成 access token 的 token,
我们称为 refresh token。

- access token 用来访问业务接口,由于有效期足够短,盗用风险小,也可以使请求方式
  更宽松灵活
- refresh token 用来获取 access token,有效期可以长一些,通过独立服务和严格的请
  求方式增加安全性；由于不常验证,也可以如前面的 session 一样处理有了 refresh
  token 后,几种情况的请求流程变成这样： -->

token 经常过期,过期后怎么办呢？

一种办法是,让用户重新登录获取新 token,显然不够友好,有的 token 过期时间可能只有几
分钟。

另外一种办法是,再来一个 token。业务接口用来鉴权的 token,我们称之为 access
token。一个专门生成 access token 的 token,我们称为 refresh token。

可以设置 access token 的有效期短一点,refresh token 的有效期长一点。如果 refresh
token 也过期了,此时就重新登录了。

![20220224-jedDHj-359_2255944903_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220224-jedDHj-359_2255944903_.webp)
