## JavaScript 如何在浏览器中工作？

答案是事件循环。浏览器中 JavaScript 的执行流程和 Node.js 中的流程都是基于事件循
环的。

![20220223-ILtOhc-340_2254945648_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220223-ILtOhc-340_2254945648_.png)

图中的大部分内容并不是 JavaScript 语言本身的一部分。Web API、回调队列和事件循环
都是浏览器提供的功能。

## demo1

```javascript
const foo = () => console.log('First');
const bar = () => setTimeout(() => console.log('Second'), 500);
const baz = () => console.log('Third');

bar();
foo();
baz();
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200526-HDH7q2-event-loop.gif' alt='20200526-HDH7q2-event-loop'/>

1. 调用 bar 函数. bar 函数返回一个 setTimeout 函数.
2. 我们传递给 setTimeout 的回调函数会被添加到 web API， setTimeout 函数和 bar 会
   从调用栈中弹出
3. 定时器运行，同时 foo 被调用并打印 First。Foo 返回(未定义)，baz 被调用
   ,setTimeout 的回调函数被添加到队列中。
4. baz 打印出 Third. baz 执行完成后，event loop 看到 callstack 现在是空的
5. setTimeout 的 callback 打印出 Second.

### 探究任务队列(Queue)

在事件循环中，实际上有两种类型的队列,任务队列分为 macrotasks 和 microtasks，在
ES6 规范中，microtask 称为 jobs，macrotask 称为 task。

```code
宏任务 === macrotask === task
script ，setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering

微任务 === microtask === jobs
process.nextTick ，promise ，Object.observe ，MutationObserver
微任务仅来自于我们的代码
```

微任务优先级高于宏任务，所以只有当所有的微任务执行完成后(即微任务队列为空)，才会
去执行宏任务。如下图所示。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200527095703event-loop.gif' alt='20200527095703event-loop'/>

```js
console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

Promise.resolve()
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  });

console.log('script end');

// script start
// script end
// promise1
// promise2
// setTimeout
```

```javascript
setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(function () {
    console.log('promise1');
  });
}, 0);

setTimeout(() => {
  console.log('timer2');
  Promise.resolve().then(function () {
    console.log('promise2');
  });
}, 0);

// timer1
// promise1
// timer2
// promise2
```

---

1. [事件循环：微任务和宏任务](https://zh.javascript.info/event-loop)
2. [微任务（Microtask）](https://zh.javascript.info/microtask-queue)
3. [Tasks, microtasks, queues and schedules - JakeArchibald.com](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
4. [✨♻️ JavaScript Visualized: Event Loop - DEV Community 👩‍💻👨‍💻](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)
5. [⭐️🎀 JavaScript Visualized: Promises & Async/Await - DEV Community 👩‍💻👨‍💻](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)
6. [JavaScript 事件循环和调用堆栈解释](https://felixgerschau.com/javascript-event-loop-call-stack/?ref=morioh.com&utm_source=morioh.com)
