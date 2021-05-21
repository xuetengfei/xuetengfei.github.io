# Promise

Promise 是异步编程的一种解决方案，比传统的解决方案回调函数和事件更合理强大
。Promise 对象是一个构造函数，用来生成 Promise 实例

# Syntax

```js
const promise = new Promise(function(resolve, reject) {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

Promise 实例生成以后，可以用 then 方法分别指定 resolved 状态和 rejected 状态的回
调函数。

```js
promise.then(
  function (value) {
    // success
  },
  function (error) {
    // failure
  },
);
```

## Demo

```javascript
new Promise((resolve, reject) => {
  console.log('run executor');
  const num = Math.random();
  num > 0.5 ? resolve(num) : reject('fail');
})
  .then(num => console.log('num:', num))
  .catch(err => console.log('err:', err));

// run executor
// num: 0.8217979624417842
// err: fail
```

?> resolve 、 reject 是两个函数，这两个函数作为参数传递给 executor。 executor 是
一个函数 。Promise 构造函数执行时立即调用 executor 函数，也就是说 executor 函数
在 Promise 构造函数返回所建 promise 实例对象前被调用。resolve 和 reject 函数被调
用时，分别将 promise 的状态改为 fulfilled（完成）或 rejected（失败）。 executor
内部通常会执行一些异步操作，一旦异步操作执行完毕(可能成功/失败)，要么调用
resolve 函数来将 promise 状态改成 fulfilled，要么调用 reject 函数将 promise 的状
态改为 rejected。如果在 executor 函数中抛出一个错误，那么该 promise 状态为
rejected。executor 函数的返回值被忽略。

---

直接**new Promise**实例化的 Promise 对象会**立即执行**。  
注意！只是实例化了一个 Promise 对象，并没有调用它，我们传进去的函数就已经执行了
，这是需要注意的一个细节。  
这是因为 executor 函数在 Promise 构造函数返回所建 promise 实例对象前被调用

```javascript
var promise = new Promise(function (resolve) {
  console.log('inner promise'); // 1
  resolve(42);
});
promise.then(function (value) {
  console.log(value); // 3
});
console.log('outer promise'); // 2
```

```js
inner promise // 1
outer promise // 2
42            // 3
```

---

用 Promise 的时候一般是包在一个函数中，在需要的时候去运行这个函数，

```javascript
function getNumber() {
  const executor = (resolve, reject) => {
    const num = Math.random();
    num > 0.5 ? resolve(num) : reject('数字太大了');
    setTimeout(fn, 200);
  };
  return new Promise(executor);
}

getNumber()
  .then(res => console.log(`resolved :${res}`))
  .catch(error => console.log(`rejected:${error}`));

// Maybe -> resolved :0.5348232936957307
// Maybe -> rejected:数字太大了
```

---

上面两种使用方法，本质上是一样的。都是 new Promise 实例化后得到一个 Promise 对象
实例。 Promise 对象上有 then、catch 方法。resolve 是将 Promise 的状态置为
fullfiled , then 接收 Promise fullfiled 数据,reject 是将 Promise 的状态置为
rejected, catch 接收 Promise rejected 数据.then catch 里面的函数跟回调函数一个意
思，能够在 getNumber 这个异步任务执行『 完成之后 』被执行。

## catch 作用

catch 它还有另外一个作用：在执行 resolve 的回调（也就是上面 then 中的第一个参数
）时，如果抛出异常了（代码出错了），那么并不会报错卡死 js，而是会进到这个 catch
方法中

```javascript
getNumber()
  .then(res => {
    console.log(`resolved :${res}`);
    console.log(somedata);
  })
  .catch(error => console.log(`rejected:${error}`));

