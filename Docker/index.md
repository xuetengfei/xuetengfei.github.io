<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/dockercommand-1555664077.png'/>

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/uPic/concept-porta的副本-b1aWEi.png' alt='concept-porta的副本-b1aWEi'/>

---

1. [Docker Documentation](https://docs.docker.com/develop/)
2. [Docker Hub](https://hub.docker.com/)
3. [Docker - 从入门到实践 gitbook-1](http://leilux.github.io/lou/docker_practice/introduction/what.html)
4. [Docker - 从入门到实践 gitbook-2](https://yeasy.gitbook.io/docker_practice/introduction/what)

<!--

Union 文件系统
统一文件系统（Union File System）是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下(unite several directories into a single virtual filesystem)。

Union 文件系统是 Docker 镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。

另外，不同 Docker 容器就可以共享一些基础的文件系统层，同时再加上自己独有的改动层，大大提高了存储的效率。

Docker 中使用的 AUFS（AnotherUnionFS）就是一种 Union FS。 AUFS 支持为每一个成员目录（类似 Git 的分支）设定只读（readonly）、读写（readwrite）和写出（whiteout-able）权限, 同时 AUFS 里有一个类似分层的概念, 对只读权限的分支可以逻辑上进行增量地修改(不影响只读部分的)。

 -->
