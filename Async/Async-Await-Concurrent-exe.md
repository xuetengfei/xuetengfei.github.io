```javascript
const fetch = require('node-fetch');
const api = 'https://www.apiopen.top/weatherApi?city=';

function fetchWeather(cityname) {
  return new Promise((resolve, reject) => {
    fetch(`${encodeURI(api + cityname)}`)
      .then(data => resolve(data.json()))
      .catch(error => reject(error));
  });
}
```

### 方法一:使用 Promise.all

```javascript
const totalApi = `/api/repayment/total`;
const billApi = `/api/repayment/bill`;

async function fetchData() {
  let fetchTotal = axios.get(totalApi);
  let fetchBill = axios.get(billApi);
  const fetchList = [fetchArtotal, fetchBill];
  try {
    const [totalResult, billResult] = await Promise.all(fetchList);
    if (totalResult.data.success) {
      console.log(`${totalResult.data.data}`);
    }
    if (billResult.data.success) {
      console.log(`${billResult.data.data}`);
    }
  } catch (error) {
    console.log('error: ', error);
  }
}

fetchData();
```

### 方法二:创建一个 fetchAll 函数

```javascript
async function fetchAll() {
  const data1 = fetchWeather('深圳');
  const data2 = fetchWeather('北京');
  return {
    data1: await data1,
    data2: await data2,
  };
}

async function getWeatherByAsync() {
  try {
    const result = await fetchAll();
    console.log('result: ', result);
  } catch (error) {
    console.log(error);
  }
}

getWeatherByAsync();

// result:{ data1:{code:200,...},data2:{code:200,...}}
```

注意 fetchAll 函数的写法问题

```javascript
// 正确的写法
async function fetchAll() {
  const data1 = fetchWeather('深圳');
  const data2 = fetchWeather('北京');
  return {
    data1: await data1,
    data2: await data2,
  };
}
```

正确的写法是并发的
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/bingfaqingqiu1548583268.jpg'/>

```javascript
// 错误的写法
async function fetchAll() {
  return {
    data1: await fetchWeather('深圳'),
    data2: await fetchWeather('北京'),
  };
}
```

### 方法三:使用 map

```javascript
async function getALLWeatherByAsync(arr) {
  // 并发读取 url
  const arrPrmoises = arr.map(async v => {
    return await fetchWeather(v);
  });
  // 按次序输出
  for (const v of arrPrmoises) {
    console.log(await v);
  }
}

getALLWeatherByAsync(['深圳', '北京']);

// result:  Array(2)
// -> 0: {code: 200, msg: "成功!", city: "深圳",data: {…}}
// -> 1: {code: 200, msg: "成功!", city: "北京",data: {…}}
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/async-promise-all-1564224362.jpg'/>
