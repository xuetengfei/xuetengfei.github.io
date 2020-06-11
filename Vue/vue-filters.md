## 全局过滤器的定义和文件组织

[vue 全局过滤器官方文档](https://cn.vuejs.org/v2/api/#Vue-filter)

思路：抽出到独立文件，然后使用**Object.keys**在**main.js**入口统一注册，和之前在统一注册组件思路是一样的。

```javascript
./src
├── App.vue
├── comment
│   └── filters
│       └── index.js        // 1.在这里定义
├── components
│   └── HelloWorld.vue      // 3.在组件中正常使用
└── main.js                 // 2.在入口注入
```

```javascript
// .src/common/filters/index.js

export const dateServer = value =>
  value.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');

export const clip = v => v.slice(0, -2);
// ...
```

```javascript
// main.js

import Vue from 'vue'
import App from './App.vue'
+ import * as GobalFilters from "./comment/filters/index"
+ Object.keys(GobalFilters).forEach(key => Vue.filter(key, GobalFilters[key]))

Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
```

```diff
// HelloWorld.vue

<template>
+    <h1>{{time | dateServer}}</h1> <!--2910-01-02-->
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      time: "29100102"
    };
  },
};
</script>
```
