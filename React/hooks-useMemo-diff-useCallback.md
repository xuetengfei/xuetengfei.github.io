# diff of useCallback useMemo

```
useMemo  -> 用于帮助我们避免组件内部不必要的计算 Returns a value.

useCallback ->  用于防止子组件不必要的渲染 Returns a function.
```

useCallback 的功能完全可以由 useMemo 所取代，如果你想通过使用 useMemo 返回一个记忆函数也是完全可以的。

#### useCallback 的例子可以使用 useMemo 进行改写：

```javascript
//  useCallback
function App() {
  const memoizedHandleClick = useCallback(() => {
    console.log('Click happened');
  }, []); // 空数组代表无论什么情况下该函数都不会发生改变
  return <SomeComponent onClick={memoizedHandleClick}>Click Me</SomeComponent>;
}
```

```javascript
// useMemo
function App() {
  const memoizedHandleClick = useMemo(
    () => () => {
      console.log('Click happened');
    },
    [],
  ); // 空数组代表无论什么情况下该函数都不会发生改变
  return <SomeComponent onClick={memoizedHandleClick}>Click Me</SomeComponent>;
}
```

## 两者的主要区别

两者的主要区别在于“useCallback”返回 memoized 回调，“useMemo”返回 memoized 值，该值是函数参数的结果。

```javascript
useCallback(
  doSomething()
}, [dependencies])

useMemo(() => {
  doSomething()
}, [dependencies])

useEffect(() => {
  doSomething()
}, [dependencies])
```

所以 useCallback 常用记忆事件函数，生成记忆后的事件函数并传递给子组件使用。而 useMemo 更适合经过函数计算得到一个确定的值，比如记忆组件。

## 不同的使用场景

如果必须处理大量数据，“useMemo”是一个完美的钩子，因为它将在第一次渲染时完成一次工作，然后在其他每次渲染时返回缓存版本。

但是，useCallback 的用法不同。例如，经常重新渲染的父组件。在父组件内部，我们有一个子组件，它接受一个函数属性。在每次重新渲染时，子对象都将毫无用处地重新执行其函数 prop。但是，如果将“usecallback”作为带有依赖项数组的属性传递，它将解决此问题，因为只有在依赖项更改时才会执行函数。然后，每隔一次重新渲染都会得到一个缓存函数。

1. [how-to-usecallback - CodeSandbox](https://codesandbox.io/s/github/icyJoseph/how-to-useCallback)
2. [icyJoseph/how-to-useCallback: Understanding the correct usage and benefits of useCallback](https://github.com/icyJoseph/how-to-useCallback)
