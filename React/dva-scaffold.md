先安装 dva-cli 。

```
$ npm install dva-cli -g
$ dva new myapp
$ cd myapp
$ npm start
```

###### 1.有一次工作中，部分代码重构，就是拿不到 store 的数据。最后，发现 connect 忘记链接导入了。卧槽，怎么会犯这么低级的错误呢。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Bl-2018-07-24_151253.jpg"  data-action="zoom" style="margin:0 auto;" width="550px">

###### 2.在组件中 disptch 是哪里来的呢？

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Bl-2018-07-24_155537.png"  data-action="zoom" style="margin:0 auto;" width="550px">

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Bl-2018-07-24_155757.png"  data-action="zoom" style="margin:0 auto;" width="550px">

###### 3.connect 与 @connect

1. [react dva 的 connect 与 @connect ](http://www.cnblogs.com/CyLee/p/9308604.html)
1. [connect 方法](https://dvajs.com/guide/introduce-class.html#connect-%E6%96%B9%E6%B3%95)返
   回的也是一个 React 组件,最后导出。

```javascript
// connect
export default connect()(BasicLayout);
```

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Bl-2018-07-24_163218.png"  data-action="zoom" style="margin:0 auto;" width="550px">

@connect 其实只是 connect 的装饰器、语法糖罢了。改为这样（export 的不再是
connect，而是 class 组件本身。）也是可以执行的，但要注意@connect 必须放在 export
default class 前面.

```javascript
//  @connect
@connect()
export defalut Class ...
```

实际就是下图这样的。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Bl-2018-07-24_161819.jpg"  data-action="zoom" style="margin:0 auto;" width="550px">

###### 4.[dva 中数据的流向](https://dvajs.com/guide/concepts.html#%E6%95%B0%E6%8D%AE%E6%B5%81%E5%90%91)

###### 5.在 dva 中，connect Model 的组件通过 props 可以访问到 dispatch，可以调用 Model 中的 Reducer 或者 Effects，常见的形式如下。**如果在 model 外调用，需要添加 namespace**

```javascript
dispatch({
  type: 'user/add', // 如果在 model 外调用，需要添加 namespace
  payload: {}, // 需要传递的信息
});
```

###### 6.Route Components

在 dva 中，通常需要 connect Model 的组件都是 Route Components，组织
在**/routes/**目录下，而**/components/**目录下则是纯组件（Presentational
Components）。

1. [DvaJS 官网](https://dvajs.com/)
2. [知识地图 | DvaJS](https://dvajs.com/knowledgemap/#javascript-%E8%AF%AD%E8%A8%80)
3. [fetch documentation](https://github.github.io/fetch/)

<!--
4. [轻松学 dva | rails365 编程学院 - 关注 web 前端技术 - 前端免费视频教程](https://www.rails365.net/playlists/qing-song-xue-dva) -->
