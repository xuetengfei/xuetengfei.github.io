## vue-directives

#### 先看一下目录结构,文件放在什么位置

```javascript
// src

.
├── public
│   ├── directives
│   │   └── index.js              # 自定义指令文件
│   ├── filters
│   │   └── index.js
│   ├── plug
│   │   └── PlugJs.js
│   └── router
│       ├── dynamicImport.js
│       └── router.js
├── components
│   ├── Home
│   │   └── Home.vue
│   └── hello
│       └── HelloWorld.vue
├── App.vue                       # 根组件
└── main.js                       # 入口文件
```

#### 看一下这个文件,是怎么写的

```javascript
import Vue from 'vue';

Vue.directive('border', {
  bind(el) {
    el.style.border = '1px red solid';
  },
});

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  },
});
```

#### 怎么注册到全局

```javascript
import Vue from 'vue';
import App from './App.vue';
import './public/router/dynamicImport';
import PlugJs from './public/plug/PlugJs';
import * as GobalFilters from './public/filters/index';
import router from './public/router/router';

import './public/directives/index'; // 在这里直接引入就好了

Object.keys(GobalFilters).forEach(key => Vue.filter(key, GobalFilters[key]));

Vue.use(PlugJs);
Vue.config.productionTip = false;

new Vue({
  PlugJs,
  router,
  render: h => h(App),
}).$mount('#app');
```

#### 如何使用

```javascript
<template>
    <div>
        <input v-border v-focus type='text'>
        // 和vue本身的指令一样的使用就好了
    </div>
</template>

<script>
    export default {
        // ...
    };
</script>

<style scoped>

</style>
```

---

[自定义指令 — Vue.js](https://cn.vuejs.org/v2/guide/custom-directive.html)
