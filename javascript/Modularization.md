### JavaScript 演变和开发

随着时间的推移，理解 JavaScript 的设计和使用的演变是很重要的，这样才能理解为什么
以及如何使用它。

```markdown
JavaScript 的设计目的是当你把鼠标移到猴子身上时，它会跳舞。脚本通常只有一行。我
们认为十行脚本是很正常的，百行脚本是巨大的，千行的脚本是闻所未闻的。这门语言绝对
不是为大型编程而设计的，我们的实现决策、性能目标等等都是基于这个假设的。

微软前 IE/JS 开发人员 Eric Lippert。
```

今天，应用程序通常由数十万行 JavaScript 组成。这为开发人员如何编写、构建和交付客
户端应用程序引入了一套完全不同的约束。这些限制导致了与早期截然不同的开发方法。现
在的 web 客户端使用复杂的构建工具链，直接等价于 c + + 或 Java 等语言的编译器，而
不是编写几行 JS 并将它们内联到 HTML 页面中。

JavaScript 模块格式

C#、Python、Go 和 Swift,几乎所有的语言都有内置的语法来声明封装的 "模块 "或 "包
"。 都有自己的包定义和导入/导出语法。JavaScript 不是这些语言中的一种。与这些语言
不同，JavaScript 最初没有内置模块格式语法。许多年来，JS 代码都是直接以内联
`<script>`标签的形式写在 HTML 中的，或者是以带有一些共享全局变量的小型.js 文件的
形式写的。

随着开发人员开始编写更大的应用程序代码库，社区最终开始发明自己的模块格式来帮助提
供结构和封装。每一种格式的发明都是为了解决不同的用例。

注意：本节中的代码片段纯粹是为了说明各种格式之间的语法差异--实际的代码并不打算运
行或做任何有用的事情。

#### 刀耕火种的原始阶段

在一个页面中添加许多脚本标签有几个问题。要确定不同脚本文件之间的依赖关系，并以正
确的顺序加载它们可能非常困难。另外，由于所有的顶层变量都占据了相同的全局命名空间
，所以很容易出现同名变量相互覆盖的意外。

```html
<script src="jquery.min.js"></script>
<script src="jquery.someplugin.js"></script>
<script src="./components/dropdown.js"></script>
<script src="./components/modal.js"></script>
<script src="./application.js"></script>
// dropdown.js var delay = 2000; // in ms // modal.js var delay = 4000; // in ms
// application.js // Oops - is it 2000 or 4000? console.log(delay)
```

问题：1.缺乏依赖解析：文件的顺序很重要。2.全局命令空间污染：所有的函数和变量依然
在全局作用域中。

#### 模块对象和 IIFE(模块模式)

立即调用函数表达式(IIFEs)是一种依赖于 JS 变量作用域到最近函数的模式。IIFE 涉及定
义一个新的函数，然后立即调用它来获得一个结果。这提供了封装，并被用作 "揭示模块 "
模式的基础，其中 IIFE 返回一个定义其公共 API 的对象（相当于工厂函数或类构造函数
）。

```javascript
(function () {
  const key = 'value';
})();

const modalAPI = (function () {
  //  encapsulated in the IIFE
  const object = {
    key: 'value',
  };
  return {
    object,
  };
})();
```

#### 异步模块定义(AMD)

异步模块定义格式（AMD）是专门为浏览器设计的。专门的 AMD 加载器库首先创建一个全局
定义函数。然后 AMD 模块调用 define()，并传入一个它们所依赖的模块名数组，以及一个
作为模块主体的函数。模块主体函数接收所有请求的依赖项作为参数，并可以返回任何一个
值作为它的 "出口"。然后，加载器库检查是否所有请求的依赖关系都已被注册和加载。如
果没有，它将以瀑布式的方式递归下载其它的依赖关系，并沿着依赖关系链向上工作，用它
的依赖关系初始化每个模块函数。

```javascript
// moduleA.js
// Loader library adds a global `define()` function
define(['jquery', 'myOtherModule'], function ($, myOtherModule) {
  // Body of the function is the module definition
  const a = 42;
  const b = 123;
  function someFunction() {}
  // Return value is the "exports" of the module
  // Can do "named exports" by returning object with many values
  return { a: a, publicName: b, someFunction: someFunction };
});
```

