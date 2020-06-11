## telnet

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/telent-1560867710.jpg' width="500px"/>

```bash
telnet www.google.cn 80
Trying 203.208.43.79...
Connected to www.google.cn.
Escape character is '^]'.
```

`Escape character is '^]'`这个意思是 ctrl 键+]这个键，ctrl +] 可以进入 telnet 交互命令行

## ping

仅限 80 端口，命令中无法指定端口

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/ping-1560868031.jpg' width="500px"/>

```bash
ping www.google.cn
PING www.google.cn (203.208.41.63): 56 data bytes
64 bytes from 203.208.41.63: icmp_seq=0 ttl=117 time=32.338 ms
64 bytes from 203.208.41.63: icmp_seq=1 ttl=117 time=32.834 ms
Request timeout for icmp_seq 2
64 bytes from 203.208.41.63: icmp_seq=3 ttl=117 time=44.134 ms
64 bytes from 203.208.41.63: icmp_seq=4 ttl=117 time=33.238 ms
```

## curl

curl 是一个利用 URL 规则在命令行下工作的文件传输工具，可以说是一款很强大的 http 命令行工具。前端可以复制 ajax 请求为 curl 命令行。curl ip:port

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/curl-1560868901.jpg' width="500px"/>

```bash
curl www.google.cn 80

<!DOCTYPE html>
<html lang="zh">
  <meta charset="utf-8">
  <title>Google</title>
   // ...
  </script>

curl: (7) Couldn't connect to server
```

## ssh

```javascript
ssh -T git@github.com

# You've successfully authenticated, but GitHub does not provide shell access.
```
