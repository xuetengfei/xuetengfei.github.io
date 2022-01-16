# Node cluster 模块

> Node.js 的单个实例在单个线程中运行。为了利用多核系统，用户有时会想要启动一组
> Node.js 进程来处理负载。集群模块允许轻松创建所有共享服务器端口的子进程。  
> [Cluster | Node.js v17.3.1 Documentation](https://nodejs.org/api/cluster.html)

## 单线程遇到瓶颈

<!-- How to use the Node.js cluster module to take advantage of a multi-core processor in your production environment. -->

从本质上讲，JavaScript 是一种单线程语言。这意味着，当告诉 JavaScript 完成一组指
令（例如，创建 DOM 元素、处理按钮单击或在 Node.js 中从文件系统读取文件）时，以线
性方式一次处理每个指令。

无论它在哪台计算机上运行，它都会执行此操作。如果计算机具有 8 核处理器和 64GB 内
存，那么在该计算机上运行的任何 JavaScript 代码都将在单个线程或内核中运行。

相同的规则适用于 Node.js 应用程序。因为 Node.js 基于 V8 JavaScript 引擎，适用于
JavaScript 的相同规则也适用于 Node.js。

在构建 Web 应用程序时，这可能会让人头疼。随着应用程序越来越受欢迎（或复杂性）并
需要处理更多的请求和额外的工作，如果只依赖单个线程来处理该工作，将遇到瓶颈——请求
丢失、服务器无响应、或中断已经在服务器上运行的工作。

集群模块通过分散 Node.js 应用程序的工作负载，帮助我们充分利用一个服务器的处理能
力。例如，如果我们有一个 8 核处理器，而不是我们的工作被隔离到只有一个核心，我们
可以将其扩展到所有八个核心。

nodejs 单机多进程（集群）

## 原生集群模式

Node.js 默认单进程运行，对于多核 CPU 的计算机来说，这样做效率很低，因为只有一个
核在运行，其他核都在闲置。cluster 模块就是为了解决这个问题而提出的。 cluster 模
块允许设立一个主进程和若干个 worker 进程，由主进程监控和协调 worker 进程的运行
。worker 之间采用进程间通信交换消息，cluster 模块内置一个负载均衡器，采用
Round-robin 算法协调各个 worker 进程之间的负载。运行时，所有新建立的链接都由主进
程完成，然后主进程再把 TCP 连接分配给指定的 worker 进程。使用原生集群模式更充分
的"压榨" 机器性能了，提高应用程序吞吐量。

可以不受 CPU 核心限制的创建任意多个工作线程。产生大于内核的数量的大量进程可能并
不好，因为在较低级别，操作系统可能会平衡这些进程之间的 CPU 时间。

[cluster 集群 | Node.js API 文档](http://nodejs.cn/api/cluster.html)

```javascript
const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();
const pid = process.pid;
const numCPUs = os.cpus().length;

app.get('/', function (_req, res) {
  res.json({ success: true, pid });
  // cluster.worker.kill();
});

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; ++i) {
    cluster.fork();
  }
  cluster.on('exit', function (worker, code, signal) {
    console.log(`worker ${worker.process.pid} is died`);
    cluster.fork();
  });
} else {
  app.listen(3200, () => {
    console.log(`is running on 3200,pid is ${pid}`);
  });
}

// app.listen(3200, () => {
//   console.log(`is running on 3200,pid is ${pid}`);
// });
```

没有 Node.js 集群：所有请求都转发到单个处理器核心
![20220115-cBbzeO-163_2215333359_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220115-cBbzeO-163_2215333359_.jpg)

使用 Node.js 集群支持：请求分布在所有处理器内核上。
![20220115-nBYML7-164_2215334059_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220115-nBYML7-164_2215334059_.jpg)

使用 cluster，第一个核心成为“master”，所有额外的核心成为“worker”。  
当请求进入应用程序时，主进程会执行轮询式检查，询问“哪个工作人员现在可以处理这个
请求？” 第一个满足要求的 worker 获得请求。

## PM2 集群模式

使用原生方法有些麻烦而且还需要处理如果某个工作线程挂掉了等额外的逻辑。  
PM2 内置了处理上述的逻辑，不用再写这么多繁琐的代码了。

### 拉起 4 个工作线程

```sh
pm2 start app.js -i 4
```

-i 表示实例程序的个数,就是工作线程。 如果 i 为 0 表示，会根据当前 CPU 核心数创建

### 实时调整集群数量

可以使用命令 `pm2 scale <app name> <n> `调整你的线程数量，  
如 `pm2 scale app +3` 会在当前基础上加 3 个工作线程。

![20220115-Sclygm-PM2-cluster](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220115-Sclygm-PM2-cluster.png)

---

1. [Cluster | Node.js v17.3.1 Documentation](https://nodejs.org/api/cluster.html)
2. [How to Add Cluster Support to Node.js | CheatCode](https://cheatcode.co/tutorials/how-to-add-cluster-support-to-node-js)
3. [Improving Node.js Application Performance With Clustering | AppSignal Blog](https://blog.appsignal.com/2021/02/03/improving-node-application-performance-with-clustering.html)
