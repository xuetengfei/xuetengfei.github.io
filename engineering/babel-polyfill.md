<!-- # react 在某些低版本安卓手机浏览器白屏解决办法 -->

# 什么是 babel-polyfill ？

babel 只负责语法转换，比如将 ES6 的语法转换成 ES5，对于 新的内置对象比如 Promise 或者 WeakMap, 静态方法比如 Array.from 或者 Object.assign, 实例方法比如 Array.prototype.includes 等其并不进行转换，所以，如果你使用了这些方法，在有些浏览器中就可能出现不支持的情况。为了解决这个不支持的问题，需要引入 babel-polyfill 来修复。

## 安装

```javascript
npm install --save @babel/polyfill
```

## 引入 babel-polyfill 来模拟实现这些对象、方法。

如果你在你的应用入口使用 ES6 的 import 语法，你需要在入口顶部通过 import 将 polyfill 引入，以确保它能够最先加载。添加 babel-polyfill 到你的文件入口，相当于为不支持的语法打一个补丁。 这样做虽然能解决问题，但是如果我在项目中只使用 Array.from 这一个语法，它也会将全部的 babel-polyfill 文件包引入，导致项目体积过大。

```javascript
import '@babel/polyfill';
// ...
```

## 按需加载'@babel/polyfill'

一次性引入了 ES6+的所有 polyfill, 打包后的 js 文件体积会偏大，对于现代的浏览器,有些不需要 polyfill。所以我们需要按需加载'@babel/polyfill'

#### 1、可以手动地来引入自己所需要的包

例如需要兼容 es6 所有的数组和 object 的语法，可以如下方式引入

```javascript
import 'core-js/es6/array';
import 'core-js/es6/object';
```

#### 2、 可以使用 babel7 来解决按需引入的问题。

在 babel7 的 babel-preset-env 中可以配置对哪些浏览器版本需要进行转换。

按需加载 babel-polyfill 的配置项是 `useBuiltIns`，其有 usage、entry 和 false 三个值，默认为 false。当指定为 useBuiltIns: usage 时，表示使用到的语法才会导入相关的 polyfill，这样就实现了 babel-polyfill 按需加载。 配置如下：

```javascript
const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
      },
      useBuiltIns: 'usage',
    },
  ],
];
```

---

3. [@babel/preset-env - usebuiltins](https://babel.docschina.org/docs/en/babel-preset-env#usebuiltins)
1. [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill)
1. [core-js](https://github.com/zloirock/core-js#commonjs)
