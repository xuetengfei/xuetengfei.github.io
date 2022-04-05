# 分割 Redux 模块

一个 Redux 模块包含 reducers、actions、action creators、state selectors 但是当我
们将 reducer 添加到 Redux store 时,Model 相关代码在一开始就会被加载进来，即使还
没有用到的。

## 运行时注册 Reducer

通过 [replaceReducer](https://redux.js.org/api/store#replaceReducer) 函数，我们
可以在访问相应的页面时再添加 Reducer 到 Redux store 中。
