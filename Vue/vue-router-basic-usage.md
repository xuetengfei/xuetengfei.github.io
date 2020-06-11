## vue Router 基础用法

```javascript
import Vue from 'vue';
import Router from 'vue-router';

const routes = [
  {
    path: '/home',
    component: resolve => {
      require(['../../components/Home/Home.vue'], resolve);
    },
  },
];

Vue.use(Router);
const router = new Router({
  routes,
});

export default router;
```

```javascript
import Vue from 'vue';
import App from './App.vue';

// 引入路由
import router from './router.js';
// import router 的router 一定要小写， 不要写成Router, 否则报 can't match的报错

new Vue({
  el: '#app',
  router, // 注入到根实例中
  render: h => h(App),
});
```

1. [Vue Router 入门 – F2EX](http://f2ex.cn/getting-started-with-vue-router/)
2. [vue-router 基本使用](https://www.cnblogs.com/SamWeb/p/6610733.html)
