?>vue -- 使用mixins复用逻辑

现有项目页面，parent.vue 包含两个 Echart 图表子组件 ChartA.vue ChartB.vue.
<!--more-->
页面使用场景，parent.vue 在浏览器resize的时候我们希望图表也进行resize，因此我们会在父容器组件中写两个子组件相应resize的状态管理函数。这样的话，过于耦合。


首先，这两个子组件图表逻辑上基本完全一样，我们使用 vue 的 [mixins混合](https://cn.vuejs.org/v2/guide/mixins.html#%E5%9F%BA%E7%A1%80)。

mixins 的使用方式

定义相同的逻辑为js文件

```javascript 
// mixin.js

import Echarts from 'echarts'
import _ from 'lodash'
export default {
  computed: { // ...},
  methods: { // ... },
  mounted() { // ... },
  destroyed() { // ...}
}

```
引入使用 js
```diff  
<script type='text/javascript'>
import ChartMixin from './mixin'
export default {
+  mixins: [ChartMixin],
  data() {
    return {
      thisDomId: 'consume-analy-chart-wrapper'
    }
  }
}
</script>
```

-------

完整mixin.js代码
```javascript
// mixin.js
import Echarts from 'echarts'
import _ from 'lodash'

export default {
  computed: {
    /* 图表DOM */
    chartWrapperDom() {
      const dom = document.getElementById(this.thisDomId)
      return dom && Echarts.init(dom)
    },
    
  /** 图表resize节流，这里使用了lodash，也可以自己使用setTimout实现节流 */
    chartResize() {
      return _.throttle(() => this.chartWrapperDom.resize(), 400)
    }
  },
  
  methods: {
    /* 图表初始化 */
    initChart() {
      this.chartWrapperDom.setOption({ /* options */ }
  },
  
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.chartResize)
  },
  
  destroyed() {
    window.removeEventListener('resize', this.chartResize)
  }
}

```


