1. [fzf](https://github.com/junegunn/fzf#search-syntax) - A command-line fuzzy
   finder
2. Ack - Better than grep. Without Ack, Ag would not exist.

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

## ack
