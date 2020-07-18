1. [Linux 命令搜索引擎](http://wangchujiang.com/linux-command/)

---

#### 递归删除所有的`.bak`文件(批量删除当前目录及子目录中指定类型的文件)

```linux
find . -type f -name "*.bak" -delete
```

---

#### 递归删除条件筛选出的`.log` 文件

```linux
find ./ -name "*_2017-04-*.log" | xargs rm -f
```

---

#### 递归删除所有的`.log` 文件,并且打印出删除文件名称和路径

!>主要不要遗漏后面有一个分号

```linux
find ./ -name '*.log' -type f -print -exec rm -rf {} \;
```

```javascript
.//asd/adsa/asd.log
.//asd/123.log
```

#### 找出当前目录下所有.txt 文件并以“File:文件名”的形式打印出来

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

#### 要列出所有长度为零的文件

```javascript
find . -empty
```

---

#### 删除当前目录中除去某个文件之外的所有文件

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

#### 显示本机公网地址：

```linux
curl ifconfig.me
```

```linux
~/Desktop/LUnix/kkk » curl ifconfig.me
113.90.37.156
```

---

#### SSH 远程连接：

```javascript
ssh -p 8888 root@192.168.1.179
```

---

#### find:强大的查询文件

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

## ack : 搜索文件和文件夹利器

```javascript
ack 函数式编程 --ignore-dir=_set --type=nojs
```
#### 列出当前目录及子目录下所有文件和文件夹

```
 find .
```

#### 在/home 目录下查找以.txt 结尾的文件名

```
 find /home -name "*.txt"
```

#### 找出/home 下不是以.txt 结尾的文件

```
find /home ! -name "*.txt"
```

#### 找出当前目录下所有.txt 文件并以“File:文件名”的形式打印出来,把他们拼接起来写入到 all.md 文件中

```
find . -type f -name "*.txt" -exec printf "File: %s\n" {} \;> name.md
```

#### 找出当前目录下所有.txt 文件并以“File:文件名”的形式打印出来

```
find . -type f -name "*.txt" -exec printf "File: %s\n" {} \;
```

#### 搜索大于 10KB 的文件

```
find . -type f -size +10k
```

#### 要列出所有长度为零的文件

```
find . -empty
```

#### 删除所有长度为零的文件

```
find . -empty -delete
```

#### 当前目录下搜索出权限为 777 的文件

```
 find . -type f -atime -7
```

#### 删除当前目录下所有.txt 文件

```
find . -type f -name "*.txt" -delete
```

```
find . -type f -perm 777
```

#### 向下最大深度限制为 3

```
find . -maxdepth 3 -type f
```

#### 查找当前目录或者子目录下所有.txt 文件，但是跳过子目录 sk |

```
find . -path "./sk" -prune -o -name "*.txt" -print
```

#### 清除本地文件夹下的 git 文件

```
find . -name ".git" | xargs rm -Rf
```
### Linux:给文件追加多行内容

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

### 查看文本文件头部 n 行

```shell
head -n 200 filename   # 200 可替换为任一数字
```

### 查看文本文件末尾 n 行

```shell
tail -n 200 filename  # 200 可替换为任一数字
```

### 查看文本文件行数

```shell
wc -l filename
```
