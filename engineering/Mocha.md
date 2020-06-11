Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.

[Mocha](https://mochajs.org/)是 JavaScript 的一种单元测试框架，既可以在浏览器环境下运行，也可以在 Node.js 环境下运行。

使用 mocha，我们就只需要专注于编写单元测试本身，然后，让 mocha 去自动运行所有的测试，并给出测试结果。mocha 的特点:1.既可以测试简单的 JavaScript 函数，又可以测试异步代码，因为异步是 JavaScript 的特性之一；2.可以自动运行所有测试，也可以只运行特定的测试；3.可以支持 before、after、beforeEach 和 afterEach 来编写初始化代码。

本以为很简单，结果遇到了一些问题。npm init 初始化加上几个文件，看一下目录结构。

```
.
├── eg.js
├── package-lock.json
├── package.json
└── test
    ├── eg.test.js
    └── mocha.opts

1 directory, 6 files
```

需要一个 test 文件夹，名字不能改变。使用 es6 语法情况下，需要安装 babel 编译，而且需要配置一个 mocha.opts 用来告诉 mocha。按照惯例，编写测试实例的时候，就在源文件后面加上 test 后缀。比如：eg.js --> eg.test.js

mocha 本身是不包含断言库的，所以必须引入第三方断言库，目前比较受欢迎的断言库 有 should.js、expect.js 、chai，具体的语法规则需要大家去查阅相关文档。我个人选择[Should.js](http://shouldjs.github.io/)

# 首先是安装

1. 安装 mocha: npm i mocha --save-dev
2. 安装 babel: npm install babel-core babel-preset-es2015 --save-dev
3. 安装 should: npm install should --save-dev
4. 修改 package.json
   Babel 会在正在被转录的文件的当前目录中查找一个[.babelrc](https://www.babeljs.cn/docs/usage/babelrc/)文件。 如果不存在，它会遍历目录树，直到找到一个 .babelrc 文件，或一个 package.json 文件中有 "babel": {} 。

```diff
{
  "name": "mochatext",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
+    "test": "mocha"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-preset-es2015": "^6.24.1",
    "mocha": "^5.2.0",
    "should": "^13.2.1"
  },
  "dependencies": {
    "npm": "^6.1.0"
  },
+  "babel": {
+    "presets": [
+      "es2015"
+    ]
+  }

}
```

5.配置 test/mocha.opts

[compilers deprecation · mochajs/mocha Wiki](https://github.com/mochajs/mocha/wiki/compilers-deprecation#what-should-i-use-instead-then)

```javascript
// test/mocha.opts

--require babel-core/register
```

### 安装的累死了，现在开始写吧

```javascript
// MochaTest/eg.js

export const sum = (...rest) => {
  var sum = 0;
  for (let n of rest) {
    sum += n;
  }
  return sum;
};
```

```javascript
// MochaTest/test/eg.test.js

import { sum } from '../eg.js';
import should from 'should';
describe('#eg.js', () => {
  describe('#sum()', () => {
    it('sum() should return 0', () => {
      should.strictEqual(sum(), 0);
    });
    it('sum(1) should return 1', () => {
      should.strictEqual(sum(1), 1);
    });
    it('sum(1, 2) should return 3', () => {
      should.strictEqual(sum(1, 2), 3);
    });
    it('sum(1, 2, 3) should return 6', () => {
      should.strictEqual(sum(1, 2, 3), 6);
    });
  });
});
```

### 跑一下脚本 npm run test

打印结果如下。
<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/mocha-test.jpg"  data-action="zoom" style="margin:0 auto;" width="550px">

---

参考链接：

0. [测试框架 Mocha 实例教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
1. [Mocha - the fun, simple, flexible JavaScript test framework](https://mochajs.org/)
1. [mocha - 廖雪峰](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00147203593334596b366f3fe0b409fbc30ad81a0a91c4a000)
1. [mocha 总结文档 - CNode 技术社区](https://cnodejs.org/topic/59e3873520a1a3647d72ac39)
1. [Should.js API Documentation](http://shouldjs.github.io/)
1. [博客源文件地址 MochaTest](https://github.com/xuetengfei/BlogCode/tree/master/MochaTest)
