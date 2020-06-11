# useCallback

> useCallback 返回一个 memoized 回调函数。

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。

**useCallback(fn, deps)** 相当于 **useMemo(() => fn, deps)**

```javascript
function App() {
  return (
    <SomeComponent
      style={{ fontSize: 14 }}
      onClick={() => {
        console.log('Click happened');
      }}
    />
  );
}
```

这样写有什么坏处呢？一旦 App 组件的 props 或者状态改变了就会触发重渲染，即使跟 SomeComponent 组件不相关，由于每次 render 都会产生新的 style 和 doSomething，所以会导致 SomeComponent 重新渲染，倘若 SomeComponent 是一个大型的组件树，这样的 Virtual Dom 的比较显然是很浪费的，解决的办法也很简单，将参数抽离成变量。

```javascript
const fontSizeStyle = { fontSize: 14 };
const handleClick = () => {
  console.log('Click happened');
};
function App() {
  return <SomeComponent onClick={handleClick}>Click Me</SomeComponent>;
}
```

而有了 useCallback ，可以通过 useCallback 获得一个记忆后的函数。

```javascript
const memoizedHandleClick = useCallback(() => {
  console.log('Click happened');
}, []);
function App() {
  return <SomeComponent onClick={memoizedHandleClick}>Click Me</SomeComponent>;
}
```

第二个参数传入一个数组，数组中的每一项一旦值或者引用发生改变，useCallback 就会重新返回一个新的记忆函数提供给后面进行渲染。

这样只要子组件继承了 PureComponent 或者使用 React.memo 就可以有效避免不必要的 VDOM 渲染。

[Hooks API Reference – React](https://reactjs.org/docs/hooks-reference.html#usecallback)
