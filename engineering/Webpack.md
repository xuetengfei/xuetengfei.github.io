## webpack 诞生背景

前端技术蓬勃发展，针对前端项目越来越强的模块化开发需求，社区出现了 AMD, CommonJS, ES2015 import 等等方案。遗憾的是，这些方案大多并不直接被浏览器支持，往往伴随这些方案而生的还有另外一些，让这些新技术应用于浏览器的方案。前端工程化，在前端模块化解决方案的过程中 webpack 中流砥柱作用。

## 依赖关系

在早期，我们通过按特定顺序包含文件来组织管理 Javascript 依赖项：

```javascript
<script src="jquery.min.js"></script>
<script src="jquery.some.plugin.js"></script>
<script src="main.js"></script>
```

## Webpack 实际上做了什么？

什么是 Webpack？ WebPack 是模块打包机。它做的事情是，分析项目结构，找到 JavaScript 模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript 等），并将其转换和打包为合适的格式供浏览器使用。如果不去考究细节，大可把 webpack 简化理解为一个函数，配置文件则是其参数，传入合理的参数后，运行函数就能得到我们想要的结果。

```javascript
module.exports = {
  entry: {},
  output: {},
  module: {
    rules: [],
  },
  devServer: {},
};
```

<!-- ## Loaders

Loaders 是 webpack 提供的最强大的功能之一。通过使用不同的 loader，webpack 有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换 scss 为 css，或者把下一代的 JS 文件（ES6，ES7)转换为现代浏览器兼容的 JS 文件，对 React 的开发而言，合适的 Loaders 可以把 React 的中用到的 JSX 文件转换为 JS 文件。

```javascript
module.exports = {
  entry: __dirname + '/app/main.js', //已多次提及的唯一入口文件
  output: {
    path: __dirname + '/public', //打包后的文件存放的地方
    filename: 'bundle.js', //打包后输出文件的文件名
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './public', //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true, //实时刷新
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};
```

```javascript
module.exports = {
  entry: __dirname + '/app/main.js', //已多次提及的唯一入口文件
  output: {
    path: __dirname + '/public', //打包后的文件存放的地方
    filename: 'bundle.js', //打包后输出文件的文件名
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './public', //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true, //实时刷新
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};
```
-->

## 简要分析 webpack 打包后代码

```javascript
/* webpack.config.js */
module.exports = {
  entry: './chunk1.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
};
/* chunk1.js */
const chunk1 = 1;
exports.chunk1 = chunk1;

/* bundle.js:立即执行函数 */
(function(modules) {
  // 模拟 require 语句
  function __webpack_require__() {}
  // 执行存放所有模块数组中的第0个模块
  __webpack_require__(0);
})([
  /*存放所有模块的数组*/
]);
```

## Webpack 4 : from 0 Conf to Production Mode!

零配置的概念主要体现在 3 个方面：

1. 默认的入口./src/index.js
2. 默认的出口./dist/main.js
3. 开发生产环境配置文件二合一

?> webpack 4 中使用 loaders 仍需要 webpack.config.js

```
npm init -y
npm i webpack --save-dev
npm i webpack-cli --save-dev
```

```javascript
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production",
}
```

```javascript
npm run dev
npm i babel-core babel-loader babel-preset-env --save-dev
```

项目跟目录下新建.babelrc

```javascript
// .babelrc
{
    "presets": [
        "env"
    ]
}
```

### webpack plugin

```javascript
npm i webpack-dev-server html-webpack-plugin  clean-webpack-plugin -D
```

### 公共代码抽取

CommonsChunkPlugin 已弃用，使用 optimization.splitChunks 代替, 无需安装，内置.

### UglifyJs

## webapck4 目前已经支持压缩 ES6+的代码。

<!--

4. [webpack4：完全解析](https://www.cnblogs.com/wmhuang/p/8967639.html)


1. [Webpack 4 Tutorial: from 0 Conf to Production Mode (Updated)](https://www.valentinog.com/blog/webpack-tutorial/)

1. [从入门到工程实践](https://mp.weixin.qq.com/s?__biz=MzIyMjYyMzg3MA==&mid=2247484408&idx=1&sn=c1075bd26187b0de4d32aed867f5210b&chksm=e82be2e9df5c6bff466200fcd503e5739df79ea7d020ee3b37173eaeb4dd4e8a4ec58b3ed77a)

1. [Webpack4+ 多入口程序构建 - 掘金](https://juejin.im/post/5af3a6cbf265da0ba266ff25)

1. [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)

xxx. [入门 Webpack](https://www.jianshu.com/p/42e11515c10f)

[深入浅出 Webpack](https://webpack.wuhaolin.cn/)
https://github.com/Pines-Cheng/blog/issues/45

 -->
