# Linux

> 目录

| 目录           | 常见目录说明                                                       |
| -------------- | ------------------------------------------------------------------ |
| /bin           | 存放二进制可执行文件(ls, cat, mkdir 等)，常用命令一般都在这里      |
| /boot          | 存放用于系统引导时使用的各种文件                                   |
| /etc           | 存放系统管理和配置文件                                             |
| /home          | 存放所有用户文件的根目录，是用户主目录的基点                       |
| /usr/bin       | 众多的应用程序                                                     |
| /usr/doc       | linux 文档                                                         |
| /usr/lib       | 常用的动态链接库和软件包的配置文件                                 |
| /usr/local/bin | /usr/local/bin 本地增加的命令                                      |
| /usr/local/lib | 本地增加的库                                                       |
| /root          | 超级用户（系统管理员）的主目录                                     |
| /lib           | 存放跟文件系统中的程序运行所需要的共享库及内核模块。动态链接共享库 |

> 权限

Unix 传统中的操作系统不同于那些 MS-DOS 系统(微軟磁碟作業系統)，区别在于它们不仅
是多任务系统，而且也是 多用户系统。这到底意味着什么？它意味着多个用户可以在同一
时间使用同一台计算机。然而一个典型的计算机可能只有一个键盘和一个监视器，但是它仍
然可以被多个用户使用。例如，如果一台计算机连接到一个网络或者因特网，那么远程用户
通过 ssh（安全 shell）可以登录并操纵这台电脑。 事实上，远程用户也能运行图形界面
应用程序，并且图形化的输出结果会出现在远端的显示器上。 X 窗口系统把这个作为基本
设计理念的一部分，并支持这种功能。”

“Linux 系统的多用户性能，不是最近的“创新”，而是一种特性，它深深地嵌入到了 Linux
操作系统的 设计过程中。”

摘录来自: Unknown. “The Linux Command Line 中文版。” Apple Books.

```
id – 显示用户身份号
chmod – 更改文件模式
umask – 设置默认的文件权限
su – 以另一个用户的身份来运行 shell
sudo – 以另一个用户的身份来执行命令
chown – 更改文件所有者
chgrp – 更改文件组所有权
passwd – 更改用户密码
```

> 读取，写入，和执行

```bash
-rw-rw-r-- 1 me   me   0 2008-03-06 14:52 foo.txt
```

十个字符是文件的属性, 这十个字符的第一个字符表明文件类型, 常见的有: `-` 代表普通
文件， `d` 代表文件夹。 后面 9 个长度的字符，3 个一组，共三组。表示: 文件所有者
，文件组所有者，和其他人读(r)，写(w)，执行权(x)。

> chmod － 更改文件模式

更改文件或目录的模式（权限），可以利用 chmod 命令。  
注意只有文件的所有者(owner)或者超级用户才(admin) 能更改文件或目录的模式。  
chmod 命令支持两种不同的方法来改变文件模式：八进制数字表示法，或 符号表示法。

1.八进制数字表示法  
二进制转为八进制后,数字相加,就会得到一个权限编码。通过使用 3 个八进制数字，我们
能够设置文件所有者，用户组，和其他人的权限。
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/blog-images/2020-09-30-1080873691.jpg' width='500px'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/blog-images/iShot2020-09-30-14.02.35.jpg' width='500px'/>

2.符号表示法

chmod 命令支持一种符号表示法，来指定文件模式。符号表示法分为三部分：更改会影响谁
， 要执行哪个操作，要设置哪种权限。通过字符 “u”，“g”，“o”，和 “a” 的组合来指定要
影响的对象， u 是"user"的简写，意思是文件或目录的所有者。 g 是用户组。 o 是
"others" 的简写，意思是其他所有的人。 a 是 "all"的简写，是"u", "g"和“o”三者的联
合。如果没有指定字符，则假定使用”all”。执行的操作可能是一个“＋”字符，表示加上一
个权限， 一个 “－”，表示删掉一个权限，或者是一个“＝”，表示只有指定的权限可用，其
它所有的权限被删除。权限由 “r”，“w”，和 “x” 来指定。