define 函数(或关键字)将依赖项列表和回调函数作为参数。回调函数的参数与数组中的依
赖是相同的顺序。这相当于导入模块。并且回调函数返回一个值，即是你导出的值。

CommonJS 和 AMD 解决了模块模式中剩下的两个问题：`依赖解析` 和 `全局作用域污染`
。我们只需要处理每个模块或每个文件的依赖关系就可以了。并且不再有全局作用域污染。

#### RequireJS

在我们的浏览器应用程序中，AMD 可以把我们从 script 标签和全局污染中解救出来。那么
，我们该如何使用它呢？这里 RequireJS 就可以帮助我们了。RequireJS 是一个
JavaScript 模块加载器(module loader) 。它可以根据需要异步加载模块。

尽管 RequireJS 的名字中含有 require，但是它的目标却并非要去支持 CommonJS 的
require 语法。使用 RequireJS，您可以编写 AMD 风格的模块。

在编写自己的应用程序之前，你将不得不从 RequireJS 网站 下载 `require.js 文件`。如
下代码是用 RequireJS 编写的示例应用程序。

下面是 AMD 风格的应用程序示例

```javascript
<html>
  <head>
    <title>JS Modules</title>
  </head>
  <body>
    <h1>
      The Answer is
      <span id="answer" />
    </h1>
    <script data-main="main" src="require.js" />
  </body>
</html>
```

```javascript
define(['sum'], function (sum) {
  var values = [1, 2, 4, 5, 6, 7, 8, 9];
  var answer = sum(values);
  document.getElementById('answer').innerHTML = answer;
});
```

```javascript
define(['add', 'reduce'], function (add, reduce) {
  var sum = function (arr) {
    return reduce(arr, add);
  };
  return sum;
});
```

```javascript
define([], function () {
  var add = function (a, b) {
    return a + b;
  };

  return add;
});
```

```javascript
define([], function () {
  var reduce = function (arr, iteratee) {
    var index = 0,
      length = arr.length,
      memo = arr[index];
    index += 1;
    for (; index < length; index += 1) {
      memo = iteratee(memo, arr[index]);
    }
    return memo;
  };
  return reduce;
});
```

注意在 index.html 中只有一个 script 标签

```html
<script data-main="”main”" src="”require.js”"></script>
```

这个标签加载 require.js 库到页面，data-main 属性告诉 RequieJS 应用程序的入口点在
哪里。默认情况下，它假定所有文件都有 .js 文件扩展名，所以省略 .js 文件扩展名是可
以的。在 RequireJS 加载了 main.js 文件之后，就会加载该文件的依赖，以及依赖的依赖
，等等。浏览器加载 index.html，而 index.html 又加载 require.js 。剩下的文件及其
依赖都是由 require.js 负责加载。

RequireJS 和 AMD 解决了我们以前所遇到的所有问题。然而，它也带来了一些不那么严重
的问题。

AMD 的语法过于冗余。因为所有东西都封装在 define 函数中，所以我们的代码有一些额外
的缩进。对于一个小文件来说，这不是什么大问题，但是对于一个大型的代码库来说，这可
能是一种精神上的负担。数组中的依赖列表必须与函数的参数列表匹配。如果存在许多依赖
项，则很难维护依赖项的顺序。如果您的模块中有几十个依赖项，并且如果你不得不在中间
删除某个依赖，那么就很难找到匹配的模块和参数。

#### CommonJS

2009 年，有人讨论将 JavaScript 引入服务器端。因此 ServerJS 诞生了。随后，将其改
为 CommonJS 。CommonJS 模块格式是专门为 Node.js 运行时（在浏览器外运行的 JS 解释
器）而开发的。由于 Node 可以访问文件系统，CommonJS 格式被设计成在模块被导入后立
即从磁盘同步加载。 Node.js 解释器定义了一个全局的 require 函数，它、可以接受相对
路径、绝对路径或库名。然后，Node 会按照一个复杂的查找公式来查找与请求的路径/名称
相匹配的文件，如果找到了，就会立即读取并加载请求的文件。CommonJS 模块没有任何外
包装功能。解释器还定义了一个全局的 module.export 变量，模块通过赋值给该变量来定
义其导出值。

