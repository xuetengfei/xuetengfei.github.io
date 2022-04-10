# XSS

跨站脚本攻击（Cross-site scripting，XSS）是一种安全漏洞，攻击者可以利用这种漏洞
在网站上注入恶意的客户端代码。当被攻击者登陆网站时就会自动运行这些恶意代码，从而
，攻击者可以突破网站的访问权限，冒充受害者。根据开放式 Web 应用安全项目（OWASP）
，XSS 在 2017 年被认为 7 种最常见的 Web 应用程序漏洞之一。

## 存储型 XSS

> 注入型脚本存储在目标服务器上。当浏览器请求数据时，脚本从服务器上传回并执行。

留言板里面写一个 js 脚本，如果被储存到数据库了，下次加载数据的时候，就会执行这段
脚本。

## 反射型 XSS

当用户点击一个恶意链接，或者提交一个表单，或者进入一个恶意网站时，注入脚本进入被
攻击者的网站。Web 服务器将注入脚本，比如一个错误信息，搜索结果等 返回到用户的浏
览器上。由于浏览器认为这个响应来自"可信任"的服务器，所以会执行这段脚本。

## 基于 DOM 的 XSS

通过修改原始的客户端代码，受害者浏览器的 DOM 环境改变，导致有效载荷的执行。也就
是说，页面本身并没有变化，但由于 DOM 环境被恶意修改，有客户端代码被包含进了页面
，并且意外执行。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
  </head>
  <body>
    <script>
      eval(location.hash.substr(1));
    </script>
  </body>
</html>
```

![20220327-06MwVg-Xnip2022-03-27_16-55-11](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220327-06MwVg-Xnip2022-03-27_16-55-11.jpg)

## 防御

### 对用户的输入(或者 URL 参数)过滤

对用户的输入、URL 参数,过滤

白名单、黑名单字符串处理

### 对输出编码

`<`转化为 html 实体`&lt;`

### Escape HTML

```javascript
const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[tag] || tag),
  );
```

```javascript
const unescapeHTML = str =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"',
      }[tag] || tag),
  );
```

---

1. [Cross-site scripting（跨站脚本攻击） - 术语表 | MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Cross-site_scripting)
2. [XSS 原理和攻防 - Web 安全常识 - YouTube](https://www.youtube.com/watch?v=QJzkifQ-Cuk)
3. [node npm js-xss](https://github.com/leizongmin/js-xss/blob/master/README.zh.md)
4. [Escape HTML - 30 seconds of code](https://www.30secondsofcode.org/js/s/escape-html)