```bash
chmod u+x foo.txt # 给user加上执行权限
chmod u+x,go=rw  foo.txt # 给user加上执行权限,g和o只是读写权限
```

> 用户

| 命令提示符         | 命令提示符                                                                         |
| :----------------- | :--------------------------------------------------------------------------------- |
| [root@xiaoming ~]# | root 当前登录用户 localhost 主机名 ~ 当前工作目录提示符 超级用户是 #, 普通用户是\$ |
| whoami             | 显示登录的用户名                                                                   |
| groups zhangsan    | 显示 zhangsan 用户所在的所有组                                                     |

> 使用命令

| 命令提示符 | 命令提示符               |
| :--------- | :----------------------- |
| type cp    | cp is an alias for cp -i |
| which mv   | /bin/mv                  |

> cd

| 命令提示符    | 命令提示符                                         |
| :------------ | :------------------------------------------------- |
| cd            | 更改工作目录到你的家目录。                         |
| cd -          | 更改工作目录到先前的工作目录。                     |
| cd ~user_name | 例如, cd ~bob 会更改工作目录到用户“bob”的家目录。” |

> ls

| 命令提示符 | 命令提示符               |
| :--------- | :----------------------- |
| ls -a      | 显示全部文件，含隐藏文件 |
| ls -l      | 以长格式显示             |
| ls -lt     | 按照时间排序             |
| ls -ltr    | 按照时间 倒序排序        |
| ls -lS     | 按照文件大小排序         |
| ls -li     | 显示文件的文件索引节点号 |

> cp

| 命令提示符         | 命令提示符                                    |
| :----------------- | :-------------------------------------------- |
| cp 1.md 2.md       | 复制 1.md 的内容到 2.md                       |
| cp -i 1.md 2.md    | 2.md 存在的话, 交互提醒                       |
| cp 1.md 2.md ./dir | 复制 1.md 2.md 文件到 dir。dir 文件夹必须存在 |
| cp dir1/\* dir2    |                                               |
| cp -v dir1/\* dir2 | 显示操作结果 verbose 详细的                   |

> mv

| 命令提示符          | 命令提示符                                |
| :------------------ | :---------------------------------------- |
| mv dir1 dir2        | dir2 存在: 移动.dir2 不存在: 重命名       |
| mv -i dir1 dir2     | dir2 存在的时候, 交互提醒                 |
| mv file1 file2 dir1 | 移动 file1 file2 文件到 dir1，dir1 需存在 |

> 重定向标准输出 stdout

```bash
ls -l /usr/bin > ls-oup.txt
```

> 重定向标准错误 stderr

```bash
# 重定向标准错误缺乏专用的重定向操作符。
# 我们必须参考它的文件描述符.标准输入(0)，输出(1)和错误(2)。

➜  $ ls -l /bin/usr 2> ls-error.txt
➜  $ cat ls-error.txt
ls: /bin/usr: No such file or directory

# 文件描述符 ”2”，紧挨着放在重定向操作符之前，来执行重定向标准错误到文件
# ls-error.txt 任务。 ”
```

> 更精简合理的方法来执行这种联合的重定向

```bash
ls -l /bin/usr &> ls-output.txt
```

> 同时重定向标准输出和标准错误

```bash
# 重定向文件描述符 2（标准错误）到文件描述符 1（标准输出）使用表示法 2>&1
# 注意重定向的顺序安排非常重要
$ ls -l /usr/bin > ls-output.txt 2>&1
$ ls -l /usr/bin1 >> ls-output.txt 2>&1
```

> 处理不需要的输出

```bash
$ ls -l /bin/usr 2> /dev/null
```

通过重定向输出结果 到一个特殊的叫做**/dev/null**的文件。这个文件是系统设备，叫做
位存储桶，它可以接受输入，并且对输入不做任何处理。Unix 文化中的/dev/null

> 标准输入 stdin

