## 区分

区分一下镜像容器的概念.

Image(镜像):比作于项目源码  
Container(容器):比作于运行起来的项目 app

Container = Image + read_white_layer

## 演示

可以使用一个镜像 image 来创建多个容器,每一个容器有自己的数据读写空间,各自独立和
隔离. 相当于一个类创建多个实例,然后,每个实例有自己变量.

比如:使用同一个 nginx 镜像启动多个容器

```sh
# 用 nginx 镜像启动一个容器,访问`http://localhost:81`，会看到Nginx 欢迎页面。

docker run --name webserver -d -p 81:80 nginx
# 完整的命令如下
# docker container run --name webserver-2 --detach --publish 82:80 nginx


# 多创建几个容器

docker run --name webserver-2 -d -p 82:80 nginx
docker run --name webserver-3 -d -p 83:80 nginx

# 查看一下所有容器

docker container ls -a

# 结果如下

PORTS                               NAMES
0.0.0.0:83->80/tcp, :::83->80/tcp   webserver-3
0.0.0.0:82->80/tcp, :::82->80/tcp   webserver-2
0.0.0.0:81->80/tcp, :::81->80/tcp   webserver

# 现在,我们在 81、82、83 三个端口可以访问 3 台不同的 nginx 服务器.
```

## 制作一个镜像

> 1.使用 Dockfile 文件

1. [docker build: 从 Dockerfile 构建映像](https://docs.docker.com/engine/reference/commandline/build/)

```Dockerfile
FROM ubuntu:16.04
RUN apt-get update \
 && apt install git vim zsh -y \
 && git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh \
 && cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc \
 && exec zsh \
 && cd .oh-my-zsh && upgrade_oh_my_zsh
```

```
➜  docker build -t "test:v.1.0.0" .
Sending build context to Docker daemon 2.048kB
Step 1/2 : FROM ubuntu:16.04
---> 330ae480cb85
Step 2/2 : RUN apt-get update && apt install git vim zsh -y && git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh && cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc && exec zsh && cd .oh-my-zsh && upgrade_oh_my_zsh
---> Running in 18085fb6e182
Get:1 http://security.ubuntu.com/ubuntu xenial-security InRelease [109 kB]

// ...

Cloning into '/root/.oh-my-zsh'...
Removing intermediate container 18085fb6e182
---> 9cda7bb804ce
Successfully built 9cda7bb804ce
Successfully tagged test:v.1.0.0

```

```
<!-- 多了一个 9cda7bb804ce  -->
➜  docker images
REPOSITORY                   TAG                 IMAGE ID            CREATED             SIZE
test                         v.1.0.0             9cda7bb804ce        4 minutes ago       317MB
xtfsdocker/xtf-ubuntu        v1.1                c4a883c65cbc        23 minutes ago      317MB
xtfsdocker/xtf-ubuntu        v1                  deaa25d4ae39        24 hours ago        317MB
node                         12-alpine           057fa4cc38c2        13 days ago         89.3MB
ubuntu                       16.04               330ae480cb85        3 weeks ago         125MB
nginx                        latest              2622e6cca7eb        4 weeks ago         132MB
```

<!-- ```bash
docker run -it  ubuntu:16.04 bash
cat /etc/os-release
apt-get update && apt install git vim zsh -y
git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
exec zsh &&  cd .oh-my-zsh &&  upgrade_oh_my_zsh

````-->

> 2.在现有的基础上进行扩展

1. [docker commit：根据容器的更改创建新图像](https://docs.docker.com/engine/reference/commandline/commit/)

```
➜  docker run -it xtfsdocker/xtf-ubuntu:v1 /bin/bash
root@ae0b85ab015a:/# exit
exit

<!-- 1.列出镜像 -->
➜  docker ps -a
CONTAINER ID        IMAGE                        COMMAND                  CREATED             STATUS                     PORTS                    NAMES
ae0b85ab015a        xtfsdocker/xtf-ubuntu:v1     "/bin/bash"              7 seconds ago       Exited (0) 4 seconds ago                            distracted_lamport
2fd70c36f7df        ubuntu:16.04                 "bas"                    23 hours ago        Created                                             fervent_albattani

<!-- docker commit -->
➜  docker commit -m "x-ubuntu" -a 'xtf' ae0b85ab015a xtfsdocker/xtf-ubuntu:v1.1
sha256:c4a883c65cbc38840b9c2e28b4f61fd3255837f138920de8ed962a40eb5895da

➜  docker images
REPOSITORY                   TAG                 IMAGE ID            CREATED             SIZE
xtfsdocker/xtf-ubuntu        v1.1                c4a883c65cbc        8 seconds ago       317MB
xtfsdocker/xtf-ubuntu        v1                  deaa25d4ae39        23 hours ago        317MB
node                         12-alpine           057fa4cc38c2        13 days ago         89.3MB
ubuntu                       16.04               330ae480cb85        3 weeks ago         125MB
nginx                        latest              2622e6cca7eb        4 weeks ago         132MB
```

---

## Alpine 操作系统镜像

Alpine 操作系统是一个面向安全的轻型 Linux 发行版。使用 Alpine 镜像替换 Ubuntu 基
础镜像，安装软件包时需要用 apk 包管理器替换 apt 工具

```
➜ docker run -it --name xxx --rm alpine
/ #
/ # apk update && apk add curl
fetch http://dl-cdn.alpinelinux.org/alpine/v3.12/main/x86_64/APKINDEX.tar.gz
fetch http://dl-cdn.alpinelinux.org/alpine/v3.12/community/x86_64/APKINDEX.tar.gz
v3.12.0-160-g96d355a76e [http://dl-cdn.alpinelinux.org/alpine/v3.12/main]
v3.12.0-165-g0169509cb9 [http://dl-cdn.alpinelinux.org/alpine/v3.12/community]
OK: 12749 distinct packages available
(1/4) Installing ca-certificates (20191127-r4)
(2/4) Installing nghttp2-libs (1.41.0-r0)
(3/4) Installing libcurl (7.69.1-r0)
(4/4) Installing curl (7.69.1-r0)
Executing busybox-1.31.1-r16.trigger
Executing ca-certificates-20191127-r4.trigger
OK: 7 MiB in 18 packages
/ # curl https://httpbin.org/get
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.69.1",
    "X-Amzn-Trace-Id": ""
  },
  "origin": "",
  "url": "https://httpbin.org/get"
}
```

```
➜ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
ed309bcaafb9        alpine              "/bin/sh"           29 seconds ago      Up 28 seconds                           xxx
```
