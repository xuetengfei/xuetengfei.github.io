### 描述

`race:比赛`。Promise.race（）与 Promise.all（）类似，只是它会在 first Promise 解析或拒绝后立即解析或拒绝。只有最快的基于 Promise 的异步函数才能完成：

Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。

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

Promise.race(arr.map(v => fetchWeather(v)))
    .then(values => {
        console.log(values);
    })
    .catch(err => {
        console.log('error', err);
    });
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/promise-race-1-1564292929.jpg'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/promise-race-2-1564292929.jpg'/>

### MDN 示例

```javascript
var p1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 500, 'one');
});
var p2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 100, 'two');
});

Promise.race([p1, p2]).then(function(value) {
    console.log(value); // "two"
    // 两个都完成，但 p2 更快  Both resolve, but promise2 is faster
});

var p3 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 100, 'three');
});
var p4 = new Promise(function(resolve, reject) {
    setTimeout(reject, 500, 'four');
});

Promise.race([p3, p4]).then(
    function(value) {
        console.log(value); // "three"
        // p3 更快，所以它完成了
    },
    function(reason) {
        // 未被调用
    },
);

var p5 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 500, 'five');
});
var p6 = new Promise(function(resolve, reject) {
    setTimeout(reject, 100, 'six');
});

Promise.race([p5, p6]).then(
    function(value) {
        // 未被调用
    },
    function(reason) {
        console.log(reason); // "six"
        // p6 更快，所以它失败了
    },
);
```
