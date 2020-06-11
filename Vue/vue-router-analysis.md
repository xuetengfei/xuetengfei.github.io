## vue-router 源码：前端路由

在学习 vue-router 的代码之前，先来简单了解一下前端路由。

前端路由主要有两种实现方法：

1. Hash 路由
2. History 路由

先来看看这两种方法的实现原理，原理都是修改 url 的同时不刷新页面，不向服务器发送请求，通过监听特殊的事件来更新页面。

## Hash 路由

`url`的`hash`是以`#`开头，原本是用来作为锚点，从而定位到页面的特定区域。当 hash 改变时，页面不会因此刷新，浏览器也不会向服务器发送请求。

```javascript
http://www.xxx.com/#/home
```

同时，`hash`改变时，并会触发相应的 `hashchange`事件。所以，hash 很适合被用来做前端路由。当 `hash` 路由发生了跳转，便会触发 `hashchange`回调，回调里可以实现页面更新的操作，从而达到跳转页面的效果。

```javascript
window.addEventListener('hashchange', function() {
  console.log('render');
});
```

## History 路由

HTML5 规范中提供了 `history.pushState` 和 `history.replaceState` 来进行路由控制。通过这两个方法，可以实现改变 url 且不向服务器发送请求。同时不会像 `hash` 有一个 `#`，更加的美观。但是 History 路由`需要服务器的支持`，并且需将所有的路由重定向到根页面。

History 路由的改变不会去触发某个事件，所以我们需要去考虑如何触发路由更新后的回调。

有以下两种方式会改变 url：

调用 history.pushState 或 history.replaceState；
点击浏览器的前进与后退。
第一个方式可以封装一个方法，在调用 pushState（replaceState）后再调用回调。

```javascript
function push(url) {
  window.history.pushState({}, null, url);
  handleHref();
}

function handleHref() {
  console.log('render');
}
```

第二个方式，浏览器的前进与后退会触发 popstate 事件。

```javascript
window.addEventListener('popstate', handleHref);
```

## Hash 路由实现

`Hash` 路由`<a>`标签都需要带上`#`：

```javascript
<div>
  <a href="#/">home</a>
  <a href="#/book">book</a>
  <a href="#/movie">movie</a>

  <div id="content" />
</div>
```

`Router` 的代码实现如下：

```javascript
class Router {
  constructor(options) {
    this.routes = {};

    this.init();

    // 遍历，绑定视图更新
    options.forEach(item => {
      this.route(item.path, () => {
        document.getElementById('content').innerHTML = item.component;
      });
    });
  }

  // 绑定监听事件
  init() {
    window.addEventListener('load', this.updateView.bind(this), false);
    window.addEventListener('hashchange', this.updateView.bind(this), false);
  }

  // 更新试图
  updateView() {
    const currentUrl = window.location.hash.slice(1) || '/';
    this.routes[currentUrl] && this.routes[currentUrl]();
  }

  // 将路由与回调函数关联
  route(path, cb) {
    this.routes[path] = cb;
  }
}
```

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/vue-router-hash-Realization.gif"  width="550px">

## History 路由实现

History 路由实现和上面差不多，需要服务器的支持,具体看[code-analysis](https://github.com/cobish/code-analysis/blob/master/vue-router/history/index.js).

---

1. [vue-router 源码：前端路由 · Issue #15 · cobish/code-analysis](https://github.com/cobish/code-analysis/issues/15)
2. [Vue 中的路由：分页获取数据以及路由更新 - 前端 - 掘金](https://juejin.im/entry/59ba71f76fb9a00a6974d86b)
