使用命令模式，实现一个 createStore 方法

> 命令模式:封装功能，简化 API。封装功能，提供简单而高效的 API 是提高团队开发效率的可行方案。命令模式即是将分散化的小粒度功能整合成复杂的对象，并提供更简单而统一的 API 来管理并简化功能的使用。

```js
// 命令模式
const Commands = (() => {
  let Actions = {
    value: 1000,
    plus(number) {
      this.value += number;
      return this.value;
    },
    minus(number) {
      this.value -= number;
      return this.value;
    },
  };
  return {
    getValue: () => Actions.value,
    excute: ({ command, number }) => {
      Actions[command].call(Actions, number);
    },
  };
})();

Commands.excute({ command: 'plus', number: 10 });
Commands.excute({ command: 'plus', number: 30 });
Commands.excute({ command: 'minus', number: 15 });
console.log(Commands.getValue()); // 1025
```

正式编码

```js
// index.js
function createStore(fn) {
  let state = fn(undefined, { type: undefined });
  console.log('state: ', state);
  const observerList = [];
  return {
    getState: () => state,
    dispatch: action => {
      state = fn(state, action);
      observerList.forEach(eachObserver => eachObserver(state));
    },
    subscribe: observer => {
      observerList.push(observer);
      const unsubscribe = () => {
        observerList = observerList.filter(l => l !== observer);
      };
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
