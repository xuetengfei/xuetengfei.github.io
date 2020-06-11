接着上篇博客继续。node 可以读写操作文件，同样可以读写文件夹和删除文件文件夹。操作一下。

```javascript
.
├── hello.txt  // 锄禾日当午
└── index.js

0 directory, 2 files
```

```javascript
const fs = require('fs');

fs.mkdir('stuff', () => {
  fs.readFile('hello.txt', 'utf8', (err, data) => {
    fs.writeFile('./stuff/write.txt', data, err => {
      console.log(data); // 锄禾日当午
    });
  });
});
```

```javascript
.
├── hello.txt  // 锄禾日当午
├── index.js
└── stuff
    └── write.txt // 锄禾日当午

1 directory, 3 files
```

完成代码后，我们仔细看一下代码。先创建一个文件夹然后读取一个文件然后写入到另外一个文件，一共分为三个步骤。
每一步代码都是异步的，并且都有一个回调函数，然后，之后的代码都是写在之前异步代码的回调函数里面。这就是回调地狱。上面演示的代码仅仅是嵌套了 3 层，如果工作业务很复杂，需要嵌套 10 层呢，或者更多。