CommonJS 不是一个 JavaScript 库。它是一个标准化组织。它就像 ECMA 或 W3C 一样
。ECMA 定义了 JavaScript 的语言规范。W3C 定义了 JavaScript web API ，比如 DOM 或
DOM 事件。 CommonJS 的目标是为 web 服务器、桌面和命令行应用程序定义一套通用 的
API 。

CommonJS API 定义很多普通应用程序（主要指非浏览器的应用）使用的 API，从而填补了
这个空白。它的终极目标是提供一个类似 Python，Ruby 和 Java 标准库。这样的话，开发
者可以使用 CommonJS API 编写应用程序，然后这些应用可以运行在不同的 JavaScript 解
释器和不同的主机环境中。

CommonJS 还定义了模块 API 。因为在服务器应用程序中没有 HTML 页面和 `script` 标签
，所以为模块提供一些清晰的 API 是很有意义的。模块需要被公开(export)以供其它模块
使用，并且可以访问(import)。它的导出模块语法如下：

```javascript
// add.js
module.exports = function add(a, b) {
  return a + b;
};
```

上述代码定义和输出了一个模块。代码保存在 add.js 文件中。

要使用或导入 add 模块，您需要 require 函数，使用文件名或模块名作为参数。下面的语
法描述了如何将一个模块导入到代码中：

```javascript
// other.js

var add = require('./add');
```

如果您在 NodeJS 上编写了代码，那么这种语法可能看起来很熟悉。这是因为 NodeJS 实现
了 CommonJS 风格的模块 API。

#### Browserify

由于上述这些原因，有些人想要使用 CommonJS 语法来替换。但 CommonJS 语法是用于服务
端，并且是同步的，对吗？这时 Browserify 就来解救我们了！通过 Browserify ，你可以
在浏览器应用程序中使用 CommonJS 模块。Browserify 是一个 模块打包器(module
bundler) 。Browserify 遍历代码的依赖树，并将依赖树中的所有模块打包成一个文件。

不同于 RequireJS ，但是 Browserify 是一个命令行工具，需要 NodeJS 和 NPM 来安装它
。如果系统中安装了 NodeJS ，就可以用如下命令来安装 Browserify

```javascript
npm install -g browserify
```

让我们看一下我们用 CommonJS 语法编写的示例应用程序。

```javascript
<html>
  <head>
    <meta charset="UTF-8">
    <title>JS Modules</title>
  </head>
  <body>
    <h1>
      The Answer is
      <span id="answer"></span>
    </h1>
    <script src="bundle.js"></script>
  </body>
</html>
```

你可能已经注意到，在 index.html 文件中，script 标记加载了 bundle.js，但是
bundle.js 文件在哪里？一旦我们执行了如下命令，Browserify 就会为我们生成这个文件
：

```javascript
$ browserify main.js -o bundle.js
```

```javascript
var sum = require('./sum');
var values = [1, 2, 4, 5, 6, 7, 8, 9];
var answer = sum(values);
document.getElementById('answer').innerHTML = answer;
```

```javascript
var reduce = require('./reduce');
var add = require('./add');

module.exports = function (arr) {
  return reduce(arr, add);
};
```

```javascript
module.exports = function add(a, b) {
  return a + b;
};
```

```javascript
module.exports = function reduce(arr, iteratee) {
  var index = 0,
    length = arr.length,
    memo = arr[index];

  index += 1;
  for (; index < length; index += 1) {
    memo = iteratee(memo, arr[index]);
  }
  return memo;
};
```

Browserify 解析 main.js 中的 require() 函数调用，并遍历项目中的依赖树。然后将依
赖树打包到一个文件中。

Browserify 生成如下 bundle.js 文件的代码：

```javascript
function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o])
{var a=typeof require=="function"&&require;if(!u&&a)return
a(o,!0);if(i)return i(o,!0);
var f=new Error("Cannot find module '"+o+"'");
throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};
t[o][0].call(l.exports,function(e){var n=t[o][1][e];
return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}
var i=typeof require=="function"&&require;
for(var o=0;o<r.length;o++)s(r[o]);return s})

({1:[function(require,module,exports){
module.exports = function add(a,b){
return a + b;
};

},{}],2:[function(require,module,exports){
var sum = require('./sum');
var values = [ 1, 2, 4, 5, 6, 7, 8, 9 ];
var answer = sum(values)

document.getElementById("answer").innerHTML = answer;

},{"./sum":4}],3:[function(require,module,exports){
module.exports = function reduce(arr, iteratee) {
var index = 0,
length = arr.length,
memo = arr[index];

index += 1;
for(; index < length; index += 1){
memo = iteratee(memo, arr[index])
}
return memo;
};

},{}],4:[function(require,module,exports){
var reduce = require('./reduce');
var add = require('./add');

module.exports = function(arr){
return reduce(arr, add);
};

},{"./add":1,"./reduce":3}]},{},[2]);
```

