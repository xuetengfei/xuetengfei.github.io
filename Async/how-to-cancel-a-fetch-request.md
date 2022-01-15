```js
// cancel-fetch.js
// 错误捕捉函数
function to(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
}

// 封装fetch函数
function abortableFetch(request, opts) {
  const controller = new AbortController();
  const signal = controller.signal;
  return {
    abort: () => controller.abort(),
    ready: () => fetch(request, { ...opts, signal }),
  };
}

// 创建一个实例
const RequestInstance = abortableFetch('http://localhost:6254/data', {
  mode: 'no-cors',
});

// 请求函数
async function fn() {
  setTimeout(() => {
    RequestInstance.abort();
  }, 1000);

  const [error, res] = await to(RequestInstance.ready());

  if (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Uh oh, an error!', error);
    }
    return;
  } else {
    console.log('res: ', res);
  }
}

// 调用
fn();
```

控制台中,会打印出 **Fetch aborted** Network 中, status 为 **(canceled)**

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200417165153%20cancel-fetch.jpg
' />

<!--

- Create an 创建一个 AbortController instance 实例
- That instance has a 这个实例有一个 signal property 财产
- Pass the 传球 signal as a fetch option for 作为一个获取选项 signal
- Call the 打电话给 AbortController's 是的 abort property to cancel all fetches that use that signal. 属性取消所有使用该信号的读取

```javascript
const controller = new AbortController();
const { signal } = controller;

fetch('http://localhost:8000', { signal })
  .then(response => {
    console.log(`Request 1 is complete!`);
  })
  .catch(e => {
    console.warn(`Fetch 1 error: ${e.message}`);
  });

// Abort request
controller.abort();

fetch(url, { signal })
  .then(response => {
    return response.text();
  })
  .then(text => {
    console.log(text);
  })
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Uh oh, an error!', err);
    }
  });
```

```javascript
function abortableFetch(request, opts) {
  const controller = new AbortController();
  const signal = controller.signal;

  return {
    abort: () => controller.abort(),
    ready: fetch(request, { ...opts, signal }),
  };
}
```

-->

---

1. [Abortable fetch  |  Web  |  Google Developers](https://developers.google.com/web/updates/2017/09/abortable-fetch)
2. [AbortController - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
