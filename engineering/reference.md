1. [项目不知道如何做性能优化？不妨试一下代码分割](https://mp.weixin.qq.com/s?__biz=MzUxNzk1MjQ0Ng==&mid=2247485100&idx=2&sn=aede2da132a5a85fecaff7218d89085f)
2. [WecTeam 的全部内容 - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/column/83805)
3. [2020 前端性能优化清单（一） - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1621632)
4. [【第 1671 期】21 项优化 React App 性能的技术](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651233070&idx=1&sn=60d0b53cd668116f847bbb8047e9bdd9&chksm=bd4942aa8a3ecbbcea6222e0313d5e0483875e56f5ddf5730bd0187fb9de0de6437af73263b0&scene=21#wechat_redirect)

# Web 应用性能优化的关键

关于 Web 应用性能优化，有一点是毫无疑问的：「页面加载越久，用户体验就越差」。几乎可以说 Web 应用性能优化的关键之处就在于：`减少页面初载时，所需加载资源的「数量」和「体积」`

那么当所需加载的资源数量到达多少或资源大小小于多少，才可以自信地宣称 Web 应用拥有出色的性能呢？下面是出的一个参考值，该参考值考虑到了移动端与国外等多种访问环境：

```md
1. 页面初载时，所有未压缩的 JavaScript 脚本大小：<=200KB；
2. 页面初载时，所有未压缩的 CSS 资源大小：<=100KB；
3. HTTP 协议下，请求资源数：<=6 个；
4. HTTP/2 协议下，请求资源数：<=20 个 ；
5. 90%的代码利用率（也就是说，仅允许 10% 的未使用代码）；
```

---

1. [性能为何至关重要  |  Web Fundamentals  |  Google Developers](https://developers.google.com/web/fundamentals/performance/why-performance-matters)
2. [laoqiren/web-performance: Web 性能的方方面面](https://github.com/laoqiren/web-performance)
3. [如何打造安全、快速、无障碍的网站？ | Google Web 最佳实践 - Google Web Ecosystem Consulting](https://pliao.gitbook.io/web-ecosystem-consulting/epidemic-19#shen-fen-shi-bie-an-quan-yi-ji-yin-si)
