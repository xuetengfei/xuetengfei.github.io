<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/think-redux1548398177.png'/>

Rematch 是没有 boilerplate 的 Redux 最佳实践。没有多余的 action types，action creators，switch 语句或者 thunks。

## 个人设计的最佳实践

## 文件组织结构

```javascript
├── redux
│   ├── call.js
│   ├── combineModules.js
│   ├── index.js
│   └── models
│       ├── Mycount.js
│       └── User.js

1 directory, 5 files
```

## combineModules

store 按照模块拆分后，在 combineModules.js 文件中统一导出。

```javascript
───────┬───────────────────────────────────────────────────────────────
       │ File: combineModules.js
───────┼───────────────────────────────────────────────────────────────
   1   │ export { default as Mycount } from './models/Mycount'
   2   │ export { default as User } from './models/User'
───────┴───────────────────────────────────────────────────────────────
```

## split store with namespace

```javascript
───────┬────────────────────────────────────────────────────────────────────
       │ File: index.js
───────┼────────────────────────────────────────────────────────────────────
   1   │ import { init } from '@rematch/core'
   2   │ import * as models from './combineModules'
   3   │ import logger from 'redux-logger'
   4   │
   5   │ console.log('models: ', models)
   6   │
   7   │ export default init({
   8   │   models,
   9   │   redux: {
  10   │     middlewares: [logger]
  11   │   }
  12   │ })
───────┴─────────────────────────────────────────────────────────────────────
```

## integration called functions

```javascript
───────┬─────────────────────────────────────────────────────────────────────────────
       │ File: call.js
───────┼─────────────────────────────────────────────────────────────────────────────
   1   │ import store from './index'
   2   │ import { connect } from 'react-redux'
   3   │ const { dispatch } = store
   4   │ export { dispatch, connect }
───────┴─────────────────────────────────────────────────────────────────────────────
```

### File: MyCount.js

```javascript
const asyncDelay = ms => new Promise(r => setTimeout(r, ms));

export default {
  // initial state
  state: {
    fuckNumber: 666,
  },
  // handle state changes with pure functions
  reducers: {
    increment(state, payload) {
      console.log('state: ', state);
      console.log('payload: ', payload);
      return { ...state, fuckNumber: state.fuckNumber + payload };
    },
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      await asyncDelay(3000);
      this.increment(payload);
    },
  },
};
```

### File: User.js

```javascript
export default {
  state: {
    name: 'xtf',
    friends: [],
  },
  reducers: {
    increment(state, payload) {
      return [...state, ...payload];
    },
  },
  effects: {},
};
```

### Use Store in Components

```javascript
import React from 'react';
import { dispatch, connect } from '../../redux/call';

const mapState = RootState => ({
  localCount: RootState.Mycount, // Mycount state form  `Mycount.js`
});

const Count = props => {
  const handleAdd = () => {
    dispatch.Mycount.increment(1);
  };

  const handleAddAsync = () => {
    dispatch.Mycount.incrementAsync(1);
  };

  return (
    <div className="c">
      <h3>
        Access `Count` from store:
        <b style={{ color: '#fa0' }}>{props.localCount.fuckNumber}</b>
      </h3>
      <button className="btn primary" onClick={handleAdd}>
        increment
      </button>
      <button className="btn" onClick={handleAddAsync}>
        incrementAsync
      </button>
    </div>
  );
};

const CountContainer = connect(mapState)(Count);

export default CountContainer;
```

---

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/rematch-code-1553788116.jpg'/>

1. [xuetengfeiumi -- demo code](http://106.12.98.175/#/rematch)
1. [Rematch Count Demo - CodeSandbox](https://codesandbox.io/s/3kpyz2nnz6)
1. [@rematch/core API - Rematch 实践指南](https://rematch.gitbook.io/handbook/api-wen-dang/rematch-core-api)
1. [Rematch: 重新设计 Redux-前端外刊评论](https://qianduan.group/posts/5a9df5120cf6b624d2239cc2)
