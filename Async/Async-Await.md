Promise 看起来有点复杂，所以 ES2017 引进了 `async` 和 `await`。async 函数就是 Generator 函数的语法糖。Async/Await 应该是目前最简单的异步方案了并且可以避免 `Promise.prototype.then`链式调用的问题。

async 函数就是将 Generator 函数的星号`*` 替换成 `async`，将 `yield` 替换成 `await`

## Syntax

```javascript
const getUser = () => {
  return new Promise((resolve, reject) => {
    return resolve({ id: 1, name: 'someuser' });
  });
};

const fetchPosts = id => {
  return new Promise((resolve, reject) => {
    return resolve(id);
  });
};

const fn = async function () {
  const user = await getUser();
  const posts = await fetchPosts(user.id);
  return { user, posts };
};

fn()
  .then(res => console.log('res', res))
  .catch(err => console.error(err.stack));

/* 
  res { user: { id: 1, name: 'someuser' }, posts: 1 }
*/
```

<!-- async 函数就是将 Generator 函数的星号`*` 替换成 `async`，将 `yield` 替换成 `await` -->

### Compare Promise With Async

```javascript
// promise
function fetch() {
  return fetchData()
    .then(value1 => {
      return fetchMoreData(value1);
    })
    .then(value2 => {
      return fetchMoreData2(value2);
    });
}

// async
async function fetch() {
  try {
    const value1 = await fetchData();
    const value2 = await fetchMoreData(value1);
    return fetchMoreData2(value2);
  } catch (err) {
    console.log(err);
  }
}
```

`async` 函数返回一个 `Promise 对象`,可以用 `then` `catch` 方法指定下一步的操作。而 async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

?> `await`只能在 async 中运行。`await` 表示在这里等待 `promise` 返回结果了，再继续执行。
`await` 等待的虽然是 `promise` 对象，但不必写`.then(..)`，直接可以得到返回值`.catch(..)`也不用写，可以直接用标准的`try/catch`语法捕捉错误。`async` 函数返回的 `Promise` 对象，必须等到内部`所有`的 `await` 命令的 `Promise` 对象执行完，才会发生状态改变也就是说，只有当 `async` 函数内部的异步操作都执行完，才会执行 `then` 方法的回调。

```javascript
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
async function f() {
  await delay(1000);
  await delay(2000);
  await delay(3000);
  return 'done';
}

f().then(v => console.log(v)); // 等待6s后才输出 'done'
```

### 错误处理

如果 `async` 函数内部抛出异常，则会导致返回的 `Promise` 对象状态变为 `reject` 状态。抛出的错误而会被 `catch` 方法回调函数接收到。

```javascript
async function fetch() {
  try {
    const data = await fetchData();
  } catch (err) {
    console.log(err);
  }
}
```

#### 实战使用

```javascript
const fetch = require('node-fetch');

const fetchData = async function () {
  try {
    const r1 = await fetch('https://api.github.com/users/github');
    const json1 = await r1.json();
    console.log(json1.bio);
  } catch (error) {
    console.log('error: ', error);
  }
};

fetchData();

// How people build software.
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/promise-1569826933.gif'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/async-1569826933.gif'/>

## 故障延迟

```javascript
const asyncDelay = ms => new Promise(r => setTimeout(r, ms));

app.all('/data', async (_req, res) => {
  await asyncDelay(500);
  return res.json(
    Mock.mock({
      status: '1',
      data: {
        'totalRecord|45646': 1,
        'content|5': [
          {
            'flowId|+1': 3511,
            'date|1': '@date("yyyy-MM-dd")',
          },
        ],
      },
    }),
  );
});
```

<!--

---

1. [async function - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)
2. [async & await](https://davidwalsh.name/async-await)
3. [ES6 系列之我们来聊聊 Async · Issue #100 · mqyqingfeng/Blog](https://github.com/mqyqingfeng/Blog/issues/100)
4. [如何正确使用 async/await？](http://www.infoq.com/cn/articles/javascript-async-await-the-good-part-pitfalls-and-how-to-use?utm_campaign=rightbar_v2&utm_source=infoq&utm_medium=articles_link&utm_content=link_text)
5. [理解 async/await](https://chenhuichao.com/2017/07/18/es6/understanding-async-await/)
6. [体验异步的终极解决方案-ES7 的 Async/Await - CNode 技术社区](https://cnodejs.org/topic/5640b80d3a6aa72c5e0030b6)
7. [ASYNC/AWAIT 能够让代码更加简洁](http://www.infoq.com/cn/articles/what-is-async-await-why-should-you-care?utm_campaign=rightbar_v2&utm_source=infoq&utm_medium=articles_link&utm_content=link_text)


-->
