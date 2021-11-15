> 搜索文件使用 fzf/fd，搜索文件内容 ag

## fzf

```bash
# 安装fzf,
brew install fzf
```

```bash
# 安装对应的快捷键
➜ ~ $(brew --prefix)/opt/fzf/install

Downloading bin/fzf ...
  - Already exists
  - Checking fzf executable ... 0.27.2
Do you want to enable fuzzy auto-completion? ([y]/n) y
Do you want to enable key bindings? ([y]/n) y

Generate /Users/gaze/.fzf.bash ... OK
Generate /Users/gaze/.fzf.zsh ... OK

Do you want to update your shell configuration files? ([y]/n) y

Update /Users/gaze/.bashrc:
  - [ -f ~/.fzf.bash ] && source ~/.fzf.bash
    + Added

Update /Users/gaze/.zshrc:
  - [ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
    + Added

Finished. Restart your shell or reload config file.
   source ~/.bashrc  # bash  (.bashrc should be loaded from .bash_profile)
   source ~/.zshrc   # zsh

Use uninstall script to remove fzf.

For more information, see: https://github.com/junegunn/fzf
```

```bash
# base usage
https://github.com/junegunn/fzf#search-syntax
```

```bash
# zsh history 的快捷键是CTRL-R,现在可以配合模糊搜索
# CTRL-R - Paste the selected command from history onto the command-lin
```

```bash
# Directories under current directory (single-selection)
cd **<TAB>
```

```bash
# Can select multiple processes with <TAB> or <Shift-TAB> keys
kill -9 <TAB>
```

```bash
# Feed the output of fd into fzf
fd --type f | fzf
```

```bash
ssh **<TAB>  # /etc/hosts
telnet **<TAB>
```

```bash
# STDIN pipe |
fzf | xargs rm
fzf | xargs trash
```

```bash
# 开启多选模式
# On multi-select mode (-m), TAB and Shift-TAB to mark multiple items
fzf -m | xargs trash
```

## [fd](https://github.com/sharkdp/fd)

fd 是一种简单ㄡ快速和用户友好的 find 替代方案. 虽然它不寻求复刻 find 所有强大的
功能,但它提供了明智的 (自定的) 80%的用例.

```bash
方便语法: fd PATTERN而不是find -iname '*PATTERN*'
彩色终端输出 (类似于ls)
聪明案例: 默认情况下,搜索不区分大小写 如果模式包含大写字符*, 则切换为区分大小写字符
默认情况下,忽略隐藏的目录和文件
忽略匹配你gitignore文件中的模式,默认情况
正则表达式
Unicode感知.
命令输入量*50%*优于*find: -)
用类似于GNU穿行的语法，执行并行命令
```

```bash
USAGE:
    fd [FLAGS/OPTIONS] [<pattern>] [<path>...]

FLAGS:
    -H, --hidden            搜索隐藏的文件和目录
    -I, --no-ignore         不要忽略 .(git | fd)ignore 文件匹配
        --no-ignore-vcs     不要忽略.gitignore文件的匹配
    -s, --case-sensitive    区分大小写的搜索（默认值：智能案例）
    -i, --ignore-case       不区分大小写的搜索（默认值：智能案例）
    -F, --fixed-strings     将模式视为文字字符串
    -a, --absolute-path     显示绝对路径而不是相对路径
    -L, --follow            遵循符号链接
    -p, --full-path         搜索完整路径（默认值：仅限 file-/dirname）
    -0, --print0            用null字符分隔结果
    -h, --help              打印帮助信息
    -V, --version           打印版本信息

OPTIONS:
    -d, --max-depth <depth>        设置最大搜索深度（默认值：无）
    -t, --type <filetype>...       按类型过滤：文件（f），目录（d），符号链接（l），
                                   可执行（x），空（e）
    -e, --extension <ext>...       按文件扩展名过滤
    -x, --exec <cmd>               为每个搜索结果执行命令
    -E, --exclude <pattern>...     排除与给定glob模式匹配的条目
        --ignore-file <path>...    以.gitignore格式添加自定义忽略文件
    -c, --color <when>             何时使用颜色：never，*auto*, always
    -j, --threads <num>            设置用于搜索和执行的线程数
    -S, --size <size>...           根据文件大小限制结果。

ARGS:
    <pattern>    the search pattern, a regular expression (optional)
    <path>...    the root directory for the filesystem search (optional)

```

To make exclude-patterns like these permanent, you can create a .fdignore file.
They work like .gitignore files, but are specific to fd. For example:

```bash
➜  ~ bat .fdignore
```

## ag

[ggreer/the_silver_searcher: A code-searching tool similar to ack, but faster.](https://github.com/ggreer/the_silver_searcher)

```bash
brew install the_silver_searcher

Usage: ag [FILE-TYPE] [OPTIONS] PATTERN [PATH]
More: ag --help

OPTIONS:
  -w --word-regexp        Only match whole words
  -Q --literal            Don't parse PATTERN as a regular expression
  -g --filename-pattern   PATTERN

ag --list-file-types    // list file types
ag --js foo             // 在js文件中查询
ag 'pattern1|pattern2'  // multiple search expressions
```

## ack

> ack : 搜索文件和文件夹利器
> [Ack Cheat Sheet - Kapeli](https://kapeli.com/cheat_sheets/Ack.docset/Contents/Resources/Documents/index)

```bash
File select actions:
  -f                            Only print the files selected, without
                                searching.  The PATTERN must not be specified.
  -g                            Same as -f, but only select files matching
                                PATTERN.

File listing actions:
  -l, --files-with-matches      Print filenames with at least one match
  -L, --files-without-matches   Print filenames with no matches
  -c, --count                   Print filenames and count of matching lines

Searching:
  -i, --ignore-case             Ignore case distinctions in PATTERN
  -S, --[no]smart-case          Ignore case distinctions in PATTERN,
                                only if PATTERN contains no upper case.
                                Ignored if -i or -I are specified.
  -I, --no-ignore-case          Turns on case-sensitivity in PATTERN.
                                Negates -i and --smart-case.
  -v, --invert-match            Invert match: select non-matching lines
  -w, --word-regexp             Force PATTERN to match only whole words
  -Q, --literal                 Quote all metacharacters; PATTERN is literal
  --range-start PATTERN         Specify PATTERN as the start of a match range.
  --range-end PATTERN           Specify PATTERN as the end of a match range.
  --match PATTERN               Specify PATTERN explicitly. Typically omitted.

  A search tool like grep, optimized for programmers.
  More information: https://beyondgrep.com/documentation/.

    ack foo  模糊匹配
    ack -w foo 全词匹配

  - Find files of a specific type:
    ack --ruby foo

  - Count the total number of matches for the term "foo":
    ack -ch foo

  - Show the file names containing "foo" and number of matches in each file:
    ack -cl foo

  - List all valid types:
    ack --help=types

```

## git grep

想快速地在项目找到字符串,可以在本地储存库使用 `git grep`

```sh
git grep -n 'db'
```

## Linux Find

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

---

1. [fzf](https://github.com/junegunn/fzf#search-syntax) - A command-line fuzzy
   finder
2. [ack](https://beyondgrep.com/documentation/) - Better than grep. Without Ack,
   Ag would not exist.
