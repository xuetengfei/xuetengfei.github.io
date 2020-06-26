## 1

```js
const api = ' http://httpbin.org/get?id=';
async function fn() {
  for (let item of [1, 2, 3]) {
    const res = await fetch(`${api}${item}`);
    const json = await res.json();
    const end = json?.args?.id;
    console.log('end: ', end);
  }
}

fn();
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200626-YWRgEE-async-queue.jpg' alt='20200626-YWRgEE-async-queue'/>
<!-- <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/promise-order-fetch-1564267930.jpg'/> -->

经常会遇到这种情况，比如有下面一个数组,对这个数组 promise 数组依次执行，要每隔 2 秒依次问候数组中的人，于是我们将 setTimeout 包装成一个 promise.(类似之前的红绿灯的问题)
