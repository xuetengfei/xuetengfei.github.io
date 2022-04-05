在开始处理新功能时，从 **develop** 分支创建功能分支,切换到新分支 **myfeature**.
功能分支通常仅存在于开发人员存储库中，而不存在于 **origin**.

```bash
$ git checkout -b myfeature develop
```

**myfeature** 开发完成后，需要合并到 **develop**分支中.

```bash
$ git checkout develop

$ git merge --no-ff myfeature -m "Summary of changes"

$ git branch -d myfeature

$ git push origin develop
```

通常，合并分支时，如果可能，Git 会用 Fast forward 模式，但这种模式下，git merge
则不会显示 feature，只保留单条分支记录,删除分支后，会丢掉分支信息。 **--no-ff**
指的是强行关闭 fast-forward 方式。 **git merge –no-ff** 可以保存你之前的分支历史
。能够更好的查看 merge 历史，以及 branch 状态。

**git merge --squash** 是用来把一些不必要 commit 进行压缩，比如说，feature 在开
发的时候写的 commit 很乱，那么合并的时候不希望把这些历史 commit 带过来，于是使用
--squash 进行合并，此时文件已经同合并后一样了，但不移动 HEAD，不提交。需要进行一
次额外的 commit 来“总结”一下，然后完成最终的合并。

**--no-ff** 不使用 fast-forward 方式合并，保留分支的 commit 历史 **-squash** 使
用 squash 方式合并，把多次分支 commit 历史压缩为一次

我使用 Tower 工具自己 执行 **--no-ff**

<!-- https://nvie.com/posts/a-successful-git-branching-model/ -->
