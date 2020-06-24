实现一个批量请求函数，要求如下：

```md
1. 要求并发数量控制数 limit {Number}
2. 每当有一个请求返回，就留下一个空位，可以增加新的请求
3. 所有请求完成后，结果按照 urls 里面的顺序依次打出
```

promise 并发限制，其实根源上就是控制 promise 的实例化。

```js
const api = 'http://localhost:6254/api/concurrency/';

// 9个请求
const ayncList = Array.from(Array(9)).map((_, i) => `${api}${i + 1}`);

function fetchData(api) {
  return fetch(api)
    .then(response => response.json())
    .catch(err => console.error(err));
}

export default function index() {
  // ...
  useEffect(() => {
    // asyncPool core code
    async function asyncPool(poolLimit, array, iteratorFn) {
      const ret = [];
      const executing = [];
      for (const item of array) {
        const p = iteratorFn(item);
        // or: const p = Promise.resolve().then(() => iteratorFn(item));
        ret.push(p);
        const e = p.then(() => executing.splice(executing.indexOf(e), 1));
        // or: const e = p.finally(() => executing.splice(executing.indexOf(e), 1));
        executing.push(e);
        if (executing.length >= poolLimit) {
          await Promise.race(executing);
        }
      }
      return Promise.all(ret);
    }
    // call asyncPool
    asyncPool(3, ayncList, fetchData).then(res => {
      console.log('res: ', res);
    });
  }, [state]);
  // ...
}
```

> 1.开始请求的时候，就可以看到并发数控制为 3

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/uPic/asyncPool-1-5N3hD3.jpg' alt='asyncPool-1-5N3hD3'/>

> 2.接口做了一些逻辑处理，将 id 对 3 取模,决定接口响应的时间的长短。目的是，让一部分接口提前返回。那么，就留下一个空位，可以增加新的请求。下图可以看到，在整体请求结束前，并发数始终在控制的最大并发数，而不是分批次请求。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/uPic/asyncPool-2-mcxhQU.jpg' alt='asyncPool-2-mcxhQU'/>

> 3.所有请求完成后，结果按照 urls 里面的顺序依次打出

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/uPic/asyncPool-4-fWzZtg.jpg' alt='asyncPool-4-fWzZtg'/>

> 4. 所有请求完成后，请求时序图

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/uPic/asyncPool-3-dadjlf.jpg' alt='asyncPool-3-dadjlf'/>

---

`核心代码 asyncPool`

```js
// asyncPool
async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = [];
  const executing = [];

  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);
    const e = p.then(() => executing.splice(executing.indexOf(e), 1));
    executing.push(e);
    if (executing.length >= poolLimit) {
      await Promise.race(executing);
    }
  }
  return Promise.all(ret);
}

const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
asyncPool(2, [300, 500, 400, 200], timeout).then(r => console.log('r', r));

// r [ 300, 500, 400, 200 ]
```

`express 模拟接口的逻辑`

接口逻辑处理，为了测试两个问题。第一：对于请求 id 对 3 取模 ，决定接口的返回延迟时间。为了测试，整体请求的过程中是否都是处在最大并发请求中。第二，接口报错不影响整体请求和最后结果顺序。

```js
const { app } = require('./index');
const asyncDelay = ms => new Promise(r => setTimeout(r, ms));

app.get('/api/concurrency/:id', async (req, res) => {
  const { id } = req.params;
  await asyncDelay(id % 3 === 0 ? 1500 : 500);
  if (id == 5) {
    return res
      .status(400)
      .json({ status: 0, data: `request id is ${id}`, msg: 'err' });
  }
  return res.json({ status: 1, data: `request id is ${id}` });
});
```

## p-limit

```js
import React, { useState, useEffect } from 'react';
import pLimit from 'p-limit';

function fetchData(api) {
  return fetch(api)
    .then(response => response.json())
    .catch(err => console.error(err));
}

const limit = pLimit(3);
// 9个请求
const api = 'http://localhost:6254/api/concurrency/';
const ayncList = Array.from(Array(9)).map((_, i) => `${api}${i + 1}`);
const jobs = ayncList.map(v => limit(() => fetchData(v)));

async function run() {
  const result = await Promise.all(jobs);
  console.log(result);
}

export default function index() {
  const [state, setstate] = useState(0);

  useEffect(() => {
    run();
  }, [state]);

  // ...
}
```

---

1. [tc39/proposal-async-iteration: Asynchronous iteration for JavaScript](https://github.com/tc39/proposal-async-iteration#the-async-iteration-statement-for-await-of)
2. [async-pool/es7.js at master · rxaviers/async-pool](https://github.com/rxaviers/async-pool/blob/master/lib/es7.js)
3. [p-limit - npm](https://www.npmjs.com/package/p-limit)

## 同步循环中的异步等待

```js
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));

const jobs = [2000, 2500, 3000];

async function fn() {
  const ret = [];
  const pool = [];

  for (const item of jobs) {
    console.group(`-------now item: ${item}-------`);
    console.log('ret1: ', ret);
    console.time('耗时');

    const p = timeout(item);

    ret.push(p);
    const e = p.then(() => {
      console.log('pool1: ', pool);
      // 完成后，在pool数组里面，删除自己
      pool.splice(pool.indexOf(e), 1);
      console.log('pool2: ', pool);
    });
    pool.push(e);

    await p;

    console.timeEnd('耗时');
    console.log('Time:', new Date().toLocaleTimeString());
    console.log('ret2: ', ret);
    console.groupEnd();
  }
  return Promise.all(ret);
}

fn().then(res => console.log('end', res));
// end [ 2000, 2500, 3000 ]
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/uPic/ayncpool-5-96niIo.jpg' alt='ayncpool-5-96niIo'/>

<!--

 [现代JS中的流程控制：详解Callbacks 、Promises 、Async/Await - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000016143319#item-9)

[Promise.race vs. Promise.any And Promise.all vs. Promise.allSettled](https://sung.codes/blog/2019/05/18/promise-race-vs-promise-any-and-promise-all-vs-promise-allsettled/)


[JavaScript async and await in loops | Zell Liew](https://zellwk.com/blog/async-await-in-loops/)


1. [第 153 题：实现一个批量请求函数 multiRequest(urls, maxNum) · Issue #378 · Advanced-Frontend/Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/378)
1. [Promise.all concurrency limit | Develop Paper](https://developpaper.com/promise-all-concurrency-limit/)
1. [javascript - Resolve promises one after another (i.e. in sequence)? - Stack Overflow](https://stackoverflow.com/questions/24586110/resolve-promises-one-after-another-i-e-in-sequence)
 [Promise.all concurrency limit | Develop Paper](https://developpaper.com/promise-all-concurrency-limit/)

 -->
