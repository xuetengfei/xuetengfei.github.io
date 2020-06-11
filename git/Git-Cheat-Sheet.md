# Git Cheat Sheet

# 新建

`基于当前分支创建新分支`

```
git branch xxx
```

`基于指定分支创建新分支`

```
git branch 新分支 指定分支
```

`创建新分支并且切换到该分支`

```
git checkout -b xxx
```

`基于某个 commit 创建分支`

```
git branch xxx  someCommitId
```

---

# 删除

`删除文件夹的 git 信息`

```
find . -name ".git" | xargs rm -Rf
```

`删除某个本地分支`

```
git branch -d xxxx
```

`强制删除某个本地分支`

```
git branch -D xxxx
```

`删除远程分支`

注意 origin 后面的空格，还有分支名称前面有一个`冒号`。

```bash
git push origin :xxxx
#or
git push remote --delete xxx
```

`删除远端 origin 已不存在的所有本地分支`

```
git remote prune orign
```

`删除已合并到 master 分支的所有本地分支`

```
git branch --merged master | grep -v '^\*\| master' | xargs -n 1 git branch -d 
```

---

# 查看

`查看当前工作分支及本地分支`

```sh
git branch
# or
git branch -v
```

`查看远程分支`

```bash
git branch -r
# or
git branch -rv
```

`查看本地/远程所有分支`

```bash
git branch -a
# or
git branch -av
```

`查看对应信息`

```
git branch -vv
```

`查看远程仓库信息`

```
git remote -v
```

---

# 推送

`推送到远程仓库`

```
git push
```

`推送本地分支更新内容到对应的远程分支`

```
git push origin master:xxx
```

`推送本地独有分支到远程`

本地新建一个新的分支，远程仓库并没有该分支，将其推送远程仓库

```
git push --set-upstream origin xxx
```

---

# stash

`将未处理完的变更先保存到 stash 中`

```bash
git stash           # 临时保存
git stash pop       # 恢复stash，并删除stash
git stash apply     # 恢复stash，不删除stash
```

# merge

`将 A 分支合入到 B 分支中且为 merge 创建 commit`

```bash
git merge A分支 B分支
```

`将当前分支基于 B 分支做 rebase，以便将B分支合入到当前分支`

```
git rebase B分支
```

`将 A 分支基于 B 分支做 rebase，以便将 B 分支合入到 A 分支`

```
git rebase B分支 A分支
```

# log

`显示就近的 5 个 commit`

```
git log -5
```

`当前分支各个 commit 用一行显示`

```
git log --oneline
```

`用图示显示所有分支的历史`

```
git log --oneline --graph --all
```

`查看涉及到ackage.json文件变更的所有 commit`

```
git log package.json
```

`package.json 文件各行最后修改对应的 commit 以及作者`

```
git blame package.json
```

# 合并（git merge）

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200418155923%20git-merge-gif.gif' alt='20200418155923git-merge-gif'/>

# 变基（git rebase）

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200418160011%20git-rebase-gif.gif' alt='20200418160011git-rebase-gif'/>

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200418155852%20git-rebase-image.jpg' alt='20200418155852git-rebase-image'/>

# 还原（git revert）

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200418160429%20git-revert-gif.gif' alt='20200418160429git-revert-gif'/>

# 回滚

尽量使用 git reset 不要使用 git revert

回滚到 commit-id，讲 commit-id 之后提交的 commit 都去除

```bash
git reset --hard <commit-id>
git reset --hard HEAD~3：将最近3次的提交回滚
git push -f
```

# 软重置（git reset --soft）

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200418160700%201715463f58ad968e.gif' alt='202004181607001715463f58ad968e'/>

# 硬重置（git reset --hard）

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200418160743%201715463f5a6a42a1.gif' alt='202004181607431715463f5a6a42a1'/>

# 检出提交（git cherry-pick）

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200418160919%201715463f6fd43f67.gif' alt='202004181609191715463f6fd43f67'/>

