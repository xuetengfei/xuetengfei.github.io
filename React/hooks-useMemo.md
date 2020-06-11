# useMemo

> useMemo 返回一个 memoized 值。

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。
useMemo 也允许跳过一次子节点的昂贵的重新渲染,用于避免组件内部不必要的计算

如果处理大量数据、复杂计算、耗时计算，`useMemo`是一个完美的 hook，因为它将在第一次渲染时完成一次工作，然后在其他每次渲染时返回缓存版本。

```javascript
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const childA = useMemo(() => <ChildA someProps={a} />, [a]);
  // Only re-rendered if `b` changes:
  const childB = useMemo(() => <ChildB someProps={b} />, [b]);
  return (
    <>
      {childA}
      {childB}
    </>
  );
}
// 当 `a/b` 改变时，`childA/childB` 才会重新渲染。
```

---

1. [xuetengfeiumi demo 页面](http://106.12.98.175/#/useMemo)
