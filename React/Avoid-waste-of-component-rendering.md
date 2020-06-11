## shouldComponentUpdate()

```javascript
shouldComponentUpdate(nextProps, nextState);
```

当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。返回值默认为 true。首次渲染或使用 forceUpdate() 时不会调用该方法。

根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。

## React.PureComponent

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

React.PureComponent 与 React.Component 很相似。两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以`浅比较` prop 和 state 的方式来实现了该函数。

PureComponent 会对 props 和 state 进行浅层比较，并减少了跳过必要更新的可能性。

## React.memo

React.memo 为高阶组件。它与 React.PureComponent 非常相似，但它适用于函数组件，但不适用于 class 组件。

```javascript
import React from 'react';

function Counter({ inc, dec, count }) {
  console.log('Counter render');
  return (
    <>
      <div>
        <p>{count}</p>
      </div>
      <button onClick={inc}>INC</button>
      <button onClick={dec}>DEC</button>
    </>
  );
}

export default React.memo(Counter);
```

## useCallback

useCallback 用于防止子组件不必要的渲染

```javascript
useCallback(fn, deps);
```

[useCallback - xuetengfei](React/hooks-useCallback)

## useMemo

useMemo 用于避免组件内部不必要的计算

```javascript
useMemo(() => fn, deps);
```

[useMemo - xuetengfei](React/hooks-useMemo)

<!--
[Improve performance in React functional components using React.memo()](https://blog.bitsrc.io/improve-performance-in-react-functional-components-using-react-memo-b2e80c11e15a)
 -->
