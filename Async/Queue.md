## Syntax

```js
// 1
async function loadData() {
  const res1 = await fetch(url1);
  const res2 = await fetch(url2);
  const res3 = await fetch(url3);
  return 'whew all done';
}

// 2
async function loadData(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
```

## Example

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

![20200626-YWRgEE-async-queue.jpg](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200626-YWRgEE-async-queue.jpg)

## 工作中的需求

```js
// 业务需要请求最近 3 天时间内最新的的数据,优先昨天，其次前天，再其次大前天

async function initFetch() {
  for (let day of [1, 2, 3]) {
    const date = moment(new Date(), 'YYYY-MM-DD').subtract(day, 'days');
    const res = await advanceGetList({ date });
    if (res?.data?.length) {
      console.log('end: ', end);
      break; // break 是重点
    }
  }
}

useEffect(() => {
  initFetch();
}, []);
```
