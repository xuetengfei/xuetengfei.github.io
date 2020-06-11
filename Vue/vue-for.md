v-for

#### 1.v-for 渲染 class 和路由地址

```diff
// product.vue
// v-for 结构

<ul>
+   <li v-for="x in menulist" :key="x.name">
        <div class="title-tab-item">
+         <i :class='x.icon'></i>
+         <router-link :to="{name:x.pathName}">{{x.name}}</router-link>
-         <router-link  to="/foo/bar">Go to Bar</router-link>
        </div>
    </li>
</ul>
```

```javascript
// data.js
// 渲染的数据数组

export const productmodoles = [
  {
    icon: 'iconfont icon-dataCenter',
    pathName: 'product-dataCenter',
    name: '数据中心',
  },
  {
    icon: 'iconfont icon-crm',
    pathName: 'product-crm',
    name: '进销存管理',
  },
  {
    icon: 'iconfont icon-cloudDisk',
    pathName: 'product-cloudDisk',
    name: '企业云盘',
  },
];
```

注意

```javascript
<router-link :to="{name:x.pathName}">{{x.name}}</router-link>
```

`v-for`渲染`router-link`的时候，需要注意`路由`需要提前存在，就是说，一定要先写好路由配置。
`router-link`也可以写入`path`(line-9) ，但是我们最好是写入`name`，降低耦合。

---

#### 2.v-for 的`v-for="(x,index) in lists`中 index 用法

很简单的需求，我们现在需要有一组 5 个 li，点击事件是改变 li 背景色，怎么做？

传统的做法是*事件代理(事件委托)*，我们一般把事件绑定到 ul 上面，利用事件的冒泡原理来实现的。现在渲染一组 li，我们在 li 上添加`@click=“handler()”`,这样循环出来的 li 每一个都有绑定这个`@click=“handler()”`事件。我们需要利用这个传入的 index 来判断当前点击是那一个 li。

<img src="/images/vue/for/1.jpg"  data-action="zoom"  style="margin:0 auto">
<img src="/images/vue/for/2.png"  data-action="zoom" width="600px" style="margin:0 auto">

#### 3.v-for 的`v-for="(x,index) in lists`中 index,渲染 active class

```javascript
<ul class="title-tab clearfix" id="tab" ref="ulmenu">
    <li v-for="(x,index) in menulist" :key="x.name"
    :class="{active:currentIndex==index}">
    </li>
</ul>
```

```javascript
export default {
  name: 'product-page',
  components: {
    // ...
  },
  data() {
    return {
      // ...
      currentIndex: 0,
    };
  },
};
```

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Jietu20180416-235324@2x.jpg?imageMogr2/thumbnail/!100p"  data-action="zoom">

---

参考链接：

---

1. [开始 · vue-router](https://router.vuejs.org/zh-cn/essentials/getting-started.html)
