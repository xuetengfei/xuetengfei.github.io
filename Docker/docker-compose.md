# Compose v2

Compose 项目是 Docker 官方的开源项目，负责实现对 Docker 容器集群的快速编排。目前
Docker 官方用 GO 语言 重写 了 Docker Compose，并将其作为了 docker cli 的子命令，
称为 Compose V2。你可以参照官方文档安装，然后将熟悉的 docker-compose 命令替换为
docker compose，即可使用 Docker Compose。

```sh
➜  $ docker --help

Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default "/Users/gaze/.docker")
  -c, --context string     Name of the context to use to connect to the daemon (overrides DOCKER_HOST
                           env var and default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level ("debug"|"info"|"warn"|"error"|"fatal") (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default "/Users/gaze/.docker/ca.pem")
      --tlscert string     Path to TLS certificate file (default "/Users/gaze/.docker/cert.pem")
      --tlskey string      Path to TLS key file (default "/Users/gaze/.docker/key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Management Commands:
  builder     Manage builds
  buildx*     Build with BuildKit (Docker Inc., v0.6.1-docker)
  compose*    Docker Compose (Docker Inc., v2.0.0-rc.3)
  config      Manage Docker configs
```

## 两个重要的概念

Compose 中有两个重要的概念：

- 服务 (service)：一个应用的容器，实际上可以包括若干运行相同镜像的容器实例。
- 项目 (project)：由一组关联的应用容器组成的一个完整业务单元，在
  docker-compose.yml 文件中定义。

Compose 的默认管理对象是项目，通过子命令对项目 中的一组容器进行便捷地生命周期管
理。 调用了 Docker 服务提供的 API 来对容器进行管理。因此，只要所操作的平台支持
Docker API，就可以在其上利用 Compose 来进行编排管理。

Compose 支持 Linux、macOS、Windows 10 三大平台。 Docker Desktop for Mac/Windows
自带 docker-compose 二进制文件，安装 Docker 之后可以直接使用。

```sh
➜  $ docker-compose --version
docker-compose version 1.29.2, build 5becea4c
```