cat 接受一个文件，然后打印出来。或者把若干个文件进行合并得到一个大文件。

```bash
cat movie.mpeg.0* > movie.mpeg
# 因为通配符总是以有序的方式展开，所以这些参数会以正确顺序安排。
```

如果没有给 cat 任何参数，它会从标准输入读入数据，因为标准输入，默认情况下, 它正
在等待输入数据

```bash
➜  gaze cat > 1.txt
1
12
123
# Control+D is exit
➜  gaze cat 1.txt
1
12
123
```

> 管道符 pipeline

```bash
➜  gaze ls /usr/bin | sort | grep app
app-sso
applesingle
appletviewer
apply
dappprof
dapptrace
eyapp
eyapp5.18
eyapp5.28
ldappasswd
lsappinfo
```

```bash
# 删除当前目录中除去某个文件之外的所有文件
ls | grep -v 20170418.sql | xargs rm -f
```

> 使用展开和引用

```bash
$ echo $((1+3))
# 4

$ echo item_{1..5}
# item_1 item_2 item_3 item_4 item_5

$ echo a{A{1,2},B{3,4}}b
# aA1b aA2b aB3b aB4b

$ Downloads mkdir pic && cd pic
$ mkdir {2010..2012}-0{1..9} {2010..2012}-{10..12}
$ ls
# 2010-01 2010-04 2010-07 2010-10 2011-01 2011-04 2011-07 2011-10 2012-01 2012-04 2012-07 2012-10
# 2010-02 2010-05 2010-08 2010-11 2011-02 2011-05 2011-08 2011-11 2012-02 2012-05 2012-08 2012-11
# 2010-03 2010-06 2010-09 2010-12 2011-03 2011-06 2011-09 2011-12 2012-03 2012-06 2012-09 2012-12
```

> 进程

| 进程     |                        |
| :------- | :--------------------- |
| ps       | 报告当前进程快照       |
| top      | 显示任务               |
| jobs     | 列出活跃的任务         |
| bg       | 把一个任务放到后台执行 |
| fg       | 把一个任务放到前台执行 |
| kill     | 给一个进程发送信号     |
| killall  | 杀死指定名字的进程     |
| shutdown | 关机或重启系统         |

> shell 环境

| shell 环境 |                                      |
| :--------- | :----------------------------------- |
| printenv   | 打印部分或所有的环境变量             |
| set        | 设置 shell 选项                      |
| export     | 导出环境变量，让随后执行的程序知道。 |
| alias      | 创建命令别名                         |

当我们输入 ls 后， shell 不会查找整个计算机系统，来找到`/bin/ls`（ls 命令的绝对
路径名），而是，它查找一个目录列表， 这些目录包含在 PATH 变量中。PATH 变量经常（
但不总是，依赖于发行版）在 `/etc/profile` 启动文件中设置，通过这些代码：
`PATH=$PATH:$HOME/bin`修改 PATH 变量，添加目录 `$HOME/bin`到目录列表的末尾。

> 网络系统

| 网络系统   |                                                                |
| :--------- | :------------------------------------------------------------- |
| ping       | 发送 ICMP ECHO_REQUEST(特殊的网络数据包 IMCP) 软件包到网络主机 |
| traceroute | 打印到一台网络主机的路由数据包                                 |
| netstat    | 打印网络连接，路由表，接口统计数据，伪装连接，和多路广播成员   |
| ftp        | 因特网文件传输程序                                             |
| wget       | 非交互式网络下载器                                             |
| ssh        | OpenSSH SSH 客户端（远程登录程序）                             |
| scp        | OpenSSH SSH 客户端（远程登录程序）                             |
| scp        | 安全复制,被用来复制文件                                        |
| sftp       | 是 ftp 程序的安全替代品                                        |

```bash
[me@linuxbox ~]$ scp remote-sys:document.txt .
me@remote-sys's password:
document.txt
100%        5581        5.5KB/s         00:00
[me@linuxbox ~]$
```

> find

