### JAVASCRIPT 单线程

JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。对于拿到的程序，一行一行的执行，上面的执行`没有完成`，那后面的程序就傻傻的等着。那么，为什么 JavaScript 不能有多个线程呢？这样能提高效率啊。

JavaScript 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定 JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

所以，为了避免复杂性，从一诞生，JavaScript 就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

### 同步与异步

- `同步编程`，就是计算机一行一行按顺序依次执行代码，当前代码任务耗时执行会`阻塞`后续代码的执行，是一种典型的请求-响应模型，当请求调用一个函数或方法后，需等待其响应返回，然后执行后续代码。
- `异步编程`，不同于同步编程的请求-响应模式，其是一种事件驱动编程，请求调用函数或方法后，无需立即等待响应，可以继续执行其他任务，而之前任务响应返回后可以通过状态、通知和回调来通知调用者。

### 同步编程存在代码阻塞的问题

比如,在浏览器的 console 面板中输入下面的代码.

```javascript
let t = Date.now();
for (let i = 0; i < 100000000; i++) {}
console.log(Date.now() - t); // > 98
```

上面的程序花费 98ms 的时间执行完成,修改一个循环次数在下面这个页面中.

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/test-javascript-danxiancheng.jpg" >

跑这个 100000000000 次循环的函数后,页面完全卡死,上面的红色标记是一个链接,点击没有任何反应,看下面的 network 显示面板,可以看到没有任何的网络请求.最后,我是关闭了这样页面才让谷歌浏览器的内存降下来的.

一般情况下，同步编程，代码按序依次执行，能很好的保证程序的执行，但是在某些场景下，比如读取文件内容，或请求服务器接口数据，需要根据返回的数据内容执行后续操作，读取文件和请求接口直到数据返回这一过程是需要时间的，网络越差，耗费时间越长，如果按照同步编程方式实现，在等待数据返回这段时间，JavaScript 是不能处理其他任务的，此时页面的交互，滚动等任何操作也都会被阻塞，这显然是及其不友好，不可接受的，而这正是需要异步编程大显身手的场景.
当使用异步编程时，在等待当前任务的响应返回之前，可以继续执行后续代码，即当前执行任务不会阻塞后续执行。

## 多线程

前面说明了异步编程能很好的解决同步编程阻塞的问题，那么实现异步的方式有哪些呢？通常实现异步方式是多线程，如 C#, 即同时开启多个线程，不同操作能并行执行.但是 js 是单线程的.如何处理异步呢? 事件循环机制.

## 并行与并发

前文提到多线程的任务可以并行执行，而 JavaScript `单线程异步编程`可以实现`多任务并发执行`，这里有必要说明一下并行与并发的区别。

- `并行`，指同一时刻内多任务同时进行；
- `并发`，指在同一时间段内，多任务同时进行着，但是某一时刻，只有某一任务执行；
  通常所说的并发连接数，是指浏览器向服务器发起请求，建立 TCP 连接，每秒钟服务器建立的总连接数，而假如，服务器处 10ms 能处理一个连接，那么其并发连接数就是 100。

## 任务队列

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

如果排队是因为计算量大，CPU 忙不过来，倒也算了，但是很多时候 CPU 是闲着的，因为 IO 设备（输入输出设备）很慢（比如 Ajax 操作从网络读取数据），不得不等着结果出来，再往下执行。

实际工作生活中,肯定不会跑上面个 100000000000 次循环的这样的函数,但是真实的前端业务肯定会有大量的网络请求，而一个网络资源啥时候返回，这个时间是不可预估的。这种情况也要傻傻的等着、卡顿着、啥都不做吗？———— 那肯定不行。

JavaScript 语言的设计者意识到，这时主线程完全可以不管 IO 设备，挂起处于等待中的任务，先运行排在后面的任务。等到 IO 设备返回了结果，再回过头，把挂起的任务继续执行下去。

!>于是，所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在`主线程上排队执行的任务`，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，`不进入主线程、而进入"任务队列"（task queue）的任务`，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

具体来说，异步执行的运行机制如下。（同步执行也是如此，因为它可以被视为没有异步任务的异步执行。）

!>（1）宿主环境为 JavaScript 创建线程时，会创建`堆(heap)`和`栈(stack)`，堆(heap)内存储 JavaScript 对象，栈(stack)内存储执行上下文.

!>（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个`事件`。`(举手说轮到我了)`

!>（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些`事件`。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

!>（4）主线程不断重复上面的第三步。

<!-- <img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/stack-heap-queue.jpg"  > -->
<!-- <img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/event-loop-img.png"   > -->
<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/event-loop-img-2.png"   >

?> 举例:我打算去银行柜台办理业务的时候,到银行门口才发现我忘记带银行卡了,我不能占着茅坑不拉屎啊,于是乎就在旁边的座椅(座椅就是*任务队列*)上坐着等家人送银行卡过来,我在等家人送卡过来后再办理业务就是异步任务.银行柜台给那些排队有卡的人在办理业务,就是主进程. 过来一会,我拿到家人送过来的银行卡后,去叫号机`排号`(放置事件).
等到柜台那边没有人排队了,然后柜台工作人员就会看到座椅那边(任务队列)有没有人`排号`.我刚才`先排号`了,于是乎就叫我过去办理业务.柜台一旦没有人排队了(主进程没有同步任务),就去看座椅那边有没有人`排号`,如果有,就叫过来处理业务,如此循环.(累死了,绞尽脑汁举例子~)

因此，JS `异步`场景就和这个银行柜台办理业务是一模一样的.只要主线程空了，就会去读取"任务队列"，这就是 JavaScript 的运行机制。这个过程会不断重复.这就是事件循环[Concurrency model and Event Loop - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)。

以下代码的输出顺序是什么? 答案是`b c a`

```javascript
setTimeout(console.log, 0, 'a');
console.log('b');
console.log('c');
```

## 传统的异步操作:回调函数

先看一段比较常见的代码

```javascript
var ajax = $.ajax({
  url: '/data/data1.json',
  success: function() {
    console.log('success');
  },
});
```

上面代码中`$.ajax()`需要传入两个参数进去，url 和 `success`，其中 url 是请求的路由，`success` 是一个函数。这个函数传递过去`不会立即执行`，而是等着请求成功之后才能执行。对于这种传递过去不执行，等出来结果之后再执行的函数，叫做 callback，即回调函数

再看一段更加能说明回调函数的 nodejs 代码。和上面代码基本一样，唯一区别就是：上面代码是网络请求，而下面代码是 IO 操作。

```javascript
var fs = require('fs');
fs.readFile('data1.json', (err, data) => {
  console.log(data.toString());
});
```

从上面两个 demo 看来，实现异步的最核心原理，就是将 callback 作为参数传递给异步执行函数，当有`结果返回之后再触发 callback 执行`，就是如此简单！

---

0. [在线演示](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
1. [理解 JavaScript 的 async/await - 边城客栈 - SegmentFault 思否](https://segmentfault.com/a/1190000007535316)
1. [You-Dont-Know-JS/async & performance at 1ed-zh-CN · getify/You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS/tree/1ed-zh-CN/async%20%26%20performance)
1. [wangfupeng1988/js-async-tutorial: 深入理解 JavaScript 异步](https://github.com/wangfupeng1988/js-async-tutorial)