// Maybe -> resolved :0.5348232936957307
// rejected:ReferenceError: somedata is not defined
// Maybe -> rejected:数字太大了
```

在 resolve 的回调中，`console.log(somedata)的somedata`这个变量是没有被定义的。如
果不用 Promise，代码运行到这里就直接在控制台报错了，不往下运行了。但是在这里，会
得到这样的结果：

即便是有错误的代码也不会报错了，这和 `try/catch`语句有相同的功能。

---

### Promise 是什么东西？

打印 console.dir(Promise) 有个直观感受。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/what-is-promise.png"/>

1. Instance Method

```js
promise.then(onFulfilled, onRejected);
promise.catch(onRejected);
```

1. Static Method

```js
Promise.all();
Promise.resolve();
```

<!-- Promise 是一个`构造函数`，自己身上有 all、reject、resolve 这几个方法，原型上有 then、catch 等方法。 -->

?> Promise 是一个对象，用作延迟计算的最终结果的占位符。Promise
是`抽象异步处理对象`以及对其进行`各种操作`的组件,Promise 是异步编程的一种解决方
案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现
，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise对象`。

简单来说，一个 promise 是一个装有未来值的容器。比如，你预定一张机票，预订后，你
会得到一张机票。这张机票是航空公司的一个承诺，意味着你在出发当天可以获得相应的座
位。实质上，票证是未来值的占位符，即座位。

如果说到基于 JavaScript 的异步处理，我想大多数都会想到利
用[回调函数](javascript/callback),回调函数依然有用，现在可以使用
Promise,Promises 提供了更清晰的链式异步命令语法，因此可以串联运行。

```javascript
const executor = (resolve, reject) => {
  const fn = () => {
    const num = Math.random();
    num > 0.5 ? resolve(num) : reject('数字太大了');
  };
  setTimeout(fn, 200);
};
const O = new Promise(executor);

O.then(res => {
  console.log(`resolved :${res}`);
}).catch(error => console.log(`rejected:${error}`));

// Maybe -> resolved :0.5348232936957307
// Maybe -> rejected:数字太大了
```

# 创建 promise 对象

一般情况下我们都会使用 new Promise() 来创建 promise 对象，但是除此之外我们也可以
使用其他方法。

> 静态方法 Promise.resolve(value) 可以认为是 new Promise() 方法的快捷方式。

```js
// 比如 Promise.resolve(42); 可以认为是以下代码的语法糖。

new Promise(function (resolve) {
  resolve(42);
});
```

```js
// Promise.reject(error)是和 Promise.resolve(value) 类似的静态方法，是 new Promise() 方法的快捷方式/*  */
Promise.reject(new Error('BOOM!')).catch(function (error) {
  console.error(error);
});
```

# promise chain

```js
function taskA() {
  console.log('Task A');
}
function taskB() {
  console.log('Task B');
}
function onRejected(error) {
  console.log('Catch Error: A or B', error);
}
function finalTask() {
  console.log('Final Task');
}

var promise = Promise.resolve();
promise.then(taskA).then(taskB).catch(onRejected).then(finalTask);
```

> 每次调用 then 都会返回一个新创建的 promise 对象

`promiseInstance.then(...).catch(...)`像是针对最初的 promiseInstance 对象进行了
一连串的方法链调用。然而实际上不管是 then 还是 catch 方法调用，都返回了一个新的
promise 对象。

```js
var aPromise = new Promise(function (resolve) {
  resolve(100);
});
var thenPromise = aPromise.then(function (value) {
  console.log(value);
});
var catchPromise = thenPromise.catch(function (error) {
  console.error(error);
});
console.log(aPromise !== thenPromise); // => true
console.log(thenPromise !== catchPromise); // => true
```

题目：红灯三秒亮一次，绿灯一秒亮一次，黄灯 2 秒亮一次；如何让三个灯不断交替重复
亮灯？（用 Promse 实现）

```js
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

var light = function (timmer, cb) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      cb();
      resolve();
    }, timmer);
  });
};

var step = function () {
  Promise.resolve()
    .then(function () {
      return light(3000, red);
    })
    .then(function () {
      return light(2000, green);
    })
    .then(function () {
      return light(1000, yellow);
    })
    .then(function () {
      step();
    });
};

step();
```

