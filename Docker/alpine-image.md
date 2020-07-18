> Alpine

Alpine 操作系统是一个面向安全的轻型 Linux 发行版。使用 Alpine 镜像替换 Ubuntu 基础镜像，安装软件包时需要用 apk 包管理器替换 apt 工具

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
