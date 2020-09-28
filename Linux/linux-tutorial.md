# Linux

> 目录

| 目录           | 常见目录说明                                                       |
| -------------- | ------------------------------------------------------------------ |
| /bin           | 存放二进制可执行文件(ls,cat,mkdir 等)，常用命令一般都在这里        |
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

> 用户

| 命令提示符         | 命令提示符                                                                        |
| :----------------- | :-------------------------------------------------------------------------------- |
| [root@xiaoming ~]# | root 当前登录用户 localhost 主机名 ~ 当前工作目录提示符 超级用户是 #,普通用户是\$ |
| whoami             | 显示登录的用户名                                                                  |
| groups zhangsan    | 显示 zhangsan 用户所在的所有组                                                    |

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
| cp -i 1.md 2.md    | 2.md 存在的话,交互提醒                        |
| cp 1.md 2.md ./dir | 复制 1.md 2.md 文件到 dir。dir 文件夹必须存在 |
| cp dir1/\* dir2    |                                               |
| cp -v dir1/\* dir2 | 显示操作结果 verbose 详细的                   |

> mv

| 命令提示符          | 命令提示符                                |
| :------------------ | :---------------------------------------- |
| mv dir1 dir2        | dir2 存在:移动.dir2 不存在:重命名         |
| mv -i dir1 dir2     | dir2 存在的时候,交互提醒                  |
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

如果没有给 cat 任何参数，它会从标准输入读入数据，因为标准输入，默认情况下,它正在
等待输入数据

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

> find

| 命令                                                | 解释                                                     |
| --------------------------------------------------- | -------------------------------------------------------- |
| find .                                              | 列出当前目录及子目录下所有文件和文件夹                   |
| find /home -name "\*.txt"                           | 在/home 目录下查找以.txt 结尾的文件名                    |
| find /home ! -name "\*.txt"                         | 找出/home 下不是以.txt 结尾的文件                        |
| find . -maxdepth 3 -type f                          | 向下最大深度限制为 3                                     |
| find . -type f -atime -7                            | 搜索最近七天内被访问过的所有文件                         |
| find . -type f -size +10k                           | 搜索大于 10KB 的文件                                     |
| find . -type f -perm 777                            | 当前目录下搜索出权限为 777 的文件                        |
| find . -type f -name "\*.txt" -delete               | 删除当前目录下所有.txt 文件                              |
| find . -empty                                       | 要列出所有长度为零的文件                                 |
| find . -name ".git" 丨 xargs rm -Rf                 | 1                                                        |
| find . -path "./sk" -prune -o -name "\*.txt" -print | 查找当前目录或者子目录下所有.txt 文件，但是跳过子目录 sk |

找出当前目录下所有.txt 文件并以“File:文件名”的形式打印出来,把他们拼接起来写入到
all.md 文件中

```
find . -type f -name "*.txt" -exec printf "File: %s\n" {} \;> name.md
```

> 递归删除所有的`.bak`文件(批量删除当前目录及子目录中指定类型的文件)

```linux
find . -type f -name "*.bak" -delete
```

> 递归删除条件筛选出的`.log` 文件

```linux
find ./ -name "*_2017-04-*.log" | xargs rm -f
```

> 递归删除所有的`.log` 文件,并且打印出删除文件名称和路径

!>主要不要遗漏后面有一个分号

```linux
find ./ -name '*.log' -type f -print -exec rm -rf {} \;
```

```javascript
.//asd/adsa/asd.log
.//asd/123.log
```

> 找出当前目录下所有.txt 文件并以“File:文件名”的形式打印出来

```javascript
find . -type f -name "*.txt" -exec printf "File: %s\n" {} \;
```

```javascript
├── ad
│   └── e
│       └── asd.txt
├── asd
│   └── adsa
│       └── ojh.txt
└── kkk
    ├── 20170418.sql
    └── asdasfafa
```

```javascript
File: ./asd/adsa/ojh.txt
File: ./ad/e/asd.txt
```

> 要列出所有长度为零的文件

```javascript
find . -empty
```

> 删除当前目录中除去某个文件之外的所有文件

```linux
ls | grep -v 20170418.sql | xargs rm -f
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

---

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

```javascript
ssh -p 8888 root@192.168.1.179
```

---

> find:强大的查询文件

```javascript
.
├── ad
├── asd
│   └── adsa
└── kkk
    ├── 20170418.sql
    └── asdasfafa
        └── 1.txt

5 directories, 2 files
```

当前目录搜索所有文件，文件内容 包含 “140.206.111.111” 的内容

```bash
~/Desktop/LUnix » find . -type f -name "*" | xargs grep "140.206.111.111"
./kkk/asdasfafa/1.txt:140.206.111.111
```

```javascript
~/Desktop/LUnix » find .

.
./kkk
./kkk/20170418.sql
./kkk/asdasfafa
./kkk/asdasfafa/1.txt
./asd
./asd/adsa
./ad
```

> ack : 搜索文件和文件夹利器

```javascript
ack 函数式编程 --ignore-dir=_set --type=nojs
```

> 列出当前目录及子目录下所有文件和文件夹

```
 find .
```

> 在/home 目录下查找以.txt 结尾的文件名

```
 find /home -name "*.txt"
```

> 找出/home 下不是以.txt 结尾的文件

```
find /home ! -name "*.txt"
```

> 找出当前目录下所有.txt 文件并以“File:文件名”的形式打印出来,把他们拼接起来写入
> 到 all.md 文件中

```
find . -type f -name "*.txt" -exec printf "File: %s\n" {} \;> name.md
```

> 找出当前目录下所有.txt 文件并以“File:文件名”的形式打印出来

```
find . -type f -name "*.txt" -exec printf "File: %s\n" {} \;
```

> 搜索大于 10KB 的文件

```
find . -type f -size +10k
```

> 要列出所有长度为零的文件

```
find . -empty
```

> 删除所有长度为零的文件

```
find . -empty -delete
```

> 当前目录下搜索出权限为 777 的文件

```
 find . -type f -atime -7
```

> 删除当前目录下所有.txt 文件

```
find . -type f -name "*.txt" -delete
```

```
find . -type f -perm 777
```

> 向下最大深度限制为 3

```
find . -maxdepth 3 -type f
```

> 查找当前目录或者子目录下所有.txt 文件，但是跳过子目录 sk |

```
find . -path "./sk" -prune -o -name "*.txt" -print
```

> 清除本地文件夹下的 git 文件

```
find . -name ".git" | xargs rm -Rf
```

> Linux:给文件追加多行内容

```shell
➜ cat >> 1.md
add No.2 line content to file!
add No.3 line content to file!
^C
```

or

```
➜ echo 'some new content'>> 1.md
```

> 查看文本文件头部 n 行

```shell
head -n 200 filename   # 200 可替换为任一数字
```

> 查看文本文件末尾 n 行

```shell
tail -n 200 filename  # 200 可替换为任一数字
```

> 查看文本文件行数

```shell
wc -l filename
```

---

1. [Linux 命令搜索引擎](http://wangchujiang.com/linux-command/)
