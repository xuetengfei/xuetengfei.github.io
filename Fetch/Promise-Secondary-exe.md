```javascript
const api = 'https://www.apiopen.top/weatherApi?city=';
const arr = ['深圳', '北京'];

function fetchWeather(cityname) {
  const executor = (resolve, reject) => {
    fetch(`${api}${cityname}`, { mode: 'cors' })
      .then(data => resolve(data.json()))
      .catch(error => reject(error));
  };
  return new Promise(executor);
}

(async () => {
  for (let city of arr) {
    await fetchWeather(city);
  }
})();
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/promise-order-fetch-1564267930.jpg'/>

经常会遇到这种情况，比如有下面一个数组,对这个数组 promise 数组依次执行，要每隔 2 秒依次问候数组中的人，于是我们将 setTimeout 包装成一个 promise.(类似之前的红绿灯的问题)

```javascript
let arr = ['tom', 'lucy', 'jeke'];

let func = name => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('hello, ' + name);
      resolve();
    }, 2000);
  });
};

let sayHello = () => {
  func(arr[0])
    .then(() => {
      return func(arr[1]);
    })
    .then(() => {
      return func(arr[2]);
    });
};

// 可以用 reduce 进行串联累加,注意这里的初始值给的是 `Promise.resolve()`
let sayHello = () => {
  arr.reduce((result, man) => {
    return result.then(() => {
      return func(man);
    });
  }, Promise.resolve());
};

sayHello();

// hello, tom
// hello, lucy
// hello, jeke
```
