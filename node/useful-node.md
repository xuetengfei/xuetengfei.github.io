> CronJob

- [cron - npm](https://www.npmjs.com/package/cron)

```javascript
const CronJob = require('cron').CronJob;

const secondTask = num => `*/${num} * * * * *`;
console.log('Before job instantiation');

const job = new CronJob(secondTask(5), function() {
  const d = new Date();
  console.log('now time is', d);
});

console.log('After job instantiation');
job.start();
```

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/node-cron-1.jpg"/>
<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/node-cron-2.jpg"/>

---

- [nodemon - npm](https://www.npmjs.com/package/nodemon)

nodemon 是一个工具，它可以在检测到目录中的文件更改时自动重新启动节点应用程序，从而帮助开发基于 node.js 的应用程序。
nodemon 不需要对代码或开发方法进行任何额外的更改。nodemon 是节点的替换包装器，`在执行脚本时使用 nodemon 替换命令行上的单词 node`。

```javascript
npm install -g nodemon
nodemon index.js
nodemon ./server.js localhost 8080
```

nodemon supports using package.json for configuration.

```javascript
{
  "name": "nodemon",
  "...": "... other standard package.json values",
  "nodemonConfig": {
    "ignore": ["test/*", "docs/*"],
    "delay": "2500"
  }
}
```

Automatic re-running
nodemon 最初是为重新启动挂起的进程（如 Web 服务器）而编写的，但现在支持干净退出的应用程序。如果脚本完全退出，nodemon 将继续监视目录，如果有任何更改，则重新启动脚本。
Manual restarting

```javascript
[nodemon] to restart at any time, enter `rs`
```

Monitoring multiple directories

```javascript
nodemon --watch app --watch libs app/server.js
```

只有在`./app` 或`./libs` 目录中有更改时，nodemon 才会重新启动。默认情况下，nodemon 将遍历子目录，因此不需要显式包含子目录。
不要使用 `unix globbing`传递多个目录，例如`--watch./lib/*`，它不会工作。每个被监视的目录需要一个`--watch` 标志。
nodemon 也可以执行 python 文件，调用 python 解释器，用来调试 python 也非常好用。

---

> A light-weight module that brings window.fetch to Node.js

- [node-fetch - npm](https://www.npmjs.com/package/node-fetch)

> ShellJS is a portable (Windows/Linux/OS X) implementation of Unix shell commands on top of the Node.js API.

- [shelljs](https://www.npmjs.com/package/shelljs)

> tracer:A powerful and customizable logging library for node.js.

- [tracer for node.js - npm](https://www.npmjs.com/package/tracer)

```
npm install tracer --save

var logger = require('tracer').console();
var logger = require('tracer').colorConsole();
var logger = require('tracer').colorConsole({level:'warn'});
```

> debug: A tiny JavaScript debugging utility modelled after Node.js core's debugging technique. Works in Node.js and web browsers.

- [debug - npm](https://www.npmjs.com/package/debug)
