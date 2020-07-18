```linux
  ln

  Creates links to files and directories.

  - Create a symbolic link to a file or directory:
    ln -s path/to/file_or_directory path/to/symlink

  - Overwrite an existing symbolic to point to a different file:
    ln -sf path/to/new_file path/to/symlink

  - Create a hard link to a file:
    ln path/to/file path/to/hardlink
```

## 用户数据 (user data) 与元数据 (metadata)

文件都有文件名与数据，这在 Linux 上被分成两个部分：用户数据 (user data) 与元数据 (metadata)。

用户数据，即文件数据块 (data block)，数据块是记录文件真实内容的地方；  
而元数据则是文件的附加属性，如文件大小、创建时间、所有者等信息。

在 Linux 中，元数据中的 inode 号（inode 是文件元数据的一部分但其并不包含文件名，inode 号即索引节点号）才是文件的唯一标识而非文件名。文件名仅是为了方便人们的记忆和使用，系统或程序通过 inode 号寻找正确的文件数据块。

## 解决文件的共享使用问题

为解决文件的共享使用，Linux 系统引入了两种链接：硬链接 (hard link) 与软链接（又称符号链接，即 soft link 或 symbolic link）。

链接为 Linux 系统解决了文件的共享使用，还带来了隐藏文件路径、增加权限安全及节省存储等好处。若一个 inode 号对应多个文件名，则称这些文件为硬链接。换言之，硬链接就是同一个文件使用了多个别名。硬链接是一个目录条目，它指具有同一个 i-node（硬盘上的物理位置）的另一个文件，事实上只存在一个文件，比如我对 Dropbox 中的

由于硬链接是有着相同 inode 号仅文件名不同的文件，因此硬链接存在以下几点特性：

文件有相同的 inode 及 data block；只能对已存在的文件进行创建；不能交叉文件系统进行硬链接的创建；不能对目录进行创建，只可对文件创建；
删除一个硬链接文件并不影响其他有相同 inode 号的文件

```bash
➜  000-my_dotfiles git:(master) ✗ ls -l ~/.zshrc
-rw-r--r--@ 3 x  staff  7375 10  9 17:50 /Users/x/.zshrc

➜  ~ ls -l ~/.zshrc
-rw-r--r--@ 3 x  staff  7375 10  9 17:50 /Users/x/.zshrc
```

## 备份 dotfile

我把常用的一些配置文件进行了备份。`dotfiles/.zshrc` 和 `～/.zshrc` 指向同一个文件，我修改任意一个`～/.zshrc` 两个文件都会同时改变。
创建硬连接的时候，文件名称可以不一样的:`ln one/x.md two/y.md`

```bash
➜ dotfiles git:(master) ✗ la
total 88
-rw-r--r--@ 1 x  staff   6.0K 10  9 19:30 .DS_Store
-rw-r--r--  2 x  staff   245B  9 27 17:29 .editorconfig
-rw-r--r--  2 x  staff    26B  9 27 17:29 .eslintignore
-rw-r--r--  2 x  staff   1.4K  9 27 17:29 .eslintrc.js
-rw-r--r--  2 x  staff   486B  9 27 17:29 .gitignore
-rw-r--r--  2 x  staff   167B  9 27 17:29 .prettierignore
-rw-r--r--  2 x  staff   437B  9 27 17:29 .prettierrc
-rw-r--r--@ 3 x  staff   7.2K 10  9 17:50 .zshrc
-rw-r--r--  2 x  staff   423B  9 27 17:29 jsconfig.json

# 查询硬连接
➜  python find /Users/x/_code -samefile db.json
/Users/x/_code/book_marks.json
/Users/x/_code/store/db.json
```

---

1. [理解 Linux 的硬链接与软链接](https://www.ibm.com/developerworks/cn/linux/l-cn-hardandsymb-links/index.html)
2. [mac 系统中文件的软链接、硬链接](https://slarker.me/mac-file-link/)