如图所示：**dev** 分支上的 **76d12** 提交添加了 index.js 文件，我们需要将本次提交更改加入到 master 分支，那么就可以使用 **git cherry-pick 76d12** 单独检出这条记录修改。现在 **master** 分支包含了 **76d12** 中引入的修改，并添加了一条提交记录 **9e78i**。

# 获取（git fetch）

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200418161158%201715463f7f8f4ef3.gif' alt='202004181611581715463f7f8f4ef3'/>
使用 git fetch 指令将远程分支上的最新的修改下载下来。

# 拉取（git pull）

除了 git fetch，我们还能使用 git pull 获取远程分支数据。有什么不同呢？git pull 指令实际做了两件事：git fetch 和 git merge。

# 回流 （git reflog）

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200418161547%201715463f8425dfcb.gif' alt='202004181615471715463f8425dfcb'/>

# gitignore

`新建隐藏文件`

```bash
touch .gitignore
```

```
node_modules/
logs/
log/
npm-debug.log
yarn-error.log
package-lock.json
yarn.lock
coverage/
.idea/
run/
.DS_Store
*.sw*
*.un~
typings/
.nyc_output/


```

`忽略目录 fd1 下的全部内容`

注意，不管是根目录下的 /fd1/ 目录，还是某个子目录 /child/fd1/ 目录，都会被忽略

```bash
fd1/*
```

`过滤所有.zip 文件`

```bash
*.zip               # 过滤所有.zip 文件
```

`过滤某个具体文件`

```
/src/debug.js
```

`只需要管理/src/目录中的 utils.js 文件`

`!`是添加规则

```
/src/
!/src/utils.js
```

---

# Github Config

Github 的配置:生成并部署 SSH key，配置 Github，连接远程仓库和本地电脑

`1.生成 ssh 公钥`

```bash
ssh-keygen -t rsa -C "xxxxx@xxxxx.com"
```

```javascript
或者这样 ssh-keygen -t rsa -b 4096 -C "xxx@xxx.com"
4096 是密码强度
Generating public/private rsa key pair...
三次回车即可生成 ssh key
```

`2.想要删除本地已存在的 ssh 公匙`

```bash
$ cd ~/.ssh
$ ls
$ rm id_rsa
$ rm id_rsa.pub
```

`3.生成 ssh key!`

```bash
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/xuetengfei/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /Users/xuetengfei/.ssh/id_rsa.
Your public key has been saved in /Users/xuetengfei/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:jCoNaWuwf18saulCcsL1b/99OF613ecg+XHsWx8wGCA xxxx@qq.com
The key's randomart image is:
+---[RSA 4096]----+
|       E .       |
|    .   .        |
|           .     |
|   o   o    o    |
|o = . S . S     .|
|o=o+    o .  .o.=|
|.=+ o.o o   o ++B|
| o.. =  .+  .=.B=|
|  .=o.o .....o+.=|
+----[SHA256]-----+

```

`4.查看你的 public key`

```bash
cat ~/.ssh/id_rsa.pub
```

Copies it straight to the clipboard

```bash
pbcopy < ~/.ssh/id_rsa.pub
```

`5.链接 github`

1. 进入个人的 settings
2. 找到 SSH and GPG keys
3. 右下角 New GPG keys
4. 把刚才复制的 ssh key 粘贴进去

`检测是否链接成功`

```bash
$ ssh -T git@github.com

# You've successfully authenticated, but GitHub does not provide shell access.
```

---

1. [Git and Git Flow Cheat Sheet | git-cheat-sheet](http://bilalarslan.me/git-cheat-sheet/)
1. [git-cheat-sheet/git-cheat-sheet-zh.md at master · arslanbilal/git-cheat-sheet](https://github.com/arslanbilal/git-cheat-sheet/blob/master/other-sheets/git-cheat-sheet-zh.md)
1. [github/gitignore: A collection of useful .gitignore templates](https://github.com/github/gitignore)
1. [Git - gitignore Documentation](https://git-scm.com/docs/gitignore)
1. [图片来源](https://juejin.im/post/5e4d2bdee51d4527086b3389#heading-4)
