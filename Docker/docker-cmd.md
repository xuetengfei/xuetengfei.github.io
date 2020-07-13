> 查看镜像

```sh
docker images
```

> 查看容器

```sh
docker ps
```

> 查看容器,含已退出的容器

```
docker ps -a
```

> 移除容器

```sh
docker rm <container-id>
```

> 启动、停止、重启 一个容器

```sh
docker start <container-id>
docker stop <container-id>
docker restart <container-id>
```

> 移除本地的镜像

```sh
docker rmi <image-id>
```

在删除镜像之前要先用 docker rm 删掉依赖于这个镜像的所有容器。

> 删除所有 Exit 的 Container

```sh
docker ps -a --filter status=exited --format {{.ID}} | xargs docker rm
```
