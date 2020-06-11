## 如何在 Vue.js 中使用第三方库

## 多种实现方式

1.挂载到 window 对象上。 2.在每个 vue 文件中引入。 3.挂载到 Vue 的原型对象上(最佳解)。

## 挂载到 Vue 的原型对象上

假设，我们需要使用`lodash`,一般而言, 可以按照下面的方式来给对象设置属性。

```javascript
// main.js 入口文件
import _ from 'lodash';
Vue.prototype._ = _;
```

可以这样写，但是在团队开发中，多人合作。在不熟悉他人的代码或者没有文档的时候，特别容易误操作或者起冲突。我们可以换一种写法。

```javascript
// main.js 入口文件
import _ from 'lodash';
Object.defineProperty(Vue.prototype, '$_', { value: _ });
```

`Object.defineProperty` 允许我们通过一个 `descriptor` 来定义属性. Descriptor 运行我们去设置对象属性的一些底层(low-level)细节, 如是否允许属性可写? 是否允许属性在 for 循环中被遍历.通常, 我们不会为此感到困扰, 因为大部分时候, 对于属性赋值, 我们不需要考虑这样的细节. 但这有一个明显的优点: 通过 descriptor 创建的属性默认是只读的.
此外, 试图给只读实例的方法重新赋值会得到 TypeError: Cannot assign to read only property 的错误.

由于所有的组件都会从 Vue 的原型对象上继承它们的方法, 因此在所有组件/实例中都可以通过 **`this.$_`**的方式访问 lodash 而不需要定义全局变量或者手动的引入.

```javascript
// ...
data() {
    return {
      arr: ["a", "b", "c", "d"]
    };
},
computed: {
   someValue() {
     return this.$_.head(this.arr); // a
  }
// ...
```

你还可能注意到, 在组件内是通过 this.SomelibraryName 的方式来使用第三方库的, 当你知道它是一个实例方法时就不会感到意外了. 但与全局变量不同, 通过 this 来使用第三方库时, 必须确保 this 处于正确的作用域. 在回调方法中 this 的作用域会有不同, 但箭头式回调风格能保证 this 的作用域是正确的.

## 进阶使用:封装为插件

如果你想在多个项目中使用同一个库, 或者想将其分享给其他人, 可以将其写成一个插件:
在应用的入口引入插件之后, 就可以在任何一个组件内像使用 Vue Router, Vuex 一样使用你定义的库了.

## 定义插件

```javascript
// PlugJs.js

import moment from 'moment';
import _ from 'lodash';

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, '$moment', { value: moment });
    Object.defineProperty(Vue.prototype, '$lodash', { value: _ });
  },
};
```

## 调用及引入

```javascript
// main.js 入口文件
import PlugJs from './components/PlugJs';
Vue.use(PlugJs);

new Vue({
  PlugJs,
  render: h => h(App),
}).$mount('##app');
```

## 使用插件

```javascript
// someComponent.vue
// ...
  created() {
    console.log("The time is ", this.$moment().format("HH:mm"));
    console.log(this.$lodash.head(["a", "b", "c", "d"]));
  },
// ...

// The time is  01:43
// a
```

## 参考链接

1. [[译]如何在 Vue.js 中使用第三方库 · Issue ##51 · dwqs/blog](https://github.com/dwqs/blog/issues/51)
