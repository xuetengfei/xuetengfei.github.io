总结一下前端异常错误: 1.JS 语法错误、代码异常 2.AJAX 请求异常 3.静态资源加载异常 4.Promise 异常 5.Iframe 异常 6.跨域 Script error7.崩溃和卡顿

### window.onerror

onerror 可以捕获到运行时的同步/异步错误,语法错误，静态资源异常，接口异常错误都无法捕获到。

```javascript
window.onerror = function(message, source, lineno, colno, error) {
  // message：错误信息（字符串）。
  // source：发生错误的脚本URL（字符串）
  // lineno：发生错误的行号（数字）
  // colno：发生错误的列号（数字）
  // error：Error对象（对象）
  console.log({ message, source, lineno, colno, error });
  return true; // Prevent error output on the console: Uncaught Error: xxxxx
};
console.log(object);
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/window.onerror-1557910745.jpg' width='600px'/>

---

### window.addEventListener

```javascript
window.addEventListener(
  'error',
  error => {
    console.log(error);
  },
  true,
);
```

当一项资源加载失败，加载资源的元素会触发一个 Event 接口的 error 事件，并执行该元素上的 onerror() 处理函数。这些 error 事件不会向上冒泡到 window ，能被单一的 window.addEventListener 捕获。

### Try-Catch

try-catch 只能捕获到同步的运行时错误，其他类型无法捕获(语法错误、异步错误)

```javascript
try {
  // ...
} catch (error) {
  console.log(error);
}
```

### Promise Catch

在 promise 中使用 catch 可以非常方便的捕获到异步 error 。
没有写 catch 的 Promise 中抛出的错误无法被 onerror 或 try-catch 捕获到，所以我们务必要在 Promise 中不要忘记写 catch 处理抛出的异常。为了防止有漏掉的 Promise 异常，建议在全局增加一个对 `unhandledrejection` 的监听，用来全局监听 `Uncaught Promise Error`。

```javascript
window.addEventListener('unhandledrejection', event => {
  event.preventDefault(); // Prevent error output on the console:
  console.log('Reason: ' + event.reason);
});
window.addEventListener('rejectionhandled', event => {
  console.log('REJECTIONHANDLED');
});

Promise.reject('test');
// Reason: test
// REJECTIONHANDLED
```

### VUE errorHandler

```javascript
Vue.config.errorHandler = (err, vm, info) => {
  console.error('通过vue errorHandler捕获的错误');
  console.error(err);
  console.error(vm);
  console.error(info);
};
```

### React errorHandler: componentDidCatch

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

<ErrorBoundary>
  <APP />
</ErrorBoundary>;
```

`componentDidCatch()`方法像 JS 的 `catch{}`模块一样工作，但是对于组件，只有 class 类型的组件(class component )可以成为一个 error boundaries 。

实际上，大多数情况下我们可以在整个程序中定义一个 error boundary 组件，之后就可以一直使用它了！

## 采用组合方案

1. 可疑区域增加 Try-Catch
2. 全局监控 JS 异常 window.onerror
3. 全局监控静态资源异常 window.addEventListener
4. 捕获没有 Catch 的 Promise 异常：unhandledrejection
5. VUE errorHandler 和 React componentDidCatch
6. 监控网页崩溃：window 对象的 load 和 beforeunload

<!-- 7、跨域 crossOrigin 解决 -->

---

0. [Tracking unhandled rejected Promises - Dr. Axel Rauschmayer | Homepage](http://2ality.com/2016/04/unhandled-rejections.html)
1. [Front-End-Monitoring](https://github.com/RicardoCao-Biker/Front-End-Monitoring/blob/master/BasicKnowledge.md)
1. [前端异常](http://jartto.wang/2018/11/20/js-exception-handling/)
1. [bad.js 是国内优秀的前端监控开源方案](https://github.com/BetterJS/badjs-report)
1. [前端代码异常监控实战 · Issue #5](https://github.com/happylindz/blog/issues/5)
