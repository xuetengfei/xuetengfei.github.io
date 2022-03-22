# useEffect 处理副作用

在函数组件主体内（这里指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录
日志以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug
并破坏 UI 的一致性。`useEffect 为函数式组件带来执行副作用的能力`。该 Hook 接收一
个包含命令式、且可能有副作用代码的函数。

使用 useEffect 完成副作用操作。赋值给 useEffect 的函数会在组件渲染到屏幕`之后`执
行。默认情况下，effect 将在每轮渲染结束后执行，但你可以选择让它 在只有某些值改变
的时候 才执行。默认情况下，effect 会在每轮组件渲染完成后执行。这样的话，一旦
effect 的依赖发生变化，它就会被重新创建。

**useEffect**与**ClassComponents**中的 **componentDidMount**
，**componentDidUpdate** 和 **componentWillUnmount** 具有相同的用途，但是被统一
为一个 API。

## useEffect Purpose

通过这个 useEffect，React 知道开发者期望某个组件在每次 render 之后做些什么事情
。React 会记录下传给 useEffect 的这个方法，然后在进行了 DOM 更新之后调用这个方法
。

默认情况下，它会在**第一次 render** 和 **之后的每次 update **后运行。

## useEffect Syntax

```javascript
useEffect(
  () => {
    fn(); // run fn() when render、update === componentDidMount 、componentDidUpdate
    return () => {}; // do somthing === componentWillUnmount
  },
  [dependencies], // Only re-run the effect if dependencies's value had changed
);
```

useEffect 支持两个参数，第一个参数是一个函数，会在 render/update 之后执行，类似
于 componentDidMount 、componentDidUpdate。同时这个函数也可以返回一个函数，这个
函数会在**组件卸载后**执行，类似于类组件的 componentWillUnmount 生命周期函数。第
二个参数是数组，通过**跳过效果**优化性能。

```javascript
const [width, setWidth] = useState(window.innerWidth);
const handleResize = () => setWidth(window.innerWidth);

useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize); //  ①
  };
}, []);

// 空数组代表无论什么情况下该函数都不会发生改变
// 当这样页面组件卸载后，componentWillUnmount阶段 会执行 ① 行代码
```

## Case: 实时获取窗口的宽度

```javascript
import React, { useState, useEffect } from 'react';

function Width() {
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空数组代表无论什么情况下该函数都不会发生改变

  return <h1>窗口宽度{width}</h1>;
}
```

## Case:网络请求竞态

我先请求 {id: 10}，然后更新到{id: 20}，但{id: 20}的请求更先返回。请求更早但返回
更晚的情况会错误地覆盖状态值。

这被叫做竞态，这在混合了 async / await（假设在等待结果返回）和自顶向下数据流的代
码中非常典型（props 和 state 可能会在 async 函数调用过程中发生改变）。

Effects 并没有神奇地解决这个问题，尽管它会警告你如果你直接传了一个 async 函数给
effect。（我们会改善这个警告来更好地解释你可能会遇到的这些问题。）

如果你使用的异步方式支持取消，那太棒了。你可以直接在清除函数中取消异步请求。

或者，最简单的权宜之计是用一个布尔值来跟踪它：

![20220322-1eUn1D-Xnip2022-03-22_17-37-51](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220322-1eUn1D-Xnip2022-03-22_17-37-51.jpg)

## Case:跳过效果优化

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`; // ★  if count changes:run
    return () => {
      console.log('componentWillUnmount'); // ★  if count changes:run
    };
  }, [count]);

  useEffect(() => {
    return () => {
      console.log('log'); // ★ Only Run When this Page destroyed
    };
  }, []);

  return (
    <>
      <h1>click Count: {count}</h1>
      <button
        onClick={() => {
          setCount(c => c + 1);
        }}>
        Click Me!
      </button>
    </>
  );
}
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/code-sandbox-useEffect-1579243607.jpg'/>

```javascript
// 过去 componentDidUpdate 写法
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

```javascript
// 现在 hooks 写法
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```

## 模拟封装 componentDidMount

```javascript
function useMount(fn) {
  useEffect(fn, []);
}
```

## 模拟封装 componentDidUpdate

```javascript
function useUpdate(fn) {
  // useRef 创建一个引用
  const mounting = useRef(true);
  useEffect(() => {
    if (mounting.current) {
      mounting.current = false;
    } else {
      fn();
    }
  });
}
```

## Cleanup the fetch request

```js
function MyComponent() {
  useEffect(() => {
    // Side-effect logic...
    return () => {
      // Side-effect cleanup
    };
  }, []);

  // ...
}
```

```js
import { useState, useEffect } from 'react';

function Employees() {
  const [list, setList] = useState(null);

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      try {
        const response = await fetch('/employees/list', {
          signal: controller.signal,
        });
        setList(await response.json());
        controller = null;
      } catch (e) {
        // Handle fetch error
      }
    })();
    return () => controller?.abort();
  }, []);

  return (
    <div>
      {list === null ? 'Fetching employees...' : ''}
      {list?.map(name => (
        <div>{name}</div>
      ))}
    </div>
  );
}
```

## Web sockets

```js
import { useState } from 'react';

function MyComponent() {
  const [value, setValue] = useState();

  useEffect(() => {
    const socket = new WebSocket('wss://www.example.com/ws');
    socket.onmessage = event => {
      setValue(JSON.parse(event.data));
    };
    return () => socket.close();
  }, []);

  // ...
}
```

## Description

就像可以使用多个 useState 一样，`也可以使用多个 useEffect`。这会将不相关逻辑分离
到不同的 effect 中。Hook 允许我们按照代码的用途分离他们， 而不是像生命周期函数那
样。

`React 将按照 useEffect 声明的顺序依次调用组件中的每一个 useEffect。`

---

1. [How to fetch data with React Hooks](https://www.robinwieruch.de/react-hooks-fetch-data/)
