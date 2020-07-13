卷提供了将容器的特定文件系统路径连接回主机的能力。如果挂载了容器中的目录，那么在主机上也可以看到该目录中的更改。如果我们在容器重新启动时挂载相同的目录，我们会看到相同的文件

> 1.挂载一个主机文件作为数据卷

```sh
docker run -it --rm -v ~/Desktop/test.md:/test.md ubuntu:16.04 bash
apt-get update && apt install vim

```

使用 **`-v`** 标记可以指定挂载一个本地主机的文件到容器中去。在 container 内去修改 test.md 那么，本地主机的 test.md 文件也会有相应的改动。这里是单个文件，也可以是一个目录。
我的理解：可以看作为软链接。`ln -s path/to/file path/to/symlink`

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/uPic/docker-LqmHNH.jpg' alt='docker-LqmHNH'/>

> 2.创建一个数据卷

```md
<!-- 创建一个命名数据卷，比如 host-data -->

docker volume create host-data

<!-- 查看一下 -->

docker volume ls

<!-- 打印结果 -->

| DRIVER | VOLUME NAME |
| ------ | ----------- |
| local  | host-data   |

<!-- run container 的时候，挂载 volume 并指定 挂载位置 -->

docker run -it --rm -v host-data:/root ubuntu:16.04 bash
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/uPic/docker-NeDiYl.jpg' alt='docker-NeDiYl'/>

图片步骤 6 和 7，我打错字了，问题不大。
