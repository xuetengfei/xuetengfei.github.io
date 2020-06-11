## 使用 webpack require.context 全局注入组件

## 实际问题

实际工作中，我们写了一堆基础 UI 组件，导入`vue`组件的过程如下,然后每次我们需要使用这些组件的时候，都得先 `import`，然后声明 `components`，很繁琐！秉持能偷懒就偷懒的原则，我们要想办法优化！

```javascript
// 1.先引人
import BaseButton from './baseButton';
```

```javascript
// 2.组件注册
export default {
  components: {
    BaseButton,
  },
};
```

```javascript
// 3.组件使用
<BaseButton @click="search"></BaseButton>
```

## 招式解析：

我们需要借助一下神器 `webpack`，使用 `require.context()` 方法来创建自己的（模块）上下文，从而实现自动`动态 require 组件`。这个方法需要 3 个参数：要搜索的文件夹目录，是否还应该搜索它的子目录，以及一个匹配文件的正则表达式。

我们在 components 文件夹添加一个叫 `$dynamicImport.js` 的文件，在这个文件里借助 `webpack` 动态将需要的基础组件统统打包进来。

目录结构如下

```
 ├──components
    ├──bindCard
        ├──bindCard.vue     # 最好不要使用 index.vue 这个名字,其实也可以,在组件内,定义好组件的`name`
    ├──login
        ├──login.vue
    └── $dynamicImport.js   # define here
```

```javascript
// $dynamicImport.js

import Vue from 'vue';

/**
 * 首字母大写
 * @param str 字符串
 * @example heheHaha
 * @return {string} HeheHaha
 */
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 对符合'xx/xx.vue'组件格式的组件取组件名
 * @param str fileName
 * @example abc/bcd/def/basicTable.vue
 * @return {string} BasicTable
 */
function validateFileName(str) {
  return (
    /^\S+\.vue$/.test(str) &&
    str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => capitalizeFirstLetter($1))
  );
}

const requireComponent = require.context('./', true, /\.vue$/);

// 找到组件文件夹下以.vue命名的文件，如果文件名为index，那么取组件中的name作为注册的组件名
requireComponent.keys().forEach(filePath => {
  const componentConfig = requireComponent(filePath);
  const fileName = validateFileName(filePath);
  const componentName =
    fileName.toLowerCase() === 'index'
      ? capitalizeFirstLetter(componentConfig.default.name)
      : fileName;
  Vue.component(componentName, componentConfig.default || componentConfig);
});
// 最后，我们在 main.js 中 import './components/$dynamicImport.js'
```

```javascript
// main.js

import Vue from 'vue';
// 动态引入所以子组件
import './components/$dynamicImport.js';
//引入组件
import App from './App.vue';
// ...
new Vue({
  el: '#app',
  router,
  store,
  render: function(createElement) {
    return createElement(App);
  },
});
```

## 查看效果

注释掉`import`和`components`,也可以直接使用子组件，名字就是文件名。其实，做了文件名首字母大写的转换，但是我发现大小写无所谓，打开谷歌浏览器控制台的 vue 插件，两个组件是同名，而且都是首字母大写，这是 vue 的内部实现吧，浅尝辄止了，没有深入了解。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Bl-2018-07-11_185548.png"  data-action="zoom" style="margin:0 auto;" width="550px">

## 对于 index.vue 解析

对于类似于`components/share/index.vue`这类组件，它的名字叫做**index**。
那么，我们就要在它自己的内部定义好组件的名词。例如。

```diff
<template>
// ...
</template>
<script>
export default {
+  name: "some-component"
};
</script>
```

在其他组件中就可以直接使用`<Some-component/>`注意首字母大写哦。

## 后续:坑

动态加载路由函数里面的这一句

```javascript
const requireComponent = require.context('./', true, /\.vue$/);
```

`require.context`来源于`webpack`。使用 require.context() 方法来创建自己的（模块）上下文，从而实现自动动态 require 组件。这个方法需要 3 个参数：1.要搜索的文件夹目录 2.是否还应该搜索它的子目录 3.以及一个匹配文件的正则表达式。

这个文件的存放位置决定了`第一个参数的路径写法`。

```javascript
src
├── App.vue
├── comment
│   ├── filters
│   │   └── index.js
│   ├── plug
│   │   └── PlugJs.js
│   └── router                   ← ← ←
│       └── dynamicImport.js     ← ← ←
├── components                   ← ← ←
│   └── hello                    ← ← ←
│       └── HelloWorld.vue       ← ← ←
└── main.js
```

那么,这句应该改写为如下

```javascript
const requireComponent = require.context('../../components/', true, /\.vue$/);
```

<!-- 我们在 components 文件夹添加一个叫 global.js 的文件，在这个文件里借助 webpack 动态将需要的基础组件统统打包进来 -->

---

1. [require.context ](https://juejin.im/post/5ab8bcdb6fb9a028b77acdbd)
2. [Vue.js 最佳实践（五招让你成为 Vue.js 大师](https://segmentfault.com/a/1190000014085613#articleHeader4)
3. [webpack - require.context](https://juejin.im/post/5ab8bcdb6fb9a028b77acdbd)
