CommonJS 规范的主要内容有，一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，模块必须通过 module.exports 导出对外的变量或接口，通过 require() 来导入其他模块的输出到当前模块作用域中，下面讲述一下 NodeJs 中 CommonJS 的模块化机制。

## 使用方式

```javascript
// 模块定义 add.js
module.eports.add = function (a, b) {
  return a + b;
};

// 模块定义 decrease.js
module.exports.decrease = function (a, b) {
  return a - b;
};

// formula.js,模块使用，利用 require() 方法加载模块,require 导出的即是 module.exports 的内容
const add = require('./add.js').add;
const decrease = require('./decrease.js').decrease;
module.exports.square_difference = function (a, b) {
  return add(a, b) * decrease(a, b);
};
```

## exports 和 module.exports

exports 和 module.exports 是指向同一个东西的变量，即是 module.exports = exports = {}，所以你也可以这样导出模块

```javascript
//add.js
exports.add = function (a, b) {
  return a + b;
};
```

但是如果直接修改 exports 的指向是无效的，例如:

```javascript
exports = function (a, b) {
  return a + b;
};
```

---

2009 年，有人讨论将 JavaScript 引入服务器端。因此 ServerJS 诞生了。随后，ServerJS 将其改为 CommonJS 。

在 ESModule 诞生之前，以前的特殊解决方案，如 CommonJS 和 AMD。

CommonJS 不是一个 JavaScript 库。它是一个标准化组织。它就像 ECMA 或 W3C 一样。ECMA 定义了 JavaScript 的语言规范。W3C 定义了 JavaScript web API ，比如 DOM 或 DOM 事件。 CommonJS 的目标是为 web 服务器、桌面和命令行应用程序定义一套通用的 API 。

CommonJS API 定义很多普通应用程序（主要指非浏览器的应用）使用的 API，从而填补了这个空白。它的终极目标是提供一个类似 Python，Ruby 和 Java 标准库。这样的话，开发者可以使用 CommonJS API 编写应用程序，然后这些应用可以运行在不同的 JavaScript 解释器和不同的主机环境中。

CommonJS 还定义了模块 API 。因为在服务器应用程序中没有 HTML 页面和 `</script><script>`标签，所以为模块提供一些清晰的 API 是很有意义的。模块需要被公开 (export) 以供其它模块使用，并且可以访问(import)。它的导出模块语法如下：

2009 年，美国程序员 Ryan Dahl 创造了 node.js 项目，将 javascript 语言用于服务器端编程。这标志”Javascript 模块化编程”正式诞生。因为老实说，在浏览器环境下，没有模块也不是特别大的问题，毕竟网页程序的复杂性有限；但是在服务器端，一定要有模块，与操作系统和其他应用程序互动，否则根本没法编程。NodeJS 是 CommonJS 规范的实现，webpack 也是以 CommonJS 的形式来书写。Node 应用由模块组成，采用 CommonJS 模块规范

## CommonJS 模块规范

每个文件就是一个模块，有自己的作用域。在一个文件里面定义的 变量 、 函数 、 类，都是私有的，对其他文件不可见。

```javascript
// example.js

var x = 5;
var addX = function (value) {
  return value + x;
};
```

上面代码中，变量 x 和 函数 addX，是当前文件 example.js 私有的，其他文件不可见。如果想在多个文件分享变量，必须定义为 global 对象的属性。

```javascript
global.x = 5;
```

上面代码的 x 变量，可以被所有文件读取。当然，这样写法是不推荐的。

CommonJS 规范规定，每个模块内部，module 变量 代表当前模块。这个变量是一个 对象，它的 exports 属性（即 module.exports）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。

通过 module.exports 输出变量 x 和函数 addX

```javascript
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;
```

也可以这样写

```javascript
var x = 5;
var addX = function (value) {
  return value + x;
};
exports.x = x;
exports.addX = addX;
```

## require 方法用于加载模块

```javascript
var example = require('./example.js');

console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

## CommonJS 模块规范内部剖析

Node 内部提供一个 Module 构建函数。所有模块都是 Module 的实例。不妨打印出来看看是什么东西。

```javascript
// example.js
console.log(module);
console.log(typeof module); // object
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/com4-1549178558.jpg'/>

## module.exports

module 本质是模块辨识符是一个 object，module.exports 属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取 module.exports 变量。打比方：module 是长途运输卡车，module.exports 相当于 装货的过程。

为了方便，Node 为每个模块提供一个 exports 变量，指向 module.exports。这等同在每个模块头部，有一行这样的命令。

```javascript
var exports = module.exports;
// example.js
console.log(module.exports); // {}
console.log(typeof module.exports); // object
console.log(exports); // {}
console.log(typeof exports); // object
```

## module.require

require 是一个函数。require 命令的基本功能是，读入并执行一个 JavaScript 文件，然后返回该模块的 exports 对象。如果没有发现指定模块，会报错。require 相当于是 卸货的过程。

```javascript
console.log(require); // “打印结果如下图”
console.log(typeof require); // function
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/comrequire-1549178558.jpg'/>

这两个东西怎么使用

```javascript
// a.js

exports.message = 'hello world!';
exports.hi = function () {
  console.log('Nice to meet you!');
};

console.log(exports); // { message: 'hello world!', hi: [Function] }
```

```javascript
// b.js
// alias ==> a.js 的 exports

var alias = require('./a');

console.log(alias); // { message: 'hello world!', hi: [Function] }
console.log(typeof alias); // object
```

每一个模块有一个 exports, 这玩意是个对象。我们把模块的 变量 、 函数 、 类往它身上添加。require 是个函数，接收一个文件为参数，实参是“路径”。把 exports 身上的东西取下来。看图。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/combiyu-1549178558.jpg'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/comyilai-1549178558.jpg'/>

注意：这个 index.js 可以在 node 的交互式环境中运行，我们要在浏览器运行的话，需要 webpack 打包，然后插入到 html 页面中，打开控制台，才能看到输出结果。

## node 运行结果

```javascript
~/\_代码 /**PracticeCode**/CMD 模块(master) » node index.js

who teacher name is:yangdong
student name is:231
student name is:aew
```

有个疑惑，为什么不能直接在浏览器环境下运行呢？
浏览器不兼容 CommonJS 的根本原因，在于缺少四个 Node.js 环境的变量。

```javascript
module exports require global
```

## webpack 打包配置文件

```javascript
// webpack.config.js
const path = require('path');
const config = {
  entry: ['./index.js'],
  output: {
    path: path.resolve(\_\_\_dirname, 'dist'),
    filename: 'bundle.js',
  },
};
// commonJS 模块化输出:module.exports = {}
module.exports = config;
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/com浏览器-1549178558.jpg'/>

---

1. [CommonJS 规范 -- JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/nodejs/module.html)
