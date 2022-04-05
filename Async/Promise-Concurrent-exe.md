?> **Promise.all** 是 Promise 构造函数本身的方法，而不是 Promise.prototype 上面
的函数。promise.then 方法一个接一个地运行异步函数。如果顺序无关紧要,可以通过
**Promise.all**来实现。它接受一组函数并返回另一个 Promise。如果任何一个异步函数
调用拒绝，则 Promise.all 立即终止。

### 并发语法

```javascript
Promise.all([async1, async2, async3])
  .then(values => {
    console.log(values); //  values is a array of resolved
    return values;
  })
  .catch(err => {
    console.log('error', err);
  });
```

### 实际应用

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

Promise.all(arr.map(v => fetchWeather(v)))
  .then(values => {
    console.log(values);
    // array of resolved values,in same order as function array
  })
  .catch(err => {
    console.log('error', err);
    // called on any reject
  });

// (2) [{…深圳}, {…北京}]
// -> 0: {code: 200, msg: "成功!", city: "深圳",data: {…}}
// -> 1: {code: 200, msg: "成功!", city: "北京",data: {…}}
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/async-promise-all-result-1564224667.jpg'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/async-promise-all-1564224362.jpg'/>

<!-- ### async 写法

```javascript
const api = 'https://www.apiopen.top/weatherApi?city=';

function fetchWeather(cityname) {
  const executor = (resolve, reject) => {
    fetch(`${api}${cityname}`, { mode: 'cors' })
      .then(data => resolve(data.json()))
      .catch(error => reject(error));
  };
  return new Promise(executor);
}

async function getALLWeatherByAsync() {
  const arr = ['深圳', '北京'];
  try {
    const result = await Promise.all(arr.map(v => fetchWeather(v)));
    console.log('result: ', result);
  } catch (error) {
    console.log(error);
  }
}

getALLWeatherByAsync();

// (2) [{…深圳}, {…北京}]
// -> 0: {code: 200, msg: "成功!", city: "深圳",data: {…}}
// -> 1: {code: 200, msg: "成功!", city: "北京",data: {…}}
``` -->

<!-- <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/bingfaqingqiu1548583268.jpg'/> -->
