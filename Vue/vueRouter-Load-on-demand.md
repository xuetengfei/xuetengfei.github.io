## 路由组件按需加载

```javascript
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      /*
      *  按需加载 
       */
      component: resolve => {
        require(['../components/Home'], resolve);
      },
    },
    {
      path: '/record',
      name: 'record',
      component: resolve => {
        require(['../components/Record'], resolve);
      },
    },
    {
      path: '/Register',
      name: 'Register',
      component: resolve => {
        require(['../components/Register'], resolve);
      },
    },
    {
      path: '/Luck',
      name: 'Luck',
      // 需要登录才能进入的页面可以增加一个meta属性
      meta: {
        requireAuth: true,
      },
      component: resolve => {
        require(['../components/luck28/Luck'], resolve);
      },
    },
  ],
});
//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 判断是否需要登录权限
    if (localStorage.getItem('username')) {
      // 判断是否登录
      next();
    } else {
      // 没登录则跳转到登录界面
      next({
        path: '/Register',
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
```

1. [Vue 路由的懒加载和组件的按需加载方法 - bainchengemeda - 博客园](https://www.cnblogs.com/Marinnn/p/9358383.html)
2. [路由懒加载 | Vue Router](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97)
