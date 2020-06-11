<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200511201729%20react-hook-image.jpg' alt='20200511201729react-hook-image'/>

## Hook 简介

react 在新的 16.8.1 release 推出了新的 `hooks 函数`。其作用就是可以不用 class 组件就可以使用 react 的 state 、lifecycle 和其他功能。Hooks 只能在函数组件 (FunctionComponent) 中使用，赋予无实例无生命周期的函数组件以 class 组件的表达力并且更合理地拆分/组织代码，解决复用问题。

有了 hooks，再也不需要写 `Class` 了，所有组件都将是`Function`,不再需要面对`this`,生命周期钩子函数可以先丢一边了。
React Hooks 带来的好处不仅是 “更 FP，更新粒度更细，代码更清晰”，还有如下三个特性：1. 多个状态不会产生嵌套，写法还是平铺的 2. Hooks 可以引用其他 Hooks。3. 更容易将组件的 UI 与状态分离。

## Hook 动机

在组件之间复用状态逻辑很难， providers，consumers，高阶组件，render props 等可以将横切关注点 (如校验，日志，异常等) 与核心业务逻辑分离开，但是使用过程中也会带来扩展性限制，ref 传值问题，“嵌套地狱”等问题；Hook 提供一种简单直接的代码复用方式，可以使开发者在无需修改组件结构的情况下复用状态逻辑。

复杂组件生命周期常常包含一些不相关的逻辑，相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起；很多开发者将 React 与状态管理库结合使用，这往往会引入了很多抽象概念，开发过程中还需要在不同的文件之间来回切换；Hook 提供一种更合理的代码组织方式，可以将组件中相互关联的代码聚集在一起，而不是被生命周期方法强制拆开，使其更加可预测

---

1. [Hook 概览 - React 官网](https://react.docschina.org/docs/hooks-overview.html#-%E7%8A%B6%E6%80%81%E9%92%A9%E5%AD%90%EF%BC%88state-hook%EF%BC%89)
2. [Effect Hook - React 官网](https://react.docschina.org/docs/hooks-effect.html)

<!--

[useEffect 完整指南 — Overreacted](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

 -->
