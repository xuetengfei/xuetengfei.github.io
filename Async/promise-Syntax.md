Promise 是异步编程的一种解决方案，比传统的解决方案回调函数和事件更合理强大
。Promise 是一个构造函数，用来生成 Promise 实例对象。

![20220302-lQvYzj-392_22611011949_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220302-lQvYzj-392_22611011949_.jpg)

## Syntax

```js
const promise = new Promise(function(resolve, reject) {
  if (/* success */){
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

## Promise 是啥？

打印 console.dir(Promise) 有个直观感受。 Promise 是一个`构造函数`，自己身上有
all、reject、resolve 这几个静态方法，原型上有 then、catch 等方法。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/what-is-promise.png"/>

### Instance Method

```js
promise.then(onFulfilled, onRejected);
promise.catch(onRejected);
```

### Static Method

```js
Promise.all();
Promise.resolve();
```

> Promise 是一个对象，用作延迟计算的最终结果的占位符。Promise
> 是`抽象异步处理对象`以及对其进行`各种操作`的组件,Promise 是异步编程的一种解决
> 方案，比传统的解决方案`回调函数和事件`更合理和更强大。它由社区最早提出和实现
> ，ES6 将其写进了语言标准，统一了用法。

简单来说，一个 Promise 是一个装有未来值的容器。比如，你预定一张机票，预订后，你
会得到一张机票。这张机票是航空公司的一个承诺，意味着你在出发当天可以获得相应的座
位。实质上，票证是未来值的占位符，即座位。

如果说到基于 JavaScript 的异步处理，大多数都会想到利
用[回调函数](javascript/callback.md),回调函数依然有用，现在可以使用
Promise,Promise 提供了更清晰的链式异步命令语法，因此可以串联运行。

## Promise APIs

![20220302-XPac0T-393_22611012049_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220302-XPac0T-393_22611012049_.jpg)

## Demo

```javascript
new Promise((resolve, reject) => {
  console.log('run executor');
  Math.random() > 0.5 ? resolve(num) : reject('fail');
})
  .then(num => console.log('num:', num))
  .catch(err => console.log('err:', err));
```

> resolve 、 reject 是两个函数，这两个函数作为参数传递给 executor。 executor 是
> 一个函数 。Promise 构造函数执行时立即调用 executor 函数，也就是说 executor 函
> 数在 Promise 构造函数返回所建 promise 实例对象前被调用。resolve 和 reject 函数
> 被调用时，分别将 promise 的状态改为 fulfilled（完成）或 rejected（失败）。
> executor 内部通常会执行一些异步操作，一旦异步操作执行完毕(可能成功/失败)，要么
> 调用 resolve 函数来将 promise 状态改成 fulfilled，要么调用 reject 函数将
> promise 的状态改为 rejected。如果在 executor 函数中抛出一个错误，那么该
> promise 状态为 rejected。executor 函数的返回值被忽略。

## executor

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

## 创建 promise 对象

一般情况下我们都会使用 new Promise() 来创建 promise 对象，但是除此之外我们也可以
使用其他方法。

> 静态方法 Promise.resolve(value) 可以认为是 new Promise() 方法的快捷方式。
> Promise.reject(error) 类似于 Promise.resolve(value)

```js
// 比如 Promise.resolve(42); 可以认为是以下代码的语法糖。
new Promise(function (resolve) {
  resolve(42);
});

// Promise.reject(error)
Promise.reject(new Error('BOOM!')).catch(function (error) {
  console.error(error);
});
```

### promisify

这样的语法糖可以很方便地将代码进行包装，promisify

原来代码

```javascript
function add(a, b) {
  return a + b;
}
```

Wrapped

```javascript
function add(a, b) {
  return Promise.resolve(a + b);
}
add(2, 3).then(res => {
  console.log(res); // 5
});
```

## 使用 Promise

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

## catch 作用

catch 它还有另外一个作用:在执行 resolve 的回调时，如果抛出异常了（代码出错了），
那么并不会报错卡死 js，而是会进到这个 catch 方法中

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
果不用 Promise，代码运行到这里就直接在控制台报错了，不往下运行了。但是在这里, 即
便是有错误的代码也不会报错了，这和 `try/catch`语句有相同的功能。

当一个 error 没有被处理会发生什么？例如，我们忘了在链的尾端附加 .catch，像这样:

```javascript
new Promise(function () {
  noSuchFunction(); // 这里出现 error（没有这个函数）
}).then(() => {
  // 一个或多个成功的 promise 处理程序（handler）
}); // 尾端没有 .catch！
```

JavaScript 引擎会跟踪此类 rejection，在这种情况下会生成一个全局的 error。如果你
运行上面这个代码，你可以在控制台（console）中看到。在浏览器中，可以使用
unhandledrejection 事件来捕获这类 error。

unhandledrejection 事件是 HTML 标准 的一部分。unhandledrejection 处理程序
（handler）就被触发，并获取具有 error 相关信息的 event 对象，所以就能做一些后续
处理了。

```javascript
window.addEventListener('unhandledrejection', function (event) {
  // 这个事件对象有两个特殊的属性:
  alert(event.promise); // [object Promise] - 生成该全局 error 的 promise
  alert(event.reason); // Error: ops! - 未处理的 error 对象
});