不需要逐行地理解这个打包文件。但值得注意的是，所有熟悉的代码、main.js 文件和所有
依赖项都包含在这个文件中。

#### UMD – 通用模块定义

有些库需要能够在多种环境下使用同一个构建工件：浏览器中的普通全局 `<script>`标签
，浏览器中的 AMD 模块，或者 Node 下的 CommonJS 文件。社区发明了一个看起来很奇怪
的黑客技巧，通过特征检测功能，让一个模块在这三种环境下都能正常工作，这被称为通用
模块定义（UMD）格式。如今，这仍然被半通用地用作一些库的构建输出目标。

```javascript
// sum.umd.js
// UMD 风格编写的 sum 模块
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['add', 'reduce'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory(require('add'), require('reduce'));
  } else {
    // Browser globals (root is window)
    root.sum = factory(root.add, root.reduce);
  }
})(this, function (add, reduce) {
  // private methods

  //    exposed public methods
  return function (arr) {
    return reduce(arr, add);
  };
});
```

#### ES6 模块语法

ES2015 语言规范终于为 JS 语言增加了一个官方模块语法，现在被称为 ES 模块或
"ESM"。它提供了用于定义命名和默认导入和导出的语法。然而，由于浏览器和 Node.js 之
间的差异，该规范并没有定义模块究竟如何被解释器加载，也没有定义导入字符串指的是什
么，而是让不同的环境去想办法适当地加载模块。现代浏览器都已经实现了基于 URL 作为
导入字符串来加载 ES 模块。Node 由于依赖 CommonJS 模块作为默认格式，在确定前进的
道路上遇到的麻烦明显更多。从 Node 15 开始，Node 对加载 ES 模块有了一定的支持，但
在确定 CommonJS 和 ES 模块文件应该如何互操作方面仍然存在困难。

ES Modules 被设计成可以静态分析的。缺点是你不能做动态或有条件的导入--所有的导入
和导出必须在文件的顶层。

#### Webpack

Webpack 是一个 模块打包器(module bundler) 。就像 Browserify 一样，它会遍历依赖树
，然后将其打包到一到多个文件。那么问题来了，如果它和 Browserify 一样，为什么我们
需要另一个模块打包器呢？Webpack 可以处理 CommonJS 、 AMD 和 ES6 模块。并且
Webpack 还有更多的灵活性和一些很酷的功能特性，比如：

1. 代码分离：当您有多个应用程序共享相同的模块时。Webpack 可以将您的代码打包到两
   个或更多的文件中。例如，如果您有两个应用程序 app1 和 app2 ，并且都共享许多模
   块。 使用 Browserify ，你会有 app1.js 和 app2.js 。并且都包含所有依赖关系模块
   。但是使用 Webpack ，您可以创建 app1.js ，app2.js 和 shared-lib.js。是的，您
   必须从 html 页面加载 2 个文件。但是使用哈希文件名，浏览器缓存和 CDN ，可以减
   少初始加载时间。
2. 加载器：用自定义加载器，可以加载任何文件到源文件中。用 require() 语法，不仅仅
   可以加载 JavaScript 文件，还可以加载 CSS、CoffeeScript、Sass、Less、HTML 模板
   、图像，等等。
3. 插件：Webpack 插件可以在打包写入到打包文件之前对其进行操作。有很多社区创建的
   插件。例如，给打包代码添加注释，添加 Source map，将打包文件分离成块等等。

WebpackDevServer 是一个开发服务器，它可以在源代码改变被检测到时自动打包源代码，
并刷新浏览器。它通过提供代码的即时反馈，从而加快开发过程。

让我们来看看我们如何用 Webpack 来构建示例应用程序。Webpack 需要一点引导和配置。

