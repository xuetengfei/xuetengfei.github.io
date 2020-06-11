?> A callback is a function that is passed as an argument to another function and is executed after its parent function has completed

字面上的理解，回调函数就是一个参数，将 A 函数作为参数传到 B 函数里面，当 B 函数执行完之后，再执行传进去的 A 函数。这个过程就叫做回调。

"下飞机后，给我打个电话"  
"好的"

## 简单的代码示意

```javascript
//定义主函数，回调函数作为参数
function A(callback) {
  callback();
  console.log(`我是A主函数，执行完毕 ${new Date().toLocaleTimeString()}`);
}

//定义回调函数
function B() {
  setTimeout(() => {
    console.log(`我是B回调函数，执行完毕 ${new Date().toLocaleTimeString()}`);
  }, 3000);
  //模仿耗时操作
}

//调用主函数，将函数B传进去
A(B);

//  我是A主函数，执行完毕 上午1:48:48
//  我是B回调函数，执行完毕 上午1:48:51
```

## 回调函数执行的异步函数

```javascript
function A(callback) {
  console.log(`loop start time is : ${new Date().toLocaleTimeString()}`);
  let t = Date.now();
  callback();
  console.log(Date.now() - t);
  console.log(`end : ${new Date().toLocaleTimeString()}`);
}

function B() {
  for (let i = 0; i < 10000000000; i++) {}
  console.log(`start callback function : ${new Date().toLocaleTimeString()}`);
  setTimeout(() => {
    console.log(`我是B回调函数，执行完毕 ${new Date().toLocaleTimeString()}`);
  }, 3000);
}

A(B);

// loop start time is: 11: 12: 00
// start callback function : 11: 12: 11
// 10998
// end: 11: 12: 11
// 我是B回调函数，执行完毕 11: 12: 14
```

## JS 引擎的执行机制

仔细看一下上面代码,我们会发现 `A function`里面的代码其实是从`上而下顺序执行的`.然而,在`B function`中的`setTimeout`是最后执行的.原因就在于 js `事件循环(Event Loop)`.这个异步任务并没有进入主进程,而是进入了任务队列(Queue).所以只有当主进程中没有了同步任务了,并且异步代码有结果了后通知主进程了,才会执行这个异步任务.

按照这种分类方式:JS 的执行机制是

首先判断 JS 是同步还是异步,同步就进入主进程,异步就进入 event table

异步任务在 event table 中注册函数,当满足触发条件后,被推入 event queue

同步任务进入主线程后一直执行,直到主线程空闲时,才会去 event queue 中查看是否有可执行的异步任务,如果有就推入主进程中
以上三步循环执行,这就是 event loop

1. [理解 JS 引擎的执行机制](http://web.jobbole.com/93749/#2)
2. [理解 Event Loop、Micro Task & Macro Task](https://zhuanlan.zhihu.com/p/28051505)

<!-- 代码示意:2

```javascript
// eg_2

function printIt() {
  console.log('code change world!');
}

function plus(callback) {
  console.time();
  setTimeout(() => {
    callback();
  }, 3000);
  console.timeEnd();
}

printIt();
// code change world!

plus(printIt);
// default: 0.06103515625ms
// code change world!
``` -->

## js 引擎是怎么判断一个任务是同步的还是异步的呢?

这时，需要区分两种任务：正常任务（task）与微任务（microtask）。它们的区别在于，“正常任务”在下一轮 Event Loop 执行，“微任务”在本轮 Event Loop 的所有任务结束后执行。这里面又涉及到 另外一个事件循环.

```javascript
console.log(1);
setTimeout(function() {
  console.log(2);
}, 0);
Promise.resolve()
  .then(function() {
    console.log(3);
  })
  .then(function() {
    console.log(4);
  });
console.log(5);
// 打印顺序为：1 5 3 4 2
```

正常任务包括以下情况。

```
- setTimeout
- setInterval
- setImmediate
- I/O
- 各种事件（比如鼠标单击事件）的回调函数
```

微任务目前主要是 process.nextTick 和 Promise 这两种情况。

所以，判断 JS 的任务执行机制的难点就是有多个异步任务，并且是不同类型的异步任务的时候，这个时候先要分清任务是“正常任务”还是“微任务”，“正常任务”要到下一轮 Event Loop 执行，所以要晚些执行。

知道有这么东西就好,不必深究.

## jq ajax

```javascript
$('button').click(function() {
  $.ajax({
    url: 'demo_test.txt',
    success: function(result) {
      $('#div1').html(result);
    },
  });
});
```

---

0. [理解与使用 Javascript 中的回调函数](http://www.html-js.com/article/1592)
1. [关于 js 中的回调函数 callback](https://juejin.im/entry/584f9dac8d6d8100545cbbc6)
