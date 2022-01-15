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

## 原生集群模式

原生 Node.js 群集模块是在单机上扩展 Node 应用程序的基本方法，在同一台机器上的多
进程。

进程的一个实例（称为“master”）是负责生成其他子进程（称为“worker”）的实例，在同一
端口上公开服务。在如今机器的 CPU 都是多核的背景下，使用原生集群模式更充分的" 压
榨" 机器性能了，提高应用程序吞吐量。

Node.js 的集群模块，简单讲就是复制一些可以共享 TCP 连接的工作线程。集群模块会创
建一个 master 主线程，然后复制任意多份程序并启动，这叫做工作线程。工作线程通过
IPC 频道进行通信并且使用了 Round-robin algorithm 算法进行工作调度以此实现负载均
衡。 Round-robin 调度策略主要是 master 主线程负责接收所有的连接并派发给下面的各
个工作线程。

可以不受 CPU 核心限制的创建任意多个工作线程。产生大于内核的数量的大量进程可能并
不好，因为在较低级别，操作系统可能会平衡这些进程之间的 CPU 时间。

[cluster 集群 | Node.js API 文档](http://nodejs.cn/api/cluster.html)

```javascript
const cluster = require('cluster');
const http = require('http');
const os = require('os');
const pid = process.pid;

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  // Master:
  // Let's fork as many workers as you have CPU cores
  for (let i = 0; i < numCPUs; ++i) {
    cluster.fork();
    // 注：通过 fork()复制的进程都是独立的进程，有着全新的 V8 实例
  }
} else {
  // Worker:
  // Let's spawn a HTTP server
  // (Workers can share any TCP connection.
  //  In this case its a HTTP server)
  http
    .createServer(function (req, res) {
      res.writeHead(200);
      res.end(`ok......${pid}`);
    })
    .listen(8080);
}
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

1.[How to Add Cluster Support to Node.js | CheatCode](https://cheatcode.co/tutorials/how-to-add-cluster-support-to-node-js)
