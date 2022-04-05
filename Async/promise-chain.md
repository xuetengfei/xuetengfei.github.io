Promise 的作用:『 分离回调写法 』==>『 用链式调用的方式执行回调函数 』。所以，从
表面上看，Promise 只是能够简化层层回调的写法，而实质上，Promise 的精髓是“状态”，
用维护状态、传递状态的方式来使得回调函数能够及时调用，它比传递 callback 函数要简
单、灵活的多。Promise 的优势在于，可以在 then 方法中继续写 Promise 对象并返回，
然后继续调用 then 来进行回调操作。所以使用 Promise 的正确场景是这样的.

### 异步链核心用法

```javascript
function runAsyncFn1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('runAsyncFn1');
      resolve(100);
    }, 300);
  });
}

function runAsyncFn2(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('runAsyncFn2');
      resolve(data + 110);
    }, 300);
  });
}

function runAsyncFn3(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('runAsyncFn3');
      resolve(data + 120);
    }, 300);
  });
}

runAsyncFn1()
  .then(data => runAsyncFn2(data))
  .then(data => runAsyncFn3(data))
  .then(data => console.log(data))
  .catch(err => console.log(err));

// runAsyncFn1
// runAsyncFn2
// runAsyncFn3
// 330
```

---

### 出现异常

promise chain 的中间如果有任何执行代码执行失败直接跳到最后，被 catch 捕获。

```javascript
function runAsyncFn2(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('runAsyncFn2');
      // resolve(data + 110);
      reject('Report errors');
    }, 300);
  });
}

runAsyncFn1()
  .then(data => runAsyncFn2(data))
  .then(data => runAsyncFn3(data))
  .then(data => console.log(data))
  .catch(err => console.log(err));

// runAsyncFn1
// runAsyncFn2
// Report errors
```

上面的代码，没有打印 `runAsyncFn3`是因为没有执行 runAsyncFn3,是因为 runAsyncFn2
抛出异常的原因,直接结束，跳到最后。

---

### 红绿灯问题

题目：红灯三秒亮一次，绿灯一秒亮一次，黄灯 2 秒亮一次；如何让三个灯不断交替重复
亮灯？（用 Promse 实现）

```javascript
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

### 实际应用

```javascript
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
```
