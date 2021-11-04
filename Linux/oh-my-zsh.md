# 记录 Zsh 一些配置和插件

 <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2019-04-13_18-45-56-1555152600.jpg'/>

```bash
# mac
brew install zsh
# centerOs/ubuntu
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

## Cheatsheet

[oh-my-zsh Wiki](https://github.com/robbyrussell/oh-my-zsh/wiki/Cheatsheet#git)

```
Alias	   Command

alias  ==>  list all aliases
..	   ==>  cd ..
...    ==> 	cd ../..
....   ==>	cd ../../..
.....  ==>  cd ../../../..
/	   ==>  cd /
~	   ==>  cd ~

take	Create a new directory and change to it,
        will create intermediate directories as required.
```

查看所有 git 命令缩写

```
cat ~/.oh-my-zsh/plugins/git/git.plugin.zsh
```

筛选对应的命令 ·

```shell
 ➜  Desktop alias | grep config
gcf='git config --list'
zshconfig='mate ~/.zshrc'
```

## Shell

```shell
# 查看有没有 zsh
which zsh

# 显示存在的 bash
cat /etc/shells

# bash -> zsh
chsh -s `which zsh`

# zsh -> bash
chsh -s `which bash`
# or
chsh -s /bin/bash
```

当然不愿意把 zsh 当成默认的 shell, 而又想使用它, 那么可以每次进入是都使用 zsh 进
入, 而输入 exit 退出

## 杀进程

以前杀进程是 ps aux | grep xxx 查进程的 PID，然后 kill PID。有了 zsh，直接 kill
xxx 然后按下 tab 键即可，比如 `kill node`回车

```shell
➜  Desktop kill 50890
50890 x    node
50891 x    /usr/local/bin/node
50892 x    /usr/local/bin/node
50894 x    /usr/local/bin/node
51241 x    node
```

## autojump

[autojump](https://github.com/wting/autojump)按照使用频率记录路径，使得目录的跳
转更为方便。安装「 brew install autojump 」。如需跳转到包含 'foo' 的目录，执行 j
foo，这是最基础，也是最常用的命令。除此之外，还有 jc, jo, jco 命令，查看官网文档
获取更多的使用方法。

## zsh-autosuggestions

根据历史操作，自动补全命令。
[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)

## other

<!-- <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2019-04-13_18-47-01-1555152600.jpg'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2019-04-13_18-46-56-1555152600.jpg'/> -->

```bash
/usr/local/bin/code ~/.zshrc
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2019-04-13_18-46-28-1555152600.jpg'/>

```shell
alias zshconfig="mate ~/.zshrc"
alias ohmyzsh="mate ~/.oh-my-zsh"
alias errlog='cat /var/log/nginx/error.log'
alias accesslog='cat /var/log/nginx/access.log'
alias ngs='sudo systemctl status nginx'
alias ngr='sudo systemctl start nginx'
alias vimn='vim /etc/nginx/sites-available/default'

alias r="source ~/.zshrc"
alias go='cd /home/ubuntu/data && ls'


alias -s gz='tar -xzvf'
alias -s tgz='tar -xzvf'
alias -s zip='unzip'
alias -s bz2='tar -xjvf'
alias -s php=vi
alias -s py=vi
alias -s rb=vi
alias -s html=vi

alias -g G='| grep'
alias his='history -10' # $ history -10  >> 查看最近十条历史
```


<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2019-04-13_18-54-02-1555152879.jpg'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2019-04-13_18-54-55-1555152941.jpg'/>


---

1. [oh-my-zsh 插件推荐](https://hufangyun.com/2017/zsh-plugin/)
2. [一些命令行效率工具](http://wulfric.me/2015/08/zsh/)
3. [Alias Flag Description:-a -g -s](https://github.com/ohmyzsh/ohmyzsh/wiki/Cheatsheet#alias)
