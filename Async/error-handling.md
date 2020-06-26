在异步编程中，还有一个主要的问题，那就是错误处理。

<!-- 异步错误处理一般要涉及到为每个操作编写错误处理的回调。将错误传递到调用堆栈的顶部可能会非常复杂，通常需要在每个回调开始的地方显式检查是否有错误抛出。这种方式冗长繁琐并且容易出错。此外，如果没有恰当地进行处理，Promise 中抛出的异常将导致悄无声息地失败，这会产生代码库中错误检查不全面的“不可见的错误”。 -->

### 1.使用 try/catch

```js
async function fn() {
  try {
    const res = await fetch('http://httpbin.org/status/500');
    console.log('res: ', res);
  } catch (err) {
    console.error('err:', err);
  }
}
fn();
// 有错误的时候: -> err: Oops
```

### 2.包装 promise，使其返回统一的格式的代码

```javascript
/*  to.js  */
function to(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
}

function getRandomNumber() {
  return new Promise((resolve, reject) => {
    /* ... */
  });
}

async function fn() {
  const [err, res] = await to(getRandomNumber());
  if (err) {
    console.log('err: ', err);
    return;
  }
  console.log(res);
}
fn();
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/handle-error-1564305938.jpg'/>

---

1.  [scopsy/await-to-js: Async await wrapper for easy error handling without try-catch](https://github.com/scopsy/await-to-js)
