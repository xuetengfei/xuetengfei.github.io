由于许多函数和库都是基于回调的，因此，在实际开发中经常会需要进行这种转换。因为使
用 promise 更加方便，所以将基于回调的函数和库 promisify 是有意义的。

## Node

在 Node.js 中，有一个内建的 promisify 函数 util.promisify。

```javascript
const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const file = `${__dirname}/test.json`;

// to.js
function to(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
}

/* async/await */

async function fn() {
  const [err, res] = await to(readFilePromise(file, {}));
  if (err) {
    console.log('err: ', err);
    return;
  }
  const data = await JSON.parse(res.toString());
  console.log('data: ', data);
}

fn();
```

## javascript

callback 转为为 promise

```javascript
const promisify =
  func =>
  (...args) =>
    new Promise((resolve, reject) =>
      func(...args, (err, result) => (err ? reject(err) : resolve(result))),
    );
const delay = promisify((d, cb) => setTimeout(cb, d));
delay(2000).then(() => console.log('Hi!')); //  Promise resolves after 2s
```

```javascript
const promisify =
  func =>
  (...args) =>
    new Promise((resolve, reject) =>
      func(...args, (err, result) => (err ? reject(err) : resolve(result))),
    );

const sum = (num1, num2, callback) => {
  console.log('callback', callback.toString());
  // callback (err, result) => (err ? reject(err) : resolve(result))
  if (!num1 || !num2) {
    return callback(new Error('Missing dependencies'), null);
  }
  const sum = num1 + num2;
  const message = `Sum is ${sum}`;
  return callback(null, { sum, message });
};

const sumPromisify = promisify(sum);
sumPromisify(2, 3)
  .then(val => console.log('val', val)) // val { sum: 5, message: 'Sum is 5' }
  .catch(err => console.log('err', err));
```

## 语法糖

Promise.resolve/Promise.reject 这样的语法糖可以很方便地将代码进行包装

```javascript
function add(a, b) {
  return a + b;
}
```

```javascript
function add(a, b) {
  return Promise.resolve(a + b);
}
add(2, 3).then(res => {
  console.log(res); // 5
});
```
