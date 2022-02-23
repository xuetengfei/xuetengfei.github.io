?> A callback is a function that is passed as an argument to another function
and is executed after its parent function has completed

回调函数就是一个参数，将 A 函数作为参数传到 B 函数里面，当 B 函数执行完之后，再
执行传进去的 A 函数。这个过程就叫做回调。

```js
function A(callback) {
  callback();
  console.log(`我是A主函数，执行完毕 ${new Date().toLocaleTimeString()}`);
}

function B() {
  setTimeout(() => {
    console.log(`我是B回调函数，执行完毕 ${new Date().toLocaleTimeString()}`);
  }, 3000);
}

A(B);

//  我是A主函数，执行完毕 上午1:48:48
//  我是B回调函数，执行完毕 上午1:48:51
```

```js
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

1. [理解 JS 引擎的执行机制](http://web.jobbole.com/93749/#2)
2. [理解 Event Loop、Micro Task & Macro Task](https://zhuanlan.zhihu.com/p/28051505)

---

0. [理解与使用 Javascript 中的回调函数](http://www.html-js.com/article/1592)
1. [关于 js 中的回调函数 callback](https://juejin.im/entry/584f9dac8d6d8100545cbbc6)
