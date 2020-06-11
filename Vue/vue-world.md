## MVVM 数据绑定

MVVM 的本质是通过数据绑定链接 View 和 Model，让数据的变化自动映射为视图的更新。Vue.js 在数据绑定的 API 设计上借鉴了 Angular 的指令机制：用户可以通过具有特殊前缀的 HTML 属性来实现数据绑定，也可以使用常见的花括号模板插值，或是在表单元素上使用双向绑定：

```html
<!-- 指令 -->
<span v-text="msg"></span>
<!-- 插值 -->
<span>{{msg}}</span>
<!-- 双向绑定 -->
<input v-model="msg">
```

插值本质上也是指令，只是为了方便模板的书写。在模板的编译过程中，Vue.js 会为每一处需要动态更新的 DOM 节点创建一个指令对象。每当一个指令对象观测的数据变化时，它便会对所绑定的目标节点执行相应的 DOM 操作。基于指令的数据绑定使得具体的 DOM 操作都被合理地封装在指令定义中，业务代码只需要涉及模板和对数据状态的操作即可，这使得应用的开发效率和可维护性都大大提升。

## 最简单的使用

```html
<!-- 模板 -->
<div id="app">
    {{msg}}
</div>
```

```javascript
// 原生对象即数据
var data = {
  msg: 'hello!',
};
```

```javascript
// 创建一个 ViewModel 实例
var vm = new Vue({
  // 选择目标元素
  el: '#app',
  // 提供初始数据
  data: data,
});
```

```html
<!-- 渲染结果： -->
<div id="app">
    hello!
</div>
```

## 双向数据绑定

Vue.js 利用了 ES5 的 Object.defineProperty 方法，直接将原生数据对象的属性改造为 getter 和 setter，在这两个函数内部实现依赖的收集和触发，而且完美支持嵌套的对象结构。对于数组，则通过包裹数组的可变方法（比如 push）来监听数组的变化。这使得操作 Vue.js 的数据和操作原生对象几乎没有差别[注:在添加/删除属性，或是修改数组特定位置元素时，需要调用特定的函数，如 obj.$add(key, value)才能触发更新。这是受 ES5 的语言特性所限。]，数据操作的逻辑更为清晰流畅，和第三方数据同步方案的整合也更为方便。

## 单文件组件

尤雨溪在 Webpack 的 loader API 基础上开发了 vue-loader 插件，从而让我们可以用这样的单文件格式 (\*.vue) 来书写 Vue 组件：
[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html#%E4%BB%8B%E7%BB%8D)

---

1. [Vue.js：轻量高效的前端组件化方案-作者:尤雨溪](https://www.csdn.net/article/1970-01-01/2825439)
