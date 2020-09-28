# 什么是 shell

一说到命令行，我们真正指的是 shell。shell 就是一个程序，它接受从键盘输入的命令，
然后把命令传递给操作系统去执行。几乎所有的 Linux 发行版都提供一个名为 bash 的 来
自 GNU 项目的 shell 程序。“bash” 是 “Bourne Again SHell” 的首字母缩写， 所指的是
这样一个事实，bash 是最初 Unix 上由 Steve Bourne 写成 shell 程序 sh 的增强版。”

当使用图形用户界面时，我们需要另一个和 shell 交互的叫做终端仿真器的程序。 如果我
们浏览一下桌面菜单，可能会找到一个。虽然在菜单里它可能都 被简单地称为
“terminal”，但是 KDE 用的是 konsole , 而 GNOME 则使用 gnome-terminal。 还有其他
一些终端仿真器可供 Linux 使用，但基本上，它们都完成同样的事情， 让我们能访问
shell。也许，你可能会因为附加的一系列花俏功能而喜欢上某个终端。”

“列出目录内容

列出一个目录包含的文件及子目录，使用 ls 命令。”

“实际上，用 ls 命令可以列出任一个目录的内容，而不只是当前工作目录的内容。 ls 命
令还能完成许多有趣的事情。在下一章节，我们将介绍更多关于 ls 的知识。”

“更改当前工作目录

要更改工作目录（此刻，我们站在树形迷宫里面），我们用 cd 命令。输入 cd, 然后输入
你想要去的工作目录的路径名。路径名就是沿着目录树的分支 到达想要的目录期间所经过
的路线。路径名可通过两种方式来指定，一种是绝对路径， 另一种是相对路径。我们先来
介绍绝对路径。”

摘录来自: Unknown. “The Linux Command Line 中文版。” Apple Books.

“快捷键 运行结果

```
cd 更改工作目录到你的家目录。
cd - 更改工作目录到先前的工作目录。
cd ~user_name 更改工作目录到用户家目录。
例如, cd ~bob 会更改工作目录到用户“bob”的家目录。”
```

```sh
➜  ~ ls $PWD $PWD/gaze
/Users/gaze:
Applications Documents    Library      Music        Public
Desktop      Downloads    Movies       Pictures     gaze

/Users/gaze/gaze:
Configuration File          code          xue
➜  ~
```
