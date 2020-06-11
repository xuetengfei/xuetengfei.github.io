#### Promise

```javascript
const api =
  'https://cnodejs.org/api/v1/topics?tab=job&&limit=10&&mdrender=false';

async function fetchJson(api) {
  try {
    let request = await fetch(api);
    return await request.json();
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
}

fetchJson('http://example.com/api').then(obj => console.log(obj));
```

#### Async

```javascript
async function fetchJson(url) {
  try {
    let request = await fetch(url);
    let text = await request.text();
    return JSON.parse(text);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
}

// 完整的调用方法如下

fetchJson('http://example.com/api').then(obj => console.log(obj));
```

### 方式一:返回的是 axios 执行后的的 promise 对象

```javascript
import axios from 'axios';
const api = '/api/order/getStatus';

export function getStatus() {
  return axios
    .get(api)
    .then(res => {
      return Promise.resolve(res.data);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}
```

[Promise.resolve() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

### 方式二:返回的是 promise 对象

```javascript
import axios from 'axios';
const api = '/api/order/getStatus';

// get
export function getData() {
  return new Promise((resolve, reject) => {
    axios
      .get(api)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
// post
export function postData(url, body) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, body)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
```

## 封装异步调用接口,加载中有 loding 状态显示

```javascript
import { Indicator } from 'mint-ui';
import axios from 'axios';

export default {
  getLoading(url, opt) {
    Indicator.open();
    return axios
      .get(url, opt)
      .then(res => {
        Indicator.close();
        return Promise.resolve(res);
      })
      .catch(err => {
        Indicator.close();
        return Promise.reject(err);
      });
  },
  postLoading(url, opt) {
    Indicator.open();
    return axios
      .post(url, opt)
      .then(res => {
        Indicator.close();
        return Promise.resolve(res);
      })
      .catch(err => {
        Indicator.close();
        return Promise.reject(err);
      });
  },
};
```

---

1. [axios 说明文档](https://www.kancloud.cn/yunye/axios/234845)
