<!-- 一个关键问题：异步操作怎么办？

Action 发出以后，Reducer 立即算出 State，这叫做同步；
Action 发出以后，过一段时间再执行 Reducer，这就是异步。
怎么才能 Reducer 在异步操作结束后自动执行呢？
这就要用到新的工具：中间件（middleware）。 -->

# 中间件（middleware）

中间件就是添加新的功能。store.dispatch()这个步骤，可以添加功能。举例来说，要添加日志功能，把 Action 和 State 打印出来，可以对 store.dispatch 进行如下改造。

```javascript
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action);
  next(action);
  console.log('next state', store.getState());
};
```

使用 redux-logger 中间件

```javascript
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
const logger = createLogger();

const store = createStore(reducer, applyMiddleware(logger));
```

## applyMiddlewares

applyMiddlewares 它是 Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行。下面是它的源码。

```javascript
// applyMiddleware source code
export default function applyMiddleware(...middlewares) {
  return createStore => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer);
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: action => dispatch(action),
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return { ...store, dispatch };
  };
}
```

上面代码中，所有中间件被放进了一个数组 chain，然后嵌套执行，最后执行 store.dispatch。可以看到，中间件内部（middlewareAPI）可以拿到 getState 和 dispatch 这两个方法。

---

```javascript
const Redux = require('redux');
const { createStore, applyMiddleware } = Redux;

function middleware1(store) {
  return function(next) {
    return function(action) {
      console.log('A middleware1 开始');
      next(action);
      console.log('B middleware1 结束');
    };
  };
}

function middleware2(store) {
  return function(next) {
    return function(action) {
      console.log('C middleware2 开始');
      next(action);
      console.log('D middleware2 结束');
    };
  };
}

function middleware3(store) {
  return function(next) {
    return function(action) {
      console.log('E middleware3 开始');
      next(action);
      console.log('F middleware3 结束');
    };
  };
}

function reducer(state, action) {
  if (action.type === 'MIDDLEWARE_TEST') {
    console.log('======= G =======');
  }
  return {};
}

var store = createStore(
  reducer,
  applyMiddleware(middleware1, middleware2, middleware3),
);

store.dispatch({ type: 'MIDDLEWARE_TEST' });
```

console.log

```javascript
A middleware1 开始
C middleware2 开始
E middleware3 开始
======= G =======
F middleware3 结束
D middleware2 结束
B middleware1 结束
```

用户派发 action → action 传入 M1 副作用 → 打印 A → 执行 M1 的 next（这个 next 指向 M2 副作用）→ 打印 C → 执行 M2 的 next（这个 next 指向 M3 副作用）→ 打印 E → 执行 M3 的 next（这个 next 指向 store.dispatch）→ 执行完毕返回到 M3 副作用打印 F → 返回到 M2 打印 E → 返回到 M1 副作用打印 B -> dispatch 执行完毕。

## 洋葱模型的示意图

```javascript
            --------------------------------------
            |            middleware1              |
            |    ----------------------------     |
            |    |       middleware2         |    |
            |    |    -------------------    |    |
            |    |    |  middleware3    |    |    |
            |    |    |                 |    |    |
          next next next  ———————————   |    |    |
dispatch  —————————————> |  reducer  | — 收尾工作->|
nextState <————————————— |     G     |  |    |    |
            | A  | C  | E ——————————— F |  D |  B |
            |    |    |                 |    |    |
            |    |    -------------------    |    |
            |    ----------------------------     |
            --------------------------------------


顺序 A -> C -> E -> G -> F -> D -> B
    \---------------/   \----------/
            ↓                ↓
      更新 state 完毕      收尾工作
```

### Example: Custom Logger Middleware

```javascript
const Redux = require('redux');
const { createStore, applyMiddleware } = Redux;

function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action);
    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);
    console.log('state after dispatch', getState());
    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
}

function todos(state = [], action) {
  const { type, text } = action;
  switch (type) {
    case 'ADD_TODO':
      return state.concat([text]);
    default:
      return state;
  }
}

const store = createStore(todos, ['Use Redux'], applyMiddleware(logger));
console.log('init store: ', store.getState());

store.dispatch({
  type: 'ADD_TODO',
  text: 'Understand the middleware',
});

console.log('then store: ', store.getState());
```

```bash
➜ $ node middleware.js
init store:  [ 'Use Redux' ]
will dispatch { type: 'ADD_TODO', text: 'Understand the middleware' }
state after dispatch [ 'Use Redux', 'Understand the middleware' ]
then store:  [ 'Use Redux', 'Understand the middleware' ]
```

## Summary

中间件是动作调度之前的抽象层。是扩展 Redux 功能的方法。中间件没有被整合到 createStore 中，也不是 Redux 体系结构的基本部分，但是它足够有用，可以在核心中得到支持。通过这种方式，在生态系统中有一种单一的标准方法来扩展分派。中间件最常见的用例是支持异步操作。例如，redux-saga,redux-thunk。

1. [applyMiddleware · Redux](https://redux.js.org/api/applymiddleware)

<!--
  [图解 Redux 中 middleware 的洋葱模型 · Issue #14 · fi3ework/blog](https://github.com/fi3ework/blog/issues/14)
 -->
