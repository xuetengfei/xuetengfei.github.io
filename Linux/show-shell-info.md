将帮助信息写在 Bash 脚本脚本的头部，然后只要执行"sh some.sh","sh some.sh help",或者就能输出这段帮助信息

docker run -it --rm xue/alpine:1.0.2

```
/ # pwd
/

/ # ls
bin        etc        lib        mnt        proc       root       sbin       sys        usr
dev        home       media      opt        readme.sh  run        srv        tmp        var

/ # cat readme.sh
#!/bin/bash

### alpine 如何安装软件呢？
### apk update
### apk add packageName


help() {
    sed -rn 's/^### ?//;T;p' "$0"
}

if [[ $# == 0 ]] || [[ "$1" == "-h" ]]; then
    help
    exit 1
fi

echo 直接执行该脚本

/ # sh readme.sh
alpine 如何安装软件呢？
apk update
apk add packageName

/ #
```

---

1. [samizdat-shell-help.bash](https://gist.github.com/kovetskiy/a4bb510595b3a6b17bfd1bd9ac8bb4a5)
1. [Help message for shell scripts — samizdat](https://samizdat.dev/help-message-for-shell-scripts/)
