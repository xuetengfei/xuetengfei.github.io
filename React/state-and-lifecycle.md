## State

关于 `setState()`这里有三件事情需要知道

1. State 不要直接更新状态
2. 状态更新可能是异步的
3. 状态更新合并,是浅合并

#### 状态更新可能是异步的

React 可以将多个 setState() 调用合并成一个调用来提高性能。因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。

例如，此代码可能无法更新计数器：

```javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

要修复它，请使用第二种形式的 setState() 来接受一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

```javascript
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment,
}));
```

## 传入 setState 函数的第二个参数的作用是什么？

该函数会在 setState 函数调用完成并且组件开始重渲染的时候被调用，我们可以用该函数来监听渲染是否完成

## 调用 setState 之后发生了什么？

在代码中调用 setState 函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。

经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个 UI 界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

[State & 生命周期 - React](https://react.docschina.org/docs/state-and-lifecycle.html)
