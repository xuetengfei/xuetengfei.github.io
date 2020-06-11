之前我们学习 node 读写文件的代码，是下面这样的

```javascript
// test.txt

this is a txt file!
```

```javascript
// index.js
const fs = require('fs');
let temp = fs.readFileSync('test.txt', 'utf8');
console.log(temp); // this is a txt file!
```

`readFileSync`里面`Sync`是同步的意思，我们换成另外一个方法`readFile`

```javascript
const fs = require('fs');
fs.readFile('test.txt', 'utf8', function(err, data) {
  console.log(data);
});

console.log('task end');

// task end
// this is a txt file!
```

通过打印结果的顺序，我们可以知道`readFile`是异步的。

```javascript
const fs = require('fs');

// 异步代码进入事件队列，不阻塞后续代码执行
fs.readFile('test.txt', 'utf8', function(err, data) {
  console.log(data);
});

// 同步耗时代码，阻塞后续代码执行
const waitTill = new Date(new Date().getTime() + 3 * 1000);
while (waitTill > new Date()) {}

console.log('task end');
```

<!-- 注意：node里面的异步方法都要传入回调函数 -->

下面是异步的写法，在 node 中最佳代码都要写出异步的，非阻塞的。

```javascript
const fs = require('fs');
fs.readFile('test.txt', 'utf8', function(err, data) {
  console.log(data);
  fs.writeFile('write.txt', data, () => {
    console.log('write file finished');
  });
});
console.log('task end');

// task end
// this is a txt file!
// write file finished
```