因为 Webpack 是 JavaScript 命令行工具，所以需要先安装上 NodeJS 和 NPM 。装好 NPM
后，执行如下命令初始化项目：注意 add.js 和 reduce.js 是用 CommonJS 风格写的，而
sum.js 是用 AMD 风格写的。 Webpack 默认是可以处理 CommonJS 和 AMD。如果你用的是
ES6 模块，那就需要安装和配置 babel loader。

一旦你准备好所有的文件，你可以运行你的应用程序。打开浏览器，把 URL 指向
`http://localhost:8080`

此时，你可以打开你喜欢的编辑器编辑代码。保存文件时，浏览器会自动刷新以显示修改后
的结果。

这里你可能会注意到一件事情，就是找不到 dist/bundle.js 文件。这是因为 Webpack Dev
Server 会创建打包文件，但是不会写入到文件系统中，而是放在内存中。

如果要部署，就得创建打包文件。可以通过键入如下命令创建 bundle.js 文件：

因为 Webpack 是 JavaScript 命令行工具，所以需要先安装上 NodeJS 和 NPM 。装好 NPM
后，执行如下命令初始化项目：

```javascript
$ mkdir project; cd project
$ npm init -y
$ npm install -D webpack webpack-dev-server
```

需要一个 webpack 的配置文件。你的配置中至少需要 entry 和 output 两个字段。在
webpack.config.js 中保存以下内容。

```javascript
// webpack.config.js
module.exports = {
   entry: ‘./app/main.js’,
   output: {
       filename: ‘bundle.js’
   }
}
```

打开 package.json 文件，在 script 字段后添加如下行

```javascript
// package.json
"scripts": {
"start": "webpack-dev-server -progress -colors",
"build": "webpack"
},
```

现在在 project/app 目录下添加所有 JavaScript 模块，在 project 目录下添加
index.html。

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <title>JS Modules</title>
  </head>
  <body>
    <h1>
      The Answer is
      <span id="answer"></span>
    </h1>

    <script src="bundle.js"></script>
  </body>
</html>
```

```javascript
// webpack.config.js
module.exports = {
entry: './app/main.js',
output: {
path: './dist',
filename: 'bundle.js'
}
}
{% endcodeblock %}

{% codeblock package.json lang:json %}
{
"name": "jsmodules",
"version": "1.0.0",
"description": "",
"main": "main.js",
"scripts": {
"start": "webpack-dev-server --progress --colors",
"build": "webpack"
},
"keywords": [],
"author": "",
"license": "ISC",
"devDependencies": {
"webpack": "^1.12.14",
"webpack-dev-server": "^1.14.1"
}
}
```

```javascript
// app/add.js
module.exports = function add(a, b) {
  return a + b;
};
```

```javascript
// app/reduce.js
module.exports = function reduce(arr, iteratee) {
var index = 0,
length = arr.length,
memo = arr[index];

index += 1;
for(; index < length; index += 1){
memo = iteratee(memo, arr[index])
}
return memo;
};
{% endcodeblock %}

{% codeblock app/sum.js lang:javascript %}
define(['./reduce', './add'], function(reduce, add){
sum = function(arr){
return reduce(arr, add);
}

return sum;
});
```

```javascript
// app/main.js
var sum = require('./sum');
var values = [1, 2, 4, 5, 6, 7, 8, 9];
var answer = sum(values);

