| 说明               | 命令                          |
| ------------------ | ----------------------------- |
| 列出镜像           | docker images                 |
| 拉取镜像           | docker pull                   |
| 搜索镜像           | docker search                 |
| 列出当前运行的容器 | docker ps                     |
| 列出容器列表       | docker ps -a                  |
| 移除容器           | docker rm <container-id>      |
| 启动容器 1         | docker run <container-id>     |
| 启动容器 2         | docker start <container-id>   |
| 停止容器           | docker stop <container-id>    |
| 暂停容器           | docker pause <container-id>   |
| 重启容器           | docker restart <container-id> |
| 移除本地的镜像     | docker rmi <image-id>         |

移除本地的镜像,在删除镜像之前要先用 docker rm 删掉依赖于这个镜像的所有容器。

> 删除所有 Exit 的 Container

```sh
docker ps -a --filter status=exited --format {{.ID}} | xargs docker rm
```
