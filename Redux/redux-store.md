# redux Store 是什么？

Store 就是用来维持应用所有的 state 树 的一个对象。 改变 store 内 state 的惟一途径是对它 dispatch 一个 action。
Store 不是类。它只是有几个方法的对象。 要创建它，只需要把根部的 reducer 函数 传递给 createStore。

<figure>
  <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/redux-store-1.jpg' width='700px'/>
  <figcaption>redux store</figcaption>
</figure>

首先，用户发出 Action。

```javascript
store.dispatch(action);
```

然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。

```javascript
let newState = todoApp(oldState, action);
```

添加一个变化监听器。每当 dispatch action 的时候就会执行，state 树中的一部分可能已经变化。你可以在回调函数里调用 getState() 来拿到当前 state。

```javascript
// 设置监听函数
store.subscribe(listener);
```

listener 可以通过 store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。

```javascript
function listerner() {
  let newState = store.getState();
  component.setState(newState);
}
```

subscribe 这是一个底层 API。多数情况下，不会直接使用它，会使用一些 React（或其它库）的绑定

## Store 方法

```javascript
import { createStore } from 'redux';
let store = createStore(reducer);

store.getState();
store.dispatch(action);
store.subscribe(listener);
store.replaceReducer(nextReducer);
```

## Store 的简单实现

```javascript
const createStore = reducer => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```

<!--

[Explain Redux like I'm five - DEV Community 👩‍💻👨‍💻](https://dev.to/hemanth/explain-redux-like-im-five)
 -->
