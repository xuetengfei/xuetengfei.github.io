webpack 中可以写 commonjs 格式的 require 同步语法，可以写 AMD 格式的 require 回调语法，还有一个 require.ensure，以及 webpack 自己定义的 require.include，再加上 ES6 的 import 语法，这么多岂不是会把人给搞乱。本篇就来梳理一下这些 require 各自的特点，以及都在什么场景下使用。

## commonjs 同步语法

经典的 commonjs 同步语法如下：

```javascript
var a = require('./a');
a.show();
```

此时 webpack 会将 a.js 打包进引用它的文件中。这是最普遍的情形，不必赘述。

## commonjs 异步加载

在 commonjs 中有一个 [Modules/Async/A ](http://wiki.commonjs.org/wiki/Modules/Async/A)规范，里面定义了 require.ensure 语法。webpack 实现了它，作用是可以在打包的时候进行代码分片，并异步加载分片后的代码。用法如下：

```javascript
require.ensure([], function(require) {
  var list = require('./list');
  list.show();
});
```

此时 list.js 会被打包成一个单独的 chunk 文件，大概长这样：

```javascript
1.fb874860b35831bc96a8.js
```

可读性比较差。给它命名的方式，那就是给 require.ensure 传递第三个参数，如：

```javascript
require.ensure(
  [],
  function(require) {
    var list = require('./list');
    list.show();
  },
  'list',
);
```

这样就能得到你想要的文件名称：

```javascript
list.fb874860b35831bc96a8.js;
```

你也可以传入像`question/list`这样带层级的名字，这样 `webpack` 会按照层级给你创建文件夹。
需要注意的是，如果你在 require.ensure 的函数中引用了两个以上的模块，webpack 会把它们打包在一起，比如：

```javascript
require.ensure(
  [],
  function(require) {
    var list = require('./list');
    list.show();
    var edit = require('./edit');
    edit.display();
  },
  'list_and_edit',
);
```

`list.js`和`edit.js`将会被打包成一个文件，并命名为`list_and_edit.js`。这就需要根据你的实际情况来衡量了，如果你不希望打包在一起，只能写两个 `require.ensure` 分别引用这两个文件。

多说一句，这种思维其实我是很不喜欢的，在编码阶段却要对打包的事情做出决策，明显违背了职责分离原则。

## commonjs 预加载懒执行

在上面的用法中，我们给 `require.ensure` 的第一个参数传了空数组，实际上这里是可以接收模块名称的，作用就是实现预加载懒执行。用法如下：

```javascript
require.ensure(['./list'], function(require) {
  var list = require('./list');
  list.show();
});
```

给 `require.ensure` 的第一个参数传了`['./list']`，执行到这里的时候 `list.js` 会被浏览器下载下来，但是并不会执行 `list.js`模块中的代码，也就是 webpack 官网说的，不会进行 evaluate。真正进行 evaluate 的时候是到了后面这句 `var list = require('./list')`;这就是所谓的懒执行。

写在函数中的多个模块会被打包在一起，这一点和上面没有区别。另外，写在数组中的模块也会跟他们打包在一起，不管你有没有手动执行。

这种写法也是有点别扭的，像是 commonjs 和 AMD 的结合体，而且一个模块名称还要写两次，真是不够优雅。所以 webpack 自己定义了一个方法，能够实现预加载。

## webpack 自带的 require.include

require.include 是 webpack 自己提供的，是个小角色。它可以实现上面是预加载功能，而不用把模块写在数组中，用法如下：

```javascript
require.ensure([], function(require) {
  require.include('./list'); //此处只加载不执行
});
```

据 webpack 官网文档介绍，`require.include` 还有一个作用是能把子模块中的公共部分，提取到父模块中，比如 child1 和 child2 都引用了 list.js 这个模块，那么如果在 parent 中 include 了 list.js，那么子模块中的就会被删掉，相当于提升到了父模块中。（这里所谓的父子关系是指引用关系）

这个方法官方也是一笔带过，看来也是一个鸡肋的东西，用处不大。因为我发现 `require.include` 的返回值是 undefined，也就是说，如果你想使用模块，姿势是这样的：

```javascript
require.ensure(
  [],
  function(require) {
    require.include('./preview'); //加载
    let p = require('./preview'); //执行
    p.getUrl(); //使用
  },
  'pre',
);
```

## AMD 异步加载

webpack 既支持 commonjs 规范也支持 AMD 规范，这就意味着 AMD 的经典语法是可以正常使用的，如：

```javascript
require(['./list'], function(list) {
  list.show();
});
```

当然，这样写的话 list.js 也是被单独打包成一个文件的。与上面类似，如果你在这里写了多个模块，那么这些模块都会被打包成一个文件，如：

```javascript
require(['./list', './edit'], function(list, edit) {
  list.show();
  edit.display();
});
```

list.js 和 edit.js 会被打包在一起。不同的是，AMD 的方式无法传入第三个参数当文件名，所以得不到很好看的文件。

## 总结

以上把 require 的用法捋了一遍，明白了各自用法的区别之后，我们就可以在项目中进行选择了。我觉得最佳选择是往 commonjs 方向靠拢，想尝试 ES6 的话就用 import 代替 commonjs 同步语法即可。

因此，代码中保持以下两种风格就好：

```javascript
//可打包在一起的同步代码，使用import语法
import list from './list';

//需要独立打包、异步加载的代码，使用require.ensure
require.ensure([], function(require) {
  var list = require('./list');
});
```

很显然，你在写代码的时候还是需要对打包结果进行决策，这是我不喜欢 webpack 的原因。gulp 那样多好，编码就是编码，编译就是编译，分开来。不过这就是 webpack 以模块为核心的打包方式的特点吧，仁者见仁，只要团队内做一个约定，也不会打的一塌糊涂。
