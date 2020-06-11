<!-- Node.js 总是吹牛逼说自己异步特性多么多么厉害，但是对于初学者来说，要找一个能好好利用异步的场景不容易。我想来想去，爬虫的场景就比较适合，没事就异步并发地爬几个网站玩玩。 本来想教大家怎么爬 github 的 api 的，但是 github 有 rate limit 的限制，所以只好牺牲一下 CNode 社区（国内最专业的 Node.js 开源技术社区），教大家怎么去爬它了。 -->

先介绍一下,这回需要用到三个依赖,分别是 express，superagent 和 cheerio。

- express node 的服务器框架
- superagent(http://visionmedia.github.io/superagent/ ) 是个 http 方面的库，可以发起 get 或 post 请求。
- cheerio(https://github.com/cheeriojs/cheerio ) 大家可以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的。

```javascript
// 引入依赖
const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');

const app = express();

app.get('/', function(req, res, next) {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('https://cnodejs.org/').end(function(err, sres) {
    // 常规的错误处理
    if (err) {
      return next(err);
    }
    // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
    // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
    // 剩下就都是 jquery 的内容了
    var $ = cheerio.load(sres.text);
    var items = [];
    $('#topic_list .topic_title').each(function(idx, element) {
      var $element = $(element);
      items.push({
        title: $element.attr('title'),
        href: 'http://cnodejs.org' + $element.attr('href'),
      });
    });

    res.send(items);
  });
});

app.listen(7777, function(req, res) {
  console.log('app is running at port 7777');
});
```

```javascript
[
  {
    title: '服务器迁移至 aws 日本机房',
    href: 'http://cnodejs.org/topic/5bd4772a14e994202cd5bdb7',
  },
  {
    title: 'Node 地下铁第七期「深圳站」线下沙龙邀约 - Node.js 新生态',
    href: 'http://cnodejs.org/topic/5baee8de9545eaf107b9c6f3',
  },
  {
    title: 'EggJS 10000 Star + 2 years - 阿里 Node 企业级框架 ✨✨✨',
    href: 'http://cnodejs.org/topic/5ba5fd6237a6965f59051bd1',
  },
  {
    title: '第七期杭州 Node Party 回顾【附PPT】',
    href: 'http://cnodejs.org/topic/5b911f1837b3005a0b0e6c16',
  },
  {
    title: '搞机团，加入我的战队即可享受云产品首购最低1折优惠。',
    href: 'http://cnodejs.org/topic/5bd7caa9d00aac1004de525b',
  },
  {
    title: 'eggjs 请求参数 布尔值会转换成字符串',
    href: 'http://cnodejs.org/topic/5bda530704de603bdb44847c',
  },
  {
    title: 'ubuntu服务端使用nodemailer发送不了邮件',
    href: 'http://cnodejs.org/topic/5bd9341aad4ad129f476dd0b',
  },
];
```
