### 概念

```javascript
// 继发一
async function loadData() {
  var res1 = await fetch(url1);
  var res2 = await fetch(url2);
  var res3 = await fetch(url3);
  return 'whew all done';
}
// 继发二
async function loadData(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
```

### 实用场景

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

const fetchData = async function() {
  try {
    const r1 = await fetchWeather('深圳');
    console.log(r1);
    const r2 = await fetchWeather('北京');
    console.log(r2);
  } catch (error) {
    console.log('error: ', error);
  }
};

fetchData();

// -> r1: {code: 200, msg: "成功!", city: "深圳",data: {…}}
// -> r2: {code: 200, msg: "成功!", city: "北京",data: {…}}
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/promise-order-fetch-1564267930.jpg'/>

<!--
 <img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/async-loop-1.1.jpg" />
<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/async-loop-1.2.jpg" />
 -->