document.getElementById('answer').innerHTML = answer;
```

注意 add.js 和 reduce.js 是用 CommonJS 风格写的，而 sum.js 是用 AMD 风格写的。
Webpack 默认是可以处理 CommonJS 和 AMD。如果你用的是 ES6 模块，那就需要安装和配
置 babel loader。

一旦你准备好所有的文件，你可以运行你的应用程序。

```javascript
$ npm start
```

打开浏览器，把 URL 指向 http://localhost:8080

此时，你可以打开你喜欢的编辑器编辑代码。保存文件时，浏览器会自动刷新以显示修改后
的结果。

这里你可能会注意到一件事情，就是找不到 dist/bundle.js 文件。这是因为 Webpack Dev
Server 会创建打包文件，但是不会写入到文件系统中，而是放在内存中。

如果要部署，就得创建打包文件。可以通过键入如下命令创建 bundle.js 文件：

```javascript
$ npm run build
```

#### Rollup (2015 年 5 月)

Rollup 普及了 JavaScript 圈内一个重要的特性：Tree shaking，即是指消除 JavaScript
上下文中无用代码，或更精确地说，只保留有用的代码。它依赖于 ES6 模块 import /
export 模块系统的静态结构(static structure)来检测哪一个模块没有被使用，因为
，import 和 export 不会在运行时改变。说的再直白一点就是 Tree shaking 从模块包中
排除未使用的 exports 项。

webpack 2 内置引入的 Tree-shaking 代码优化技术。

将一个大的 JavaScript 库包含进来，只是为了用它几个函数，你是否有这样的经历
？Rollup 是另一个 JavaScript ES6 模块打包器。与 Browserify 和 Webpak 不同
，rollup 只包含在项目中用到的代码。如果有大模块，带有很多函数，但是你只是用到少
数几个，rollup 只会将需要的函数包含到打包文件中，从而显著减少打包文件大小。

注意，在 add 模块中，我引入了另一个函数 sub()。但是该函数在应用程序中并没有用到
。现在我们用 rollup 将这些代码打包：这里我们可以看到 sub() 函数并没有包含在这个
打包文件中。

#### Rollup (2015 年 5 月)

Rollup 普及了 JavaScript 圈内一个重要的特性：Tree shaking，即是指消除 JavaScript
上下文中无用代码，或更精确地说，只保留有用的代码。它依赖于 ES6 模块 import /
export 模块系统的静态结构(static structure)来检测哪一个模块没有被使用，因为
，import 和 export 不会在运行时改变。说的再直白一点就是 Tree shaking 从模块包中
排除未使用的 exports 项。

webpack 2 内置引入的 Tree-shaking 代码优化技术。

将一个大的 JavaScript 库包含进来，只是为了用它几个函数，你是否有这样的经历
？Rollup 是另一个 JavaScript ES6 模块打包器。与 Browserify 和 Webpak 不同
，rollup 只包含在项目中用到的代码。如果有大模块，带有很多函数，但是你只是用到少
数几个，rollup 只会将需要的函数包含到打包文件中，从而显著减少打包文件大小。

Rollup 可以被用作为命令行工具。如果有 NodeJS 和 NPM，那么就可以用如下命令安装
rollup：

```javascript
$ npm install -g rollup
```

Rollup 可以与任何类型的模块风格一起工作。但是，推荐使用 ES6 模块风格，这样就可以
利用 tree-shaking 功能。如下是用 ES6 编写的示例应用程序代码：

```javascript
// add.js
let add = (a,b) => a + b;
let sub = (a,b) => a - b;

export { add, sub };
{% endcodeblock %}

{% codeblock reduce.js lang:javascript %}
export default (arr, iteratee) => {
let index = 0,
length = arr.length,
memo = arr[index];

index += 1;
for(; index < length; index += 1){
memo = iteratee(memo, arr[index]);
}
return memo;
}
```

```javascript
// sum.js
import { add } from './add';
import reduce from './reduce';

export default (arr) => reduce(arr, add);
{% endcodeblock %}

{% codeblock main.js lang:javascript %}
import sum from "./sum";

var values = [ 1, 2, 4, 5, 6, 7, 8, 9 ];
var answer = sum(values);

document.getElementById("answer").innerHTML = answer;
```

注意，在 add 模块中，我引入了另一个函数 sub()。但是该函数在应用程序中并没有用到
。

现在我们用 rollup 将这些代码打包：

```javascript
$ rollup main.js -o bundle.js
```

```javascript
// bundle.js
let add = (a, b) => a + b;

var reduce = (arr, iteratee) => {
  let index = 0,
    length = arr.length,
    memo = arr[index];

  index += 1;
  for (; index < length; index += 1) {
    memo = iteratee(memo, arr[index]);
  }
  return memo;
};

var sum = arr => reduce(arr, add);

var values = [1, 2, 4, 5, 6, 7, 8, 9];
var answer = sum(values);

document.getElementById('answer').innerHTML = answer;
```

这里我们可以看到 sub() 函数并没有包含在这个打包文件中。

参考链接：

---

<!-- 4. [JavaScript 模块简史 – WEB 前端开发 - 专注前端开发，关注用户体验](http://www.css88.com/archives/7628) -->

1. [xuetengfei/js-modules-examples: Examples of JavaScript modules, module loaders, and bundlers.](https://github.com/xuetengfei/js-modules-examples)
1. https://mp.weixin.qq.com/s/ZogBhCFFYSZP1orsjiRvbA