<!--
```js
asyncDBconnect('http://api')
  .then(asyncGetSession) // passed result of asyncDBconnect
  .then(asyncGetUser) // passed result of asyncGetSession
  .then(asyncLogAccess) // passed result of asyncGetUser
  .then(result => {
    // non-asynchronous function
    console.log('complete'); //   (passed result of asyncLogAccess)
    return result; //   (result passed to next .then())
  })
  .catch(err => {
    // called on any reject
    console.log('error', err);
  });
``` -->

# Promise.all

Promise.all 接收一个 promise 对象的数组作为参数，当这个数组里的所有 promise 对象
全部变为 resolve 或 reject 状态的时候，它才会去调用 .then 方法。

```js
// `delay`毫秒后执行resolve

const delay = timeout =>
  new Promise(resolve => setTimeout(() => resolve(timeout), timeout));

var startDate = Date.now();

// 所有promise变为resolve后程序退出
Promise.all([delay(1), delay(32), delay(64), delay(128)]).then(values => {
  console.log(Date.now() - startDate + 'ms'); // 大约 128 ms
  console.log(values); // [1,32,64,128]
});

/*

delay 会每隔一定时间（通过参数指定）之后，返回一个promise对象，
状态为FulFilled，其状态值为传给 delay 的参数。
而传给 Promise.all 的则是由上述promise组成的数组。

这时候，每隔1, 32, 64, 128 ms都会有一个promise发生 resolve 行为。
也就是说，这个promise对象数组中所有promise都变为resolve状态的话，至少需要128ms。
实际我们计算一下Promise.all 的执行时间的话，它确实是消耗了128ms的时间

如果这些promise全部 串行 处理的话，
那么需要 等待1ms → 等待32ms → 等待64ms → 等待128ms ，全部执行完毕需要225ms的时间。

*/
```

<!-- # Promise.all 并发执行

```javascript
Promise.all([async1, async2, async3])
  .then(values => {
    console.log(values); //  values is a array of resolved
    return values;
  })
  .catch(err => {
    console.log('error', err);
  });
``` -->

# Promise.race

Promise.race 方法,它的使用方法和 Promise.all 一样，接收一个 promise 实例数组为参
数。

Promise.all 在`所有的promise实例` 都变为 FulFilled 或者 Rejected 状态之后才会继
续进行后面的处理.  
Promise.race 只要有`一个 promise实例`进入 FulFilled 或者 Rejected 状态的话，就会
继续进行后面的处理。

像 Promise.all 时的例子一样，我们来看一个带计时器的 Promise.race 的使用例子。

```js
// `delay`毫秒后执行resolve

const delay = timeout =>
  new Promise(resolve => setTimeout(() => resolve(timeout), timeout));

// 任何一个promise变为resolve或reject 的话程序就停止运行
Promise.race([delay(1), delay(32), delay(64), delay(128)]).then(values => {
  console.log(values); // 1
});
```

```js
var winnerPromise = new Promise(function (resolve) {
  setTimeout(function () {
    console.log('winnerPromise -> this is winner'); // 会打印
    resolve('Winner');
  }, 4);
});
var loserPromise = new Promise(function (resolve) {
  setTimeout(function () {
    console.log('loserPromise->this is loser'); // 会打印
    resolve('Loser');
  }, 1000);
});
// 第一个promise变为resolve后程序停止
Promise.race([winnerPromise, loserPromise]).then(function (value) {
  console.log(value); // => Winner'
});

/* 
执行上面代码的话，
会看到 winnter和loser promise对象的 setTimeout 方法都会执行完毕，
console.log 也会分别输出它们的信息。

也就是说， 
Promise.race 在第一个promise对象变为Fulfilled之后，并不会取消其他promise对象的执行。

那么，可以使用Promise.race做并发限制器，后面我会讲
*/
```

<img src='http://loremxuetengfei.oss-cn-beijing.aliyuncs.com/explain-promise.png'/>

---

4. [使用 Promise - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)
5. [JavaScript Promise 迷你书（中文版）](http://liubin.org/promises-book/#what-is-promise)
6. [JavaScript Visualized: Promises & Async/Await - DEV Community ](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)
7. [JavaScript Promises - 众成翻译](https://zcfy.cc/article/javascript-promises-101)
