<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/dockercommand-1555664077.png'/>

| 说明                       | 命令                          |
| -------------------------- | ----------------------------- |
| 列出镜像                   | docker images                 |
| 移除本地的镜像             | docker rmi <image-id>         |
| 拉取镜像                   | docker pull                   |
| 搜索镜像                   | docker search                 |
| 列出当前运行的容器         | docker ps                     |
| 列出容器列表               | docker ps -a                  |
| 移除容器                   | docker rm <container-id>      |
| 启动容器 1                 | docker run <container-id>     |
| 启动容器 2                 | docker start <container-id>   |
| 停止容器                   | docker stop <container-id>    |
| 暂停容器                   | docker pause <container-id>   |
| 重启容器                   | docker restart <container-id> |
| 列出当前数据卷             | docker volume                 |
| 移除所有 Exit 的 Container | docker container prune        |

移除本地的镜像,在删除镜像之前要先用 docker rm 删掉依赖于这个镜像的所有容器。

> 删除所有 Exit 的 Container

```sh
docker container prune
# or
docker ps -a --filter status=exited --format {{.ID}} | xargs docker rm
```

| 说明       | 命令                        |
| ---------- | --------------------------- |
| 启动容器 2 | docker start <container-id> |
| 停止容器   | docker stop <container-id>  |

> docker container start

docker container run 命令是新建容器，每运行一次，就会新建一个容器。同样的命令运行两次，就会生成两个一模一样的容器文件。如果希望重复使用容器，就要使用 docker container start 命令，它用来启动已经生成、已经停止运行的容器文件。

> docker container stop

docker container kill 命令终止容器运行，相当于向容器里面的主进程发出 SIGKILL 信号。而 docker container stop 命令也是用来终止容器运行，相当于向容器里面的主进程发出 SIGTERM 信号，然后过一段时间再发出 SIGKILL 信号。

这两个信号的差别是，应用程序收到 SIGTERM 信号以后，可以自行进行收尾清理工作，但也可以不理会这个信号。如果收到 SIGKILL 信号，就会强行立即终止，那些正在进行中的操作会全部丢失。

> docker container exec

docker container exec 命令用于进入一个正在运行的 docker 容器。如果 docker run 命令运行容器的时候，没有使用-it 参数，就要用这个命令进入容器。一旦进入了容器，就可以在容器的 Shell 执行命令了。

```
docker container exec -it <containerID> /bin/bash
```

<!--
1. [Docker Documentation](https://docs.docker.com/develop/)
2. [Docker Hub](https://hub.docker.com/)
3. [Docker - 从入门到实践 gitbook-1](http://leilux.github.io/lou/docker_practice/introduction/what.html)
4. [Docker - 从入门到实践 gitbook-2](https://yeasy.gitbook.io/docker_practice/introduction/what)



Union 文件系统
统一文件系统（Union File System）是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下(unite several directories into a single virtual filesystem)。

Union 文件系统是 Docker 镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。

另外，不同 Docker 容器就可以共享一些基础的文件系统层，同时再加上自己独有的改动层，大大提高了存储的效率。

Docker 中使用的 AUFS（AnotherUnionFS）就是一种 Union FS。 AUFS 支持为每一个成员目录（类似 Git 的分支）设定只读（readonly）、读写（readwrite）和写出（whiteout-able）权限, 同时 AUFS 里有一个类似分层的概念, 对只读权限的分支可以逻辑上进行增量地修改(不影响只读部分的)。

 -->
