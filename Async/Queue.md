## Syntax

```js
// 1
async function loadData() {
  var res1 = await fetch(url1);
  var res2 = await fetch(url2);
  var res3 = await fetch(url3);
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

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200626-YWRgEE-async-queue.jpg' alt='20200626-YWRgEE-async-queue'/>
