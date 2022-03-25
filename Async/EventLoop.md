[单线程](Async/Single-thread.md)那篇文章,探究了 js 的单线程特性以及 js 在浏览器
宿主中的运行时环境。 JavaScript 如何在浏览器中工作？答案是事件循环。浏览器中
JavaScript 的执行流程和 Node.js 中的流程都是基于事件循环的。

![20220325-Vjv1cg-383530353663372e706e67](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220325-Vjv1cg-383530353663372e706e67.png)

图中的大部分内容并不是 JavaScript 语言本身的一部分。Web API、回调队列和事件循环
都是浏览器提供的功能。

<image
src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220325-br4RLG-661353238626461662e6a7067.jpg"
width='300px' />

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
2. 我们传递给 setTimeout 的回调函数会被添加到 web API, setTimeout 函数和 bar 会
   从调用栈中弹出
3. 定时器运行,同时 foo 被调用并打印 First。Foo 返回(未定义),baz 被调用
   ,setTimeout 的回调函数被添加到队列中。
4. baz 打印出 Third. baz 执行完成后,event loop 看到 callstack 现在是空的
5. setTimeout 的 callback 打印出 Second.

### 探究任务队列(Queue)

在事件循环中,实际上有两种类型的队列,任务队列分为 macrotasks 和 microtasks,在 ES6
规范中,microtask 称为 jobs,macrotask 称为 task。

首先要说明宏任务其实一开始就是任务（task）,为什么呢？因为 ES6 新引入了 Promise
标准,同时浏览器实现上多了一个 microtask 微任务概念,作为对照才称宏任务。微任务队
列中的每一个微任务会依次被执行。不同的是它会等到微任务队列为空才会停止执行(即使
中途有微任务加入)。换句话说,微任务可以添加新的微任务到队列中,并在下一个任务开始
执行之前且当前事件循环结束之前执行完所有的微任务
。([MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth)
)

```code
宏任务 === macrotask === task   (宿主环境具有的能力)
script ,setTimeout ,setInterval ,setImmediate ,I/O ,UI rendering

微任务 === microtask === jobs (js具有的能力,微任务仅来自于我们的代码)
process.nextTick ,promise ,Object.observe ,MutationObserver
```

微任务优先级高于宏任务,所以只有当所有的微任务执行完成后(即微任务队列为空),才会去
执行宏任务。如下图所示。

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

```js
console.log(1);
setTimeout(function () {
  console.log(2);
}, 0);
Promise.resolve()
  .then(function () {
    console.log(3);
  })
  .then(function () {
    console.log(4);
  });
console.log(5);
// 打印顺序为：1 5 3 4 2
```

---

1. [事件循环：微任务和宏任务](https://zh.javascript.info/event-loop)
2. [微任务（Microtask）](https://zh.javascript.info/microtask-queue)
3. [Tasks, microtasks, queues and schedules - JakeArchibald.com](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
4. [✨♻️ JavaScript Visualized: Event Loop - DEV Community 👩‍💻👨‍💻](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)
5. [⭐️🎀 JavaScript Visualized: Promises & Async/Await - DEV Community 👩‍💻👨‍💻](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)
6. [JavaScript 事件循环和调用堆栈解释](https://felixgerschau.com/javascript-event-loop-call-stack/?ref=morioh.com&utm_source=morioh.com)
7. [第 10 题：常见异步笔试题，请写出代码的运行结果 · Issue #7 · Advanced-Frontend/Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7)
