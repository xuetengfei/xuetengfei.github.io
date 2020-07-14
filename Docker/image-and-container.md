<!-- <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/uPic/concept-porta的副本-b1aWEi.png' alt='concept-porta的副本-b1aWEi'/> -->

制作一个镜像

> 1.在现有的基础上进行扩展

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

> 2.使用 Dockfile 文件

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
