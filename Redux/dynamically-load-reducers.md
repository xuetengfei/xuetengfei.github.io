这篇博客拖了好久。webpack 在做 Code Splitting 的时候，我们一般会按照路由拆分，对于一些大的组件进行更小的组件拆分，实现按需加载。那么，如何在 Redux 应用程序中动态加载 reducers 进行代码拆分？

核心思路是使用 store 本身 的「replaceReducer」，将新加的 reducer 聚合到原来的 store 后，生成一个新的 store，原来的快照数据，保持不变。

```
...
├── store
│   ├── index.js       // 核心: configureStore function
│   └── reducers
│       ├── index.js   // 核心: createReducer function
│       └── todos.js
...
```

reducers 文件夹的 index 文件作 reducer 的聚合，是使用 combineReducers 聚合盛一个 「root reducer」导出后，供 「 createStore 」消费，用来创建基础的「 store 」。现在，「reducers/index.js」将导出一个函数。

```js
// store/reducers/index.js
import { combineReducers } from 'redux';
import Todos from './todos';

export default function createReducer(asyncReducers) {
  return combineReducers({
    Todos,
    ...asyncReducers,
  });
}
```

```js
// store/index.js
import { createStore } from 'redux';
import createReducer from './reducers/index';

function configureStore(initialState) {
  const store = createStore(createReducer(), initialState);
  store.asyncReducers = {};
  return store;
}

const store = configureStore({});
export default store;

export function injectAsyncReducer(name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
```

在组件中，显式调用,如下代码所示。也可以在加载路由的时候，声明对应的 model 后，隐式调用。

```
...
├── DynamicallyLoadReducers
│   ├── index.js
│   └── model.js  // 可以声明一个namespace
···
```

```js
// DynamicallyLoadReducers/index.js

import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import store, { injectAsyncReducer } from '../../store/index';
import AAA, { namespace } from './model';

// or
useEffect(() => {
  injectAsyncReducer(namespace, AAA);
}, []);

//   ...
```

```js
// DynamicallyLoadReducers/model.js

const initialState = {
  lists: [],
  obj: {},
};

export const namespace = 'xxx';
export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/uPic/dynamically-load-reducers-shPaui.jpg' alt='dynamically-load-reducers-shPaui'/>

---

1. [Code Splitting | webpack](https://webpack.js.org/guides/code-splitting/)
2. [redux-react 官方演示代码未拆分 - CodeSandbox](https://codesandbox.io/s/9on71rvnyo?file=/src/redux/reducers/index.js)
3. [replaceReducer 在线演示 - xuetyengfei](https://code-sand-box.vercel.app/#/dynamically-load-reducers)
4. [源代码](https://github.com/xuetengfei/CodeSandBox/blob/dd18ce779575f344f7c4162cf4f86adf42f6bbd4/store/index.js#L4)
