<!-- <img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/react-redux.png"  data-action="zoom"> -->

> react-redux 是什么？

前面的博客中，我简单介绍了 redux。为了方便在 React 项目中使用 Redux，Redux 的作者封装了一个 React 官方的、专用的库 [React Redux](https://react-redux.js.org/introduction/quick-start)。让 react 开发者更方便的使用 redux。

> react-redux 能做什么？

React Redux 让你的 react 组件可以从 Redux Store 中**subscribe data**以及**dispatch actions**。
**subscribe data: 获得 store 中数据;dispatch actions:更新 store 数据。**
React-Redux 虽然提供了便利，但是需要掌握额外的 API，并且要遵守它的组件拆分规范。

> 安装依赖库

```javascript
npm install --save redux react-redux
```

<!-- > 有一个现成的 store。一个 react 组件怎么从这个 store 获取数据呢？ -->

> 一个 完整的 react 应用的是怎么结合 Store 的呢？

首先，必须熟悉 react 本身。react 有 props 和 state. props 是父级分发下来的属性，state 是组件内部可以自行管理的状态。react 是单向数据流，就像是一个瀑布，水流只能从上而下流动。所以，我们在根组件处，设置瀑布源头提供水源，那么所有子孙组件，都可以获得水流。

<figure>
  <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/blm-redux-context.jpg' width='700px'/>
  <figcaption>context</figcaption>
</figure>

所谓 Context ，就是“上下文环境”， 让一个树状组件上所有组件都能访问一个共同的对象， 为了完成这个任务，需要上级组件和下级组件配合。首先，上级组件要宣称自己支持 context ，并且提供一个函数来返回代表 Context 对象。然后， 这个上级组件之下的所有子孙组件， 只要宣称自己需要这个 context ，就可以 通过 this.context 访问到这个共同的环境对象。

React Redux 提供 **Provider**组件, **Provider**组件包装在应用的根节点组件外，就相当于设置瀑布源头。那么，所以的组件都可以访问 store 了。

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
);
```

> 一个单一的 react 组件怎么订阅 store 的数据呢？

<!-- > connect -->

React Redux 提供一个 `connect function`,可以链接 component 和 store.
下面是代码演示。

```javascript
import { connect } from 'react-redux';
import { increment, decrement, reset } from './actionCreators';

// const Counter = ...

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = { increment, decrement, reset };

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

### Example: Todo App List

[Todo App with Redux - CodeSandbox](https://codesandbox.io/s/9on71rvnyo)

---

1. [Quick Start · React Redux](https://react-redux.js.org/introduction/quick-start)
