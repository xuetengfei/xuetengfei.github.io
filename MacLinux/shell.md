1、Shell 脚本,就是利用 Shell 的命令解释的功能，对一个纯文本的文件进行解析，然后执行这些功能，也可以说 Shell 脚本就是一系列命令的集合。

2、Shell 可以直接使用在 win/Unix/Linux 上面，并且可以调用大量系统内部的功能来解释执行程序，如果熟练掌握 Shell 脚本，可以让我们操作计算机变得更加轻松，也会节省很多时间。

3、Shell 是一种脚本语言，那么，就必须有解释器来执行这些脚本，常见的脚本解释器有：
（1）、bash：是 Linux 标准默认的 shell。bash 由 Brian Fox 和 Chet Ramey 共同完成，是 BourneAgain Shell 的缩写，内部命令一共有 40 个。
（2）、sh： 由 Steve Bourne 开发，是 Bourne Shell 的缩写，sh 是 Unix 标准默认的 shell。
另外还有：ash、 csh、 ksh 等。

常见的编程语言分为两类：一个是编译型语言，如：c/c++/java 等，它们远行前全部一起要经过编译器的编译。另一个解释型语言，执行时，需要使用解释器一行一行地转换为代码，如：awk, perl, python 与 shell 等。

### 使用场景，能做什么

（1）将一些复杂的命令简单化(平时我们提交一次 github 代码可能需要很多步骤，但是可以用 Shell 简化成一步)

（2）可以写一些脚本自动实现一个工程中自动更换最新的 sdk(库)

（3）自动打包、编译、发布等功能

（4）清理磁盘中空文件夹

总之一切有规律的活脚本都可以尝试一下

### 写一个自动输入命令的脚本

自动提交 github 仓库的脚本

```bash
#!/bin/bash
# 上面中的 #! 是一种约定标记, 它可以告诉系统这个脚本需要什么样的解释器来执行;
echo "-------Auto Git Begin-------"
git add .
now="$(date +"%Y-%m-%d %H:%M")"
git commit -m "$1 ${now}"
echo "****************** commit is:$1 ${now} ******************"
git push origin master
echo "--------End--------"
```

注意`date +`之间的空格。
执行脚本的时候注意：

1.授权使用，需要 `chmod +x ./autoGit.sh` 授权，使用 `./autoGit.sh 参数`

2.也可以 `sh autoGit.sh 参数`

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/auto-shell-git.jpg"  width="550px">

---

参考链接：

1. [学懂 Shell 脚本 ](https://www.cnblogs.com/gaosheng-221/p/6794429.html)
