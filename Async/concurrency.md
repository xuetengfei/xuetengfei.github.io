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

这样无法控制并发的返回结果的顺序。日常开发需要**`控制时序`**

<!-- ### e.g.1

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
``` -->

## e.g

```javascript
const fetch = require('node-fetch');
const api = ' http://httpbin.org/get?id=';

// const startTime = Date.now();
// const log = v => console.log(v, 'cost:', Date.now() - startTime, 'ms');

const f = id =>
  fetch(`${api}${id}`)
    .then(res => res.json())
    .then(json => json.args.id);

const getAll = async () => {
  try {
    return await Promise.all([f(1), f(2), f(3)]);
  } catch (error) {
    console.log(error);
  }
};

getAll().then(res => console.log('res: ', res));
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200626-BfDoBd-async-parallel.jpg' alt='20200626-BfDoBd-async-parallel'/>
