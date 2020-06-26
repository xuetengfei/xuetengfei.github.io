#### 方法一:Promise.all

```js
const api = ' http://httpbin.org/get?id=';

const list = [1, 2, 3].map(v =>
  fetch(`${api}${v}`)
    .then(res => res.json())
    .then(json => json?.args?.id),
);

function fn() {
  Promise.all(list)
    .then(res => {
      console.log('res: ', res);
    })
    .catch(err => {
      console.log('error', err);
    });
}

fn();
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200626-BfDoBd-async-parallel.jpg' alt='20200626-BfDoBd-async-parallel'/>

#### 方法二:创建一个 fetchAll 函数

```javascript
const api = ' http://httpbin.org/get?id=';

const f = id =>
  fetch(`${api}${id}`)
    .then(res => res.json())
    .then(json => json?.args?.id);

async function fetchAll() {
  const data1 = f(1);
  const data2 = f(2);
  return {
    data1: await data1,
    data2: await data2,
  };
}

async function getAll() {
  try {
    const result = await fetchAll();
    console.log('result: ', result);
  } catch (error) {
    console.log(error);
  }
}

getAll();

/* 
result: {data1: "1", data2: "2"}
*/

// 注意 fetchAll 函数的写法问题
// 错误的写法,这样写是串行
async function fetchAll() {
  return {
    data1: await f(1),
    data2: await f(2),
  };
}
```

循环体内，没有 await 等待返回。一次性发起请求，那么的话，都是并发。

```js
const api = ' http://httpbin.org/get?id=';

const f = id =>
  fetch(`${api}${id}`)
    .then(res => res.json())
    .then(json => json?.args?.id);

async function getAll() {
  const arr = [1, 2, 3];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    f(element);
  }
}
getAll();
```
