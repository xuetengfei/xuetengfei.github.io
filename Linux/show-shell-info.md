将帮助信息写在 Bash 脚本脚本的头部，然后只要执行"sh some.sh","sh some.sh help",或者就能输出这段帮助信息

docker run -it --rm alpine

```
/tmp # pwd
/tmp

/tmp # ls
a.sh

/tmp # cat a.sh
#!/bin/bash

### 脚本的备注
### 没有参数的时候，打印出来备注

help() {
    sed -rn 's/^### ?//;T;p' "$0"
}

if [[ $# == 0 ]] || [[ "$1" == "-h" ]]; then
    help
    exit 1
fi

echo Hello World

/tmp # sh a.sh
脚本的备注
没有参数的时候，打印出来备注

/tmp #
```

---

1. [samizdat-shell-help.bash](https://gist.github.com/kovetskiy/a4bb510595b3a6b17bfd1bd9ac8bb4a5)
1. [Help message for shell scripts — samizdat](https://samizdat.dev/help-message-for-shell-scripts/)
