[Redux-Saga](https://redux-saga-in-chinese.js.org/)

---

redux-saga 是一个 redux 中间件，它能访问完整的 redux state，也可以 dispatch redux action。是一个用于管理应用程序 Side Effect（副作用，例如异步获取数据，访问浏览器缓存等）的 library，它的目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易。

redux-saga 使用了 ES6 的 [Generator](Asynchronous/Generator.md) 功能，让异步的流程更易于读取，写入和测试。通过这样的方式，这些异步的流程看起来就像是标准同步的 Javascript 代码。

```
npm install --save redux-saga
// or
yarn add redux-saga
```

### App.js

```javascript
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import mySaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(mySaga);

// render the application
```

```js
import { call, put } from 'redux-saga/effects';

export function* fetchData(action) {
  try {
    const data = yield call(Api.fetchUser, action.payload.url);
    yield put({ type: 'FETCH_SUCCEEDED', data });
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error });
  }
}
```