| 命令                                                | 解释                                                     |
| --------------------------------------------------- | -------------------------------------------------------- |
| find . -type f -atime -7                            | 搜索最近七天内被访问过的所有文件                         |
| find . -type f -size +10k                           | 搜索大于 10KB 的文件                                     |
| find . -type f -perm 777                            | 当前目录下搜索出权限为 777 的文件                        |
| find . -type f -name "\*.txt" -delete               | 删除当前目录下所有.txt 文件                              |
| find . -path "./sk" -prune -o -name "\*.txt" -print | 查找当前目录或者子目录下所有.txt 文件，但是跳过子目录 sk |

```bash
mkdir -p playground/dir-{00{1..9},0{10..99},100}
touch playground/dir-{00{1..9},0{10..99},100}/file-{A..Z}

# 找到所有的'file-A'
find . -type f -name 'file-A'
find . ! -name "file-A"

# `-exec command {} ;`   `{}`是当前路径名的符号表示

# 删除所有的'file-A'
find . -type f -name 'file-A' -print -exec rm -rf {} \;

# 删除所有的'file-C'
find . -type f -name 'file-C' -delete

#  删除本地文件夹下的 git 文件
find . -name ".git" | xargs rm -f

# 列出所有长度为零的文件
find. - empty
find . -empty -delete

# 找出当前目录下所有file-B文件加上换行符,输出到name.md 文件中
find . -type f -name "file-B" -exec printf "%s\n" {} \;>name.md

# 搜索大于 10KB 的文件
find . -type f -size +10k

# 当前目录下搜索出权限为 777 的文件
find . -type f -atime -7

# 向下最大深度限制为 3
find . -maxdepth 3 -type f

# 查找当前目录或者子目录下所有.txt 文件，但是跳过子目录 sk
find . -path "./sk" -prune -o -name "*.txt" -print

```

> ack : 搜索文件和文件夹利器

```javascript
ack 函数式编程--ignore - dir = _set--type = nojs
```

> Linux: 给文件追加多行内容

```bash
➜ cat >> 1.md
add No.2 line content to file!
add No.3 line content to file!
^C
```

```bash
➜ echo 'some new content'>> 1.md
```

> 查看文本文件头部 n 行

```bash
head -n 200 filename   # 200 可替换为任一数字
```

> 查看文本文件末尾 n 行

```bash
tail -n 200 filename  # 200 可替换为任一数字
```

> 查看文本文件行数

```bash
wc -l filename
```

> 显示本机公网地址：

```linux
curl ifconfig.me
```

```linux
~/Desktop/LUnix/kkk » curl ifconfig.me
113.90.37.156
```

---

> SSH 远程连接：

```
ssh - p 8888 root @192.168.1.179
```

```linux
~/Desktop/LUnix/kkk » ls
1.txt        123.log      20170418.sql
------------------------------------------------------------
~/Desktop/LUnix/kkk » ls | grep -v 20170418.sql | xargs rm -f
------------------------------------------------------------
~/Desktop/LUnix/kkk » ls
20170418.sql
```

当前目录搜索所有文件，文件内容 包含 “140.206.111.111” 的内容

```bash
~/Desktop/LUnix » find . -type f -name "*" | xargs grep "140.206.111.111"
./kkk/asdasfafa/1.txt:140.206.111.111
```

> 文本处理

| 文本处理 |                                        |
| :------- | :------------------------------------- |
| cat      | 连接文件并且打印到标准输出             |
| sort     | 给文本行排序                           |
| uniq     | 报告或者省略重复行                     |
| cut      | 从每行中删除文本区域                   |
| paste    | 合并文件文本行                         |
| join     | 基于某个共享字段来联合两个文件的文本行 |
| comm     | 逐行比较两个有序的文件                 |
| diff     | 逐行比较文件                           |
| patch    | 给原始文件打补丁                       |
| tr       | 翻译或删除字符                         |
| sed      | 用于筛选和转换文本的流编辑器           |
| aspell   | 交互式拼写检查器                       |

---

1. [Linux 命令搜索引擎](http://wangchujiang.com/linux-command/)
