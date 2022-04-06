## 命名导出(Named exports)

```javascript
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
  return x * x;
}
export function diag(x, y) {
  return sqrt(square(x) + square(y));
}

//------ main.js ------
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```

如果需要，还可以导入整个模块，并通过属性记号引用其命名导出：

```javascript
//------ main.js ------
import * as lib from 'lib';
console.log(lib.square(11)); // 121
console.log(lib.diag(4, 3)); // 5
```

CommonJS 语法中,代码组织模块如下:

```javascript
//------ lib.js ------
var sqrt = Math.sqrt;
function square(x) {
  return x * x;
}
function diag(x, y) {
  return sqrt(square(x) + square(y));
}
module.exports = {
  sqrt: sqrt,
  square: square,
  diag: diag,
};

//------ main.js ------
var square = require('lib').square;
var diag = require('lib').diag;
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```

### 默认导出(default exports)

下面的 ECMAScript 6 模块“是”一个单一的功能：

```javascript
//------ myFunc.js ------
export default function () { ... };

//------ main1.js ------
import myFunc from 'myFunc';
myFunc();
```

一个 ECMAScript 6 模块，其默认导出是一个类，如下所示：

```javascript
//------ MyClass.js ------
export default class { ... };

//------ main2.js ------
import MyClass from 'MyClass';
let inst = new MyClass();
```

Note:默认导出声明的操作数是一个表达式，它通常没有名称。相反，它是通过模块的名称来识别的。

### 在模块中同时命名导出和默认导出

在 JavaScript 中，以下模式非常常见：库是单个函数，但是通过该函数的属性提供附加服务。示例包括 jQuery 和 Unjist.js。下面是下划线作为普通模块的草图：

```javascript
//------ underscore.js ------
var _ = function (obj) {
    ...
};
var each = _.each = _.forEach =
    function (obj, iterator, context) {
        ...
    };
module.exports = _;

//------ main.js ------
var _ = require('underscore');
var each = _.each;
...
```

实际上可以同时命名导出和默认导出。看起来是这样的：

```javascript
//------ underscore.js ------
export default function (obj) {
    ...
};
export function each(obj, iterator, context) {
    ...
}

//------ main.js ------
import _, { each } from 'underscore';
...
```

### 导入

```javascript
// 混合到处 默认导出 命名导出
import theDefault, { named1, named2 } from 'src/mylib';
import theDefault from 'src/mylib';
import { named1, named2 } from 'src/mylib';

// 重命名:  named1 改名为 myNamed1
import { named1 as myNamed1, named2 } from 'src/mylib';

// 导入模块作为一个对象
// (每个命名导出都作为一个属性)
import * as mylib from 'src/mylib';

// 只加载模块，不导入任何东西
import 'src/mylib';
```

---

## 什么是 JavaScript 模块？

JavaScript 模块允许我们把项目中的代码分散成一个个单独的文件，或者使用通过 npm 安装的开源模块。用模块化的方式写代码有助于（项目的）组织、维护、测试，以及最重要的依赖管理。

当我们编写 JavaScript 时，理想情况是保障每个模块都专注一件事并把这件事做好。这种分工可以让我们在需要某个模块时再去做相应的加载。模块化是是 npm 背后的核心原则。当需要某个特定的功能时，我们能安装相应的模块并加载到应用当中。

随着时间推移，我们发现那种大而全的框架变少了，看到更多的是 专注一件事并把这件事做好 的小型模块。

举个例子，大部分人都用过 jQuery。这个库包含了从 CSS 操作到 ajax 调用几乎全部的方法。现如今，很多人开始迁移到 React 这类库上，我们常常需要加载额外的模块来完成一些任务如 ajax 或路由。

## 模块背后的理念

我们使用导入和导出语句来在文件之间共享代码（变量、函数、数据、任何代码），而不是把所有代码加载到全局命名空间下。每一个模块导入需要的依赖，也可以为其它文件导出需要的代码。

---

1. [ECMAScript 6 modules: the final syntax](http://2ality.com/2014/09/es6-modules-final.html)
2. [ECMAScript 6 Modules:翻译](http://www.css88.com/archives/6974)
3. [export 和 import 命令 ](http://www.jzdlink.com/studynotes/201702281164.html)
4. [深入理解 ES Modules (手绘示例) - 众成翻译](https://www.zcfy.cc/article/es-modules-a-cartoon-deep-dive-mozilla-hacks-the-web-developer-blog)
