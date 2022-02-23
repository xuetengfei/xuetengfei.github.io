<!--
## 并发和并行

Concurrency 意味着同时执行多个任务，但不是同时执行。例如，两个任务在重叠的时间段
内工作
Parallelism 意味着同时执行两个或多个任务，例如同时执行多个计算。

## 线程和进程

Threads 是一系列可以相互独立执行的代码执行。 Process 是正在运行的程序的一个实例
。一个程序可以有多个进程。

## 同步和异步

在 synchronous 编程中，任务是一个接一个地执行。每个任务都等待任何先前的任务完成
，然后才执行。在 asynchronous 编程中，当一个任务被执行时，你可以切换到另一个任务
，而不必等待前一个任务完成。

## 进程（Process）

是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单
位，是操作系统结构的基础。 在早期面向进程设计的计算机结构中，进程是程序的基本执
行实体；在当代面向线程设计的计算机结构中，进程是线程的容器。程序是指令、数据及其
组织形式的描述，进程是程序的实体。

## 线程（英语：thread）

线程是操作系统能够进行运算调度的最小单位。 它被包含在进程 Process 之中，是进程中
的实际运作单位。 一条线程指的是进程中一个单一顺序的控制流，一个进程中可以并发多
个线程，每条线程并行执行不同的任务 -->

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220222-tQCNSw-295_2252940333_.png" width="550px"  >

JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。对于拿到
的程序，一行一行的执行。一个函数需要一段时间才能执行，或者必须等待一些事情，那么
它会在同时冻结所有事情，它等待直到某个特定语句执行完毕，然后移动到下一个语句。

JavaScript 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是
与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比
如，假定 JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线
程删除了这个节点，这时浏览器应该以哪个线程为准？所以，为了避免复杂性，从一诞生
，JavaScript 就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创
建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改
变 JavaScript 单线程的本质。

## JS 如何实现异步编程？

Web 浏览器为我们提供了可以在 JavaScript 代码中调用的 API，即 Web API。这包括 DOM
API、setTimeout、HTTP 请求等。这可以帮助我们创建一些异步的、非阻塞的行为。

异步任务是由浏览器执行的，不管是 AJAX 请求，还是 setTimeout 等 API，浏览器内核会
在其它线程中执行这些操作，当操作完成后，将操作结果以及事先定义的回调函数放入
JavaScript 主线程的任务队列中 。

JavaScript 主线程会在执行栈清空后，读取任务队列，读取到任务队列中的函数后，将该
函数入栈，一直运行直到执行栈清空，再次去读取任务队列，不断循环。这一过程即事件循
环。浏览器中 JavaScript 的执行流程是基于事件循环的。

当主线程阻塞时，任务队列仍然是能够被推入任务的。这也就是为什么当页面的
JavaScript 进程阻塞时，我们触发的点击等事件，会在进程恢复后依次执行。

![20220223-ILtOhc-340_2254945648_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220223-ILtOhc-340_2254945648_.png)

<!--
## 传统的异步操作:回调函数

先看一段比较常见的代码

```javascript
var ajax = $.ajax({
  url: '/data/data1.json',
  success: function () {
    console.log('success');
  },
});
```

上面代码中`$.ajax()`需要传入两个参数进去，url 和 `success`，其中 url 是请求的路
由，`success` 是一个函数。这个函数传递过去`不会立即执行`，而是等着请求成功之后才
能执行。对于这种传递过去不执行，等出来结果之后再执行的函数，叫做 callback，即回
调函数

再看一段更加能说明回调函数的 nodejs 代码。和上面代码基本一样，唯一区别就是：上面
代码是网络请求，而下面代码是 IO 操作。

```javascript
var fs = require('fs');
fs.readFile('data1.json', (err, data) => {
  console.log(data.toString());
});
```

从上面两个 demo 看来，实现异步的最核心原理，就是将 callback 作为参数传递给异步执
行函数，当有`结果返回之后再触发 callback 执行`，就是如此简单！

 -->

---

1. [主线程 - 术语表 | MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Main_thread)
2. [深入：微任务与 Javascript 运行时环境 - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth)
3. [在线演示](http://latentflip.com/loupe)
4. [理解 JavaScript 的 async/await - 边城客栈 - SegmentFault 思否](https://segmentfault.com/a/1190000007535316)
5. [You-Dont-Know-JS/async & performance at 1ed-zh-CN · getify/You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS/tree/1ed-zh-CN/async%20%26%20performance)
6. [JavaScript 运行机制详解：再谈 Event Loop - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2014/10/event-loop.html)