new Promise(function () {
  throw new Error('ops!');
}); // 没有用来处理 error 的 catch
```

见[全局捕获错误](Progress/handle-error.md)这篇博客

## finally

就像常规 try {...} catch {...} 中的 finally 子句一样，promise 中也有 finally。

.finally(f) 调用与 .then(f, f) 类似，在某种意义上，f 总是在 promise 被 settled
时运行:即 promise 被 resolve 或 reject。

finally 是执行清理（cleanup）的很好的处理程序（handler），例如无论结果如何，都停
止使用不再需要的加载指示符（indicator）。

像这样:

```javascript
new Promise((resolve, reject) => {
  /* 做一些需要时间的事儿，然后调用 resolve/reject */
})
  // 在 promise 为 settled 时运行，无论成功与否
  .finally(() => stop loading indicator)
  // 所以，加载指示器（loading indicator）始终会在我们处理结果/错误之前停止
  .then(result => show result, err => show error)
```

也就是说，finally(f) 其实并不是 then(f,f) 的别名。它们之间有一些细微的区别:

finally 处理程序（handler）没有参数。在 finally 中，我们不知道 promise 是否成功
。没关系，因为我们的任务通常是执行“常规”的定稿程序（finalizing procedures）。

finally 处理程序将结果和 error 传递给下一个处理程序。

例如，在这儿结果被从 finally 传递给了 then:

```javascript
new Promise((resolve, reject) => {
  setTimeout(() => resolve('result'), 2000);
})
  .finally(() => alert('Promise ready'))
  .then(result => alert(result)); // <-- .then 对结果进行处理
```

```javascript
new Promise((resolve, reject) => {
  throw new Error('error');
})
  .finally(() => alert('Promise ready'))
  .catch(err => alert(err)); // <-- .catch 对 error 对象进行处理
```

## Promise 链

![20220302-rtOCOj-387_22611013243_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220302-rtOCOj-387_22611013243_.png)

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

### 返回值也是 promise

> `promiseInstance.then(...).catch(...)`像是针对最初的 promiseInstance 对象进行
> 了一连串的方法链调用。然而实际上不管是 then 还是 catch 方法调用，都返回了一个
> 新的 promise 对象。

如果 .then（或 catch/finally 都可以）处理程序（handler）返回一个 promise，那么链
的其余部分将会等待，直到它状态变为 settled。当它被 settled 后，其 result（或
error）将被进一步传递下去。

![20220303-o6H184-397_22621014212_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220303-o6H184-397_22621014212_.jpg)

```js
const aPromise = new Promise(function (resolve) {
  resolve(100);
});

const thenPromise = aPromise.then(function (value) {
  console.log(value);
});
const catchPromise = thenPromise.catch(function (error) {
  console.error(error);
});

console.log(aPromise instanceof Promise); // => true
console.log(thenPromise instanceof Promise); // => true
console.log(catchPromise instanceof Promise); // => true

console.log(aPromise !== thenPromise); // => true
console.log(thenPromise !== catchPromise); // => true
```

## Promise.all

Promise.all 接收一个 promise 实例数组作为参数，当这个数组里的所有 promise 对象全
部变为 resolve 或 reject 状态的时候，它才会去调用 then 方法。

Promise.all 是用来做并发执行

```js
// `delay`毫秒后执行resolve
const delay = timeout =>
  new Promise(resolve => setTimeout(() => resolve(timeout), timeout));

const tasks = [delay(1), delay(32), delay(64), delay(128)];

console.time('TEST');
// 所有promise变为resolve后程序退出
Promise.all(tasks).then(values => {
  console.timeEnd('TEST');
  console.log(values);
});

// TEST: 131.097ms
// [ 1, 32, 64, 128 ]

