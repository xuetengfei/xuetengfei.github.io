# Provider 函数 & Context

> 一个 完整的 react 应用的是怎么结合 Store 的呢？

使用了 react-redux 后，react 组件怎么访问 store 呢 ？

react 是单向数据流，就像是一个瀑布，水流只能从上而下流动。所以，我们在`根组件`处
，设置瀑布源头提供水源，那么所有子孙组件，都可以获得水流。

所谓 Context ，就是“上下文环境”， 让一个树状组件上所有组件都能访问一个共同的对象
， 为了完成这个任务，需要上级组件和下级组件配合。首先，上级组件要宣称自己支持
context ，并且提供一个函数来返回代表 Context 对象。然后， 这个上级组件之下的所有
子孙组件， 只要宣称自己需要这个 context ，就可以 通过 this.context 访问到这个共
同的环境对象。

因为 Redux 应用中只有一个 Store ，因此所有组件如果要使用 Store 的话， 只能访问这
唯一的 Store 。 很自然， 希望顶层的组件来扮演这个 Context 提供者的角色， 只要顶
层 组件提供包含 store 的 context ，那就覆盖了整个应用的所有组件， 简单而且够用。

react-redux 提供了一个名叫 Provider 的一个 React 组件。这个组件存在的目的，就是
对应用的跟组件，进行一次包装，目的是提供 Context ，把 store 给全局使用。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/blm-redux-context.jpg" >

### Provider

```javascript
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';

const rootElement = document.getElementById('root');

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
);
```

### Provider 实现原理简要解析

```javascript
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store,
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object,
};
```

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// this.context.store 获取
export class Provider extends Component {
  // 需要声明静态属性 childContextTypes 来指定context对象的属性,是context的固定写法
  static childContextTypes = {
    store: PropTypes.object,
  };

  // 实现 getChildContext 方法,返回context对象,也是固定写法
  getChildContext() {
    return {
      store: this.store,
    };
  }

  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }

  // 渲染被 Provider 包裹的组件
  render() {
    return this.props.children;
  }
}
```
