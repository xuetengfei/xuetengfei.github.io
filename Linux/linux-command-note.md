## tar api

- Create an archive from files: tar cf target.tar file1 file2 file3

- Create a gzipped archive: tar czf target.tar.gz file1 file2 file3

- Create a gzipped archive from a directory using relative paths: tar czf
  target.tar.gz -C path/to/directory .

- Extract a (compressed) archive into the current directory: tar xf
  source.tar[.gz|.bz2|.xz]

- Extract a (compressed) archive into the target directory: tar xf
  source.tar[.gz|.bz2|.xz] -C directory

- Create a compressed archive, using archive suffix to determine the compression
  program: tar caf target.tar.xz file1 file2 file3

- List the contents of a tar file: tar tvf source.tar

- Extract files matching a pattern: tar xf source.tar --wildcards "\*.html"

- Extract a specific file without preserving the folder structure: tar xf
  source.tar source.tar/path/to/extract --strip-components=depth_to_strip

## generate-random-password

最简单的方法

```bash
$ date | md5sum
$ date | md5  # OSX
# 2085e02c7c22926a6fbf9c126a4cad17  -
```

1. [八种在 Linux 上生成随机密码的方法 - 众成翻译](https://www.zcfy.cc/article/8-ways-to-generate-random-password-in-linux)

## 查看 mac 电脑 cpu 的具体型号、核数、线程数

```bash
sysctl machdep.cpu | grep count

machdep.cpu.core_count: 4
machdep.cpu.thread_count: 8
```

## 你明白 shell、bash 和 zsh 等词的真正含义吗？

[你明白 shell、bash 和 zsh 等词的真正含义吗？ - 知乎](https://zhuanlan.zhihu.com/p/34197680)

terminal 一个程序，是界面上打开的黑框框本身，比如 xterm、kvt 等。shell 运行于其
中。

shell 概念 shell 是一个命令行解释器，顾名思义就是机器外面的一层壳，用于人机交互
，只要是人与电脑之间交互的接口，就可以称为 shell。表现为其作用是用户输入一条命令
，shell 就立即解释执行一条。不局限于系统、语言等概念、操作方式和表现方式等。 比
如我们平时在黑框框里输入命令，叫 command-line interface (CLI)；在屏幕上点点点，
叫 graphical user interface (GUI)

类型常见的 shell 解释器有 sh、bash 这两种，其他的 ksh、csh 和 zsh 等是不常见的
。Mac OS 中默认安装了以上所有类型，Windows 需要自行安装，Linux 更不用说了。就像
上面说的，只要一门语言有解释器，就可以作为 shell 使用。比如 Java 有第三方解释器
Jshell，PHP 有 PHP Shell。如果你用过 windows，那你对 cmd 这个词一定不陌生，它是
windows shell，官方名称叫做 command interpreter。

Bash 是最常见的 shell，bash 是 shell 的超集，具有更优雅的语法和更多的功能。Mac
中默认 shell 就是 bash。 zsh 很多人的 mac 中会使用 zsh 而不是 bash，一大半是因为
oh-my-zsh 这个配置集，它兼容 bash，还有自动补全等好用的功能。

shell 在启动时都会去找配置文件，然后运行它。你安装的一些脚本，如果想让它能够全局
运行，就需要在配置文件中设置路径。有过设置路径后还是不管用的经历吗？多半是因为把
配置写在了错误的配置文件里。应该在配置 shell（最常见的是配置默认命令）之前，使用
`echo $SHELL`，确认自己现在用的是什么 shell 后，再去编辑对应的配置文件.

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20211128-LMcsWz-0__CrxqGCSzirCUHoo.png' alt='20211128-LMcsWz-0__CrxqGCSzirCUHoo'/>
