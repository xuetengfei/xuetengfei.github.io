> 搜索文件使用 fzf，搜索文件内容 ag

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


ag --list-file-types
ag --js foo 在js文件中查询

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