// delay 会每隔一定时间（通过参数指定）之后，返回一个promise对象，
// 状态为FulFilled，其状态值为传给 delay 的参数。
// 而传给 Promise.all 的则是由上述promise组成的数组。

// 这时候，每隔1, 32, 64, 128 ms都会有一个promise发生 resolve 行为。
// 也就是说，这个promise对象数组中所有promise都变为resolve状态的话，至少需要128ms。
// 实际我们计算一下Promise.all 的执行时间的话，它确实是消耗了128ms的时间

// 如果这些promise全部 串行 处理的话，
// 那么需要 等待1ms → 等待32ms → 等待64ms → 等待128ms ，全部执行完毕需要225ms的时间。
```

贴近真实的代码

```javascript
let names = ['iliakan', 'remy', 'jeresig'];
let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // 所有响应都被成功 resolved
    for (let response of responses) {
      console.log(`${response.url}: ${response.status}`); // 对应每个 url 都显示 200
    }
    return responses;
  })
  // 将响应数组映射（map）到 response.json() 数组中以读取它们的内容
  .then(responses => Promise.all(responses.map(r => r.json())))
  // 所有 JSON 结果都被解析:"users" 是它们的数组
  .then(users => users.forEach(user => console.log(user.name)));
```

## Promise.allSettled

最近添加的 Promise.allSettled 等待所有的 promise 都被 settle，无论结果如何。结果
数组:对于成功的响应 {status:"fulfilled", value:result}，对于 error
{status:"rejected", reason:error}。

所以，对于每个 promise，我们都得到了其状态（status）和 value/reason。

```javascript
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url',
];

Promise.allSettled(urls.map(url => fetch(url))).then(results => {
  console.log('results', results);
  // [
  //   {status: 'fulfilled', value: ...response...},
  //   {status: 'fulfilled', value: ...response...},
  //   {status: 'rejected', reason: ...error object...}
  // ]
});
```

### Promise.allSettled Polyfill

```javascript
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });
  const resolveHandler = value => ({ status: 'fulfilled', value });
  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p =>
      Promise.resolve(p).then(resolveHandler, rejectHandler),
    );
    return Promise.all(convertedPromises);
  };
}
```

## Promise.race

与 Promise.all 类似，接收一个 promise 实例数组为参数,`但只等待第一个` settled 的
promise 并获取其结果（或 error）。

Promise.all 在`所有的promise实例` 都变为 FulFilled 或者 Rejected 状态之后才会继
续进行后面的处理.  
Promise.race 只要有`一个 promise实例`进入 FulFilled 或者 Rejected 状态的话，就会
继续进行后面的处理。

一个带计时器的 Promise.race 的使用例子:

```js
const delay = timeout =>
  new Promise(resolve =>
    setTimeout(() => {
      console.log('setTimeout', timeout);
      return resolve(timeout);
    }, timeout),
  );

const tasks = [delay(1), delay(32), delay(64), delay(128)];

// 任何一个promise变为resolve或reject 的话程序就停止运行

const tasks = [delay(1), delay(32), delay(64), delay(128)];
Promise.race(tasks).then(values => {
  console.log(values); // 1
});

// 在第一个promise对象变为Fulfilled之后，
// Promise.race 并不会取消其他promise对象的执行。
/* 

setTimeout 1
1
setTimeout 32
setTimeout 64
setTimeout 128
*/
```

<img src='http://loremxuetengfei.oss-cn-beijing.aliyuncs.com/explain-promise.png'/>

## Promise.any

Promise.any 是 Promise 的 race 的一种情况。

与 Promise.race 类似，区别在于 Promise.any 只等待第一个 fulfilled 的 promise，并
将这个 fulfilled 的 promise 返回。如果给出的 promise 都 rejected，那么则返回
rejected 的 promise 和 AggregateError 错误类型的 error 实例—— 一个特殊的 error
对象，在其 errors 属性中存储着所有 promise error。

```javascript
Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('ops!')), 1000),
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(console.log(value)); // 1
```

```javascript
Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('Ouch!')), 1000),
  ),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('Error!')), 2000),
  ),
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error
});
```

## 题目

红灯三秒亮一次，绿灯一秒亮一次，黄灯 2 秒亮一次；如何让三个灯不断交替重复亮灯？
（用 Promse 实现）

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

---

1. [使用 Promise - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)
2. [JavaScript Promise 迷你书（中文版）](http://liubin.org/promises-book/#what-is-promise)
3. [JavaScript Visualized: Promises & Async/Await - DEV Community ](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)
4. [JavaScript Promises - 众成翻译](https://zcfy.cc/article/javascript-promises-101)
