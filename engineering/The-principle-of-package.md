前端模块化成为了主流的今天，离不开各种打包工具的贡献。社区里面对于 webpack，rollup 以及后起之秀 parcel 的介绍层出不穷，对于它们各自的使用配置分析也是汗牛充栋。为了避免成为一位“配置工程师”，我们需要来了解一下打包工具的运行原理，只有把核心原理搞明白了，在工具的使用上才能更加得心应手。

基于 parcel 核心开发者@ronami 的开源项目 `minipack` ，在其非常详尽的注释之上加入更多的理解和说明，方便读者更好地理解。

### 打包工具核心原理

顾名思义，打包工具就是负责把一些分散的小模块，按照一定的规则整合成一个大模块的工具。与此同时，打包工具也会处理好模块之间的依赖关系，最终这个大模块将可以被运行在合适的平台中。

打包工具会从一个入口文件开始，分析它里面的依赖，并且再进一步地分析依赖中的依赖，不断重复这个过程，直到把这些依赖关系理清挑明为止。

从上面的描述可以看到，打包工具最核心的部分，其实就是处理好模块之间的依赖关系，而 minipack 以及本文所要讨论的，也是集中在模块依赖关系的知识点当中。

为了简单起见，minipack 项目直接使用 ES modules 规范，接下来我们新建三个文件，并且为它们之间建立依赖：

```javascript
/* name.js */

export const name = 'World';
```

```javascript
/* message.js */

import { name } from './name.js';
export default `Hello ${name}!`;
```

```javascript
/* entry.js */

import message from './message.js';
console.log(message);
```

新建一个 js 文件，命名为 minipack.js，首先引入必要的工具。

```javascript
/* minipack.js */

const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');
```

接下来，我们会撰写一个函数，这个函数接收一个文件作为模块，然后读取它里面的内容，分析出其所有的依赖项。当然，我们可以通过正则匹配模块文件里面的 import 关键字，但这样做非常不优雅，所以我们可以使用 babylon 这个 js 解析器把文件内容转化成抽象语法树（AST），直接从 AST 里面获取我们需要的信息。

得到了 AST 之后，就可以使用 babel-traverse 去遍历这棵 AST，获取当中关键的“依赖声明”，然后把这些依赖都保存在一个数组当中。

最后使用 babel-core 的 transformFromAst 方法搭配 babel-preset-env 插件，把 ES6 语法转化成浏览器可以识别的 ES5 语法，并且为该 js 模块分配一个 ID。

```javascript
let ID = 0;

function createAsset(filename) {
  // 读取文件内容
  const content = fs.readFileSync(filename, 'utf-8');

  // 转化成AST
  const ast = babylon.parse(content, {
    sourceType: 'module',
  });

  // 该文件的所有依赖
  const dependencies = [];

  // 获取依赖声明
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    },
  });

  // 转化ES6语法到ES5
  const { code } = transformFromAst(ast, null, {
    presets: ['env'],
  });

  // 分配ID
  const id = ID++;

  // 返回这个模块
  return {
    id,
    filename,
    dependencies,
    code,
  };
}
```

运行 createAsset('./example/entry.js')，输出如下：

```javascript
{ id: 0,
  filename: './example/entry.js',
  dependencies: [ './message.js' ],
  code: '"use strict";\n\nvar _message = require("./message.js");\n\nvar _message2 = _interopRequireDefault(_message);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconsole.log(_message2.default);' }
```

可见 entry.js 文件已经变成了一个典型的模块，且依赖已经被分析出来了。接下来我们就要递归这个过程，把“依赖中的依赖”也都分析出来

### 建立依赖关系图集

新建一个名为 createGragh() 的函数，传入一个入口文件的路径作为参数，然后通过 createAsset()解析这个文件使之定义成一个模块。

接下来，为了能够挨个挨个地对模块进行依赖分析，所以我们维护一个数组，首先把第一个模块传进去并进行分析。当这个模块被分析出还有其他依赖模块的时候，就把这些依赖模块也放进数组中，然后继续分析这些新加进去的模块，直到把所有的依赖以及“依赖中的依赖”都完全分析出来。

