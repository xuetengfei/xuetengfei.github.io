主要分为`请求`和`响应`两种拦截器,请求拦截一般就是配置对应的请求头信息(适用与常见请求方法,虽然 ajax 的 get 方法没有请求头,但是 axios 里面进行啦封装),响应一般就是对 reponse 进行拦截处理,如果返回结果为[]可以转化为 0

1.请求拦截:注入 token

```javascript
import axios from 'axios';

axios.interceptors.request.use(
  config => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      config.headers.token = userToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
```

2.响应拦截:处理 reponse 的结果

```javascript
axios.interceptors.response.use(response => {
  let data = response.data;
  if (response.request.responseType === 'arraybuffer' && !data.length) {
    reponse.date = 0;
  }
});
```

---

1. [axios-文档](https://www.kancloud.cn/yunye/axios/234845)
