?> 解决依赖循环:一个很简明的方法，那就是在循环依赖的每个模块中先导出自身，然后再导入其他模块。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/circule-1571382994.svg' width='700px'/>

```javascript
// a.js
const a = 10;
module.exports = { a };
const { b } = require('./b');
console.log('a: ', a);
console.log('b: ', b);
```

```javascript
// b.js
const { a } = require('./a');
const b = 10 + a;
module.exports = { b };
```

```bash
node a.js
>>> a:  10
>>> b:  20
```

---

1. [madge - npm](https://www.npmjs.com/package/madge)
2. [JavaScript 模块的循环加载 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html)
3. [Node.js 解决循环依赖问题的两种方法介绍-js 教程-PHP 中文网](https://www.php.cn/js-tutorial-412328.html)
