node-cluster.md

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

## PM2 集群模式

使用原生方法有些麻烦而且你还需要处理如果某个工作线程挂掉了等额外的逻辑。 PM2 内
置了处理上述的逻辑，你不用再写这么多繁琐的代码了。

```sh
pm2 start app.js -i 4
```

-i 表示实例程序的个数,就是工作线程。 如果 i 为 0 表示，会根据当前 CPU 核心数创建

### 实时调整集群数量

你可以使用命令 `pm2 scale <app name> <n> `调整你的线程数量， 如
`pm2 scale app +3` 会在当前基础上加 3 个工作线程。

![20220115-Sclygm-PM2-cluster](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220115-Sclygm-PM2-cluster.png)
