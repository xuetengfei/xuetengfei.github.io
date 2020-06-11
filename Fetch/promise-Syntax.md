### Demo: 查询天气

```javascript
const fetch = require('node-fetch');
const api = 'https://www.apiopen.top/weatherApi?city=';

const P = fetch(`${encodeURI(api + '深圳')}`);

P.then(data => data.json())
  .then(value => console.log(value))
  .catch(error => console.log(error));

// {code: 200,msg: '成功!',data: {high: '高温 29℃',type: '多云',city: '深圳'}}
```

### promise Syntax

```javascript
const executor = (resolve, reject) => {
  console.log('run executor');
  const num = Math.random();
  num > 0.5 ? resolve(num) : reject('fail');
};

const successed = num => console.log('num:', num);
const failed = err => console.log('err:', err);

new Promise(executor).then(successed).catch(failed);

// run executor
// num: 0.8217979624417842
// err: fail
```

?> resolve 、 reject 是两个函数，这两个函数作为参数传递给 executor。
executor 是一个函数 。Promise 构造函数执行时立即调用 executor 函数，也就是说 executor 函数在 Promise 构造函数返回所建 promise 实例对象前被调用。resolve 和 reject 函数被调用时，分别将 promise 的状态改为 fulfilled（完成）或 rejected（失败）。
executor 内部通常会执行一些异步操作，一旦异步操作执行完毕(可能成功/失败)，要么调用 resolve 函数来将 promise 状态改成 fulfilled，要么调用 reject 函数将 promise 的状态改为 rejected。如果在 executor 函数中抛出一个错误，那么该 promise 状态为 rejected。executor 函数的返回值被忽略。

---

直接**new Promise**实例化的 Promise 对象会**立即执行**。注意！只是实例化了一个 Promise 对象，并没有调用它，我们传进去的函数就已经执行了，这是需要注意的一个细节。这是因为 executor 函数在 Promise 构造函数返回所建 promise 实例对象前被调用

```javascript
const executor = (resolve, reject) => {
  const num = Math.random();
  console.log('num: ', num);
  console.log('RUN  EXECUTOR  FUNCTION');
  // num > 0.5 ? resolve(num) : reject('fail');
};

new Promise(executor);

// num:  0.508154404247751
// RUN  EXECUTOR  FUNCTION
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

上面两种使用方法，本质上是一样的。都是 new Promise 实例化后得到一个 Promise 对象实例。 Promise 对象上有 then、catch 方法。resolve 是将 Promise 的状态置为 fullfiled , then 接收 Promise fullfiled 数据,reject 是将 Promise 的状态置为 rejected, catch 接收 Promise rejected 数据.then catch 里面的函数跟回调函数一个意思，能够在 getNumber 这个异步任务执行『 完成之后 』被执行。

## catch 作用

catch 它还有另外一个作用：在执行 resolve 的回调（也就是上面 then 中的第一个参数）时，如果抛出异常了（代码出错了），那么并不会报错卡死 js，而是会进到这个 catch 方法中

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

在 resolve 的回调中，`console.log(somedata)的somedata`这个变量是没有被定义的。如果不用 Promise，代码运行到这里就直接在控制台报错了，不往下运行了。但是在这里，会得到这样的结果：

即便是有错误的代码也不会报错了，这和 `try/catch`语句有相同的功能。

---

### Promise 是什么东西？

打印 console.dir(Promise) 有个直观感受。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/what-is-promise.png"/>

Promise 是一个`构造函数`，自己身上有 all、reject、resolve 这几个方法，原型上有 then、catch 等方法。

?> Promise 是一个对象，用作延迟计算的最终结果的占位符。Promise 是`抽象异步处理对象`以及对其进行`各种操作`的组件,Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise对象`。

简单来说，一个 promise 是一个装有未来值的容器。比如，你预定一张机票，预订后，你会得到一张机票。这张机票是航空公司的一个承诺，意味着你在出发当天可以获得相应的座位。实质上，票证是未来值的占位符，即座位。

如果说到基于 JavaScript 的异步处理，我想大多数都会想到利用[回调函数](javascript/callback),回调函数依然有用，现在可以使用 Promise,Promises 提供了更清晰的链式异步命令语法，因此可以串联运行。

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

---

1. [ES6 系列之我们来聊聊 Promise · Issue #98 · mqyqingfeng/Blog](https://github.com/mqyqingfeng/Blog/issues/98)
2. [The Async Await Episode I Promised - YouTube](https://www.youtube.com/watch?v=vn3tm0quoqE)
3. [⭐️🎀 JavaScript Visualized: Promises & Async/Await - DEV Community 👩‍💻👨‍💻](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)