与此同时，我们有必要为模块新建一个 mapping 属性，用来储存模块、依赖、依赖 ID 之间的依赖关系，例如“ID 为 0 的 A 模块依赖于 ID 为 2 的 B 模块和 ID 为 3 的 C 模块”就可以表示成下面这个样子：

```javascript
{
  0: [function A () {}, { 'B.js': 2, 'C.js': 3 }]
}
```

搞清楚了个中道理，就可以开始编写函数了

```javascript
function createGragh(entry) {
  // 解析传入的文件为模块
  const mainAsset = createAsset(entry);

  // 维护一个数组，传入第一个模块
  const queue = [mainAsset];

  // 遍历数组，分析每一个模块是否还有其它依赖，若有则把依赖模块推进数组
  for (const asset of queue) {
    asset.mapping = {};
    // 由于依赖的路径是相对于当前模块，所以要把相对路径都处理为绝对路径
    const dirname = path.dirname(asset.filename);
    // 遍历当前模块的依赖项并继续分析
    asset.dependencies.forEach(relativePath => {
      // 构造绝对路径
      const absolutePath = path.join(dirname, relativePath);
      // 生成依赖模块
      const child = createAsset(absolutePath);
      // 把依赖关系写入模块的mapping当中
      asset.mapping[relativePath] = child.id;
      // 把这个依赖模块也推入到queue数组中，以便继续对其进行以来分析
      queue.push(child);
    });
  }

  // 最后返回这个queue，也就是依赖关系图集
  return queue;
}
```

尝试运行一下 createGraph('./example/entry.js')，就能够看到如下的输出：

```javascript
[
  {
    id: 0,
    filename: './example/entry.js',
    dependencies: ['./message.js'],
    code:
      '"use strict";\n\nvar _message = require("./message.js");\n\nvar _message2 = _interopRequireDefault(_message);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconsole.log(_message2.default);',
    mapping: { './message.js': 1 },
  },
  {
    id: 1,
    filename: 'example/message.js',
    dependencies: ['./name.js'],
    code:
      '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _name = require("./name.js");\n\nexports.default = "Hello " + _name.name + "!";',
    mapping: { './name.js': 2 },
  },
  {
    id: 2,
    filename: 'example/name.js',
    dependencies: [],
    code:
      '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nvar name = exports.name = \'world\';',
    mapping: {},
  },
];
```

现在依赖关系图集已经构建完成了，接下来就是把它们打包成一个单独的，可直接运行的文件啦！

### 进行打包

上一步生成的依赖关系图集，接下来将通过 CommomJS 规范来实现加载。简单来说，就是通过构造一个立即执行函数(function () {})()，手动定义 module，exports 和 require 变量，最后实现代码在浏览器运行的目的

```javascript
function bundle(graph) {
  let modules = '';

  graph.forEach(mod => {
    modules += `${mod.id}: [
      function (require, module, exports) { ${mod.code} },
      ${JSON.stringify(mod.mapping)},
    ],`;
  });

  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];

        function localRequire(name) {
          return require(mapping[name]);
        }

        const module = { exports : {} };

        fn(localRequire, module, module.exports);

        return module.exports;
      }

      require(0);
    })({${modules}})
  `;
  return result;
}
```

最后运行 bundle(createGraph('./example/entry.js'))，输出如下：

```javascript
(function(modules) {
  function require(id) {
    const [fn, mapping] = modules[id];

    function localRequire(name) {
      return require(mapping[name]);
    }

    const module = { exports: {} };

    fn(localRequire, module, module.exports);

    return module.exports;
  }

  require(0);
})({
  0: [
    function(require, module, exports) {
      'use strict';

      var _message = require('./message.js');

      var _message2 = _interopRequireDefault(_message);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      console.log(_message2.default);
    },
    { './message.js': 1 },
  ],
  1: [
    function(require, module, exports) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true,
      });

      var _name = require('./name.js');

      exports.default = 'Hello ' + _name.name + '!';
    },
    { './name.js': 2 },
  ],
  2: [
    function(require, module, exports) {
      'use strict';

      Object.defineProperty(exports, '__esModule', {
        value: true,
      });
      var name = (exports.name = 'world');
    },
    {},
  ],
});
```

这段代码将能够直接在浏览器运行，输出“Hello world!”。

至此，整一个打包工具已经完成。

---

- [github.com/minipack](https://github.com/ronami/minipack)
