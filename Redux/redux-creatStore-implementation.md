上一篇博客简单介绍了，store 的简单实现。这篇博客补充完成，附加上测试。
使用命令模式，实现一个 createStore 方法

1. [命令模式 - xuetengfei](/javascript/DesignPattern/Command-mode)

```js
// index.js
function createStore(fn) {
  let state = fn(undefined, { type: undefined });
  let observerList = [];
  return {
    getState: () => state,
    dispatch: action => {
      state = fn(state, action);
      observerList.forEach(eachObserver => eachObserver(state));
    },
    subscribe: observer => {
      observerList.push(observer);
      function unsubscribe() {
        observerList = observerList.filter(v => v !== observer);
      }
      return unsubscribe;
    },
  };
}

module.exports = {
  createStore,
};
```

```js
const { expect } = require('chai');
const { createStore } = require('./index');

describe('test createStore', function () {
  function counter(state = 0, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      default:
        return state;
    }
  }
  let store = createStore(counter);
  // store.subscribe(() => console.log(store.getState()));

  it('INCREMENT now state is equal 1', function () {
    store.dispatch({ type: 'INCREMENT' });
    expect(store.getState()).to.be.equal(1);
  });
  it('INCREMENT now state is equal 2', function () {
    store.dispatch({ type: 'INCREMENT' });
    expect(store.getState()).to.be.equal(2);
  });
  it('INCREMENT now state is equal 3', function () {
    store.dispatch({ type: 'INCREMENT' });
    expect(store.getState()).to.be.equal(3);
  });
  it('DECREMENT now state is equal 2', function () {
    store.dispatch({ type: 'DECREMENT' });
    expect(store.getState()).to.be.equal(2);
  });
  it('DECREMENT now state is equal 1', function () {
    store.dispatch({ type: 'DECREMENT' });
    expect(store.getState()).to.be.equal(1);
  });
  it('DECREMENT now state is equal 0', function () {
    store.dispatch({ type: 'DECREMENT' });
    expect(store.getState()).to.be.equal(0);
  });
});
```

单元测试 pass

```
➜  createStoreFn mocha index.test.js
state:  0


  test createStore
    ✓ INCREMENT now state is equal 1
    ✓ INCREMENT now state is equal 2
    ✓ INCREMENT now state is equal 3
    ✓ DECREMENT now state is equal 2
    ✓ DECREMENT now state is equal 1
    ✓ DECREMENT now state is equal 0


  6 passing (4ms)

```

```js
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);
let unsubscribeConsole = store.subscribe(_ => console.log(store.getState()));
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
unsubscribeConsole();
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });

// 1
// 2
```
