filters 怎么用？

Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示。

数据接口如下

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/filters1.jpg"  data-action="zoom">

`usageModule`是一个数组，我们需要拼接成一个字符串。

处理前后，显示如下图。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/filters2.jpg"  data-action="zoom">

#### 具体实现

```html
 <div class="module">{{x.usageModule | module}}<span>案例剖析</span>
```

```javascript
filters: {
  module: function(value) {
    if (!value) return "";
    let a = "";
    value.forEach(element => {
      a += element + "  ";
    });
    return a;
  }
},
```

---

参考链接：

---

1. [过滤器 — Vue.js](https://cn.vuejs.org/v2/guide/filters.html)
