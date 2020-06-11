# 修改远程仓库地址

方法一

```sh
git remote set-url origin [url]

# or

git remote rm origin
git remote add origin [url]

```

# 修改上次 commit

无修改代码情况下,使用一次新的 commit，替代上一次提交。如果代码没有任何新变化，则用来改写上一次 commit 的提交信息
amend：修正

```bash
git commit --amend -m "some-message"
```

---

# 本地项目上传到 Github

```javascript
 git init
git remote add origin git@github.com:xxx/xxx.git
git push -u origin master
```

由于新建的远程仓库是空的，所以要加上`-u`这个参数

如果新建远程仓库不是空的，比如生成了一个`README.md`

```javascript
git pull --rebase origin master
git push origin master
```

---

```javascript
git clearn -i
git clean -nfd
git clean -fd
```

---

0. [Git - 技巧和窍门](https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E6%8A%80%E5%B7%A7%E5%92%8C%E7%AA%8D%E9%97%A8)
1. [Git - Book](https://git-scm.com/book/zh/v2)
1. [Git Cheats - Cheatsheet For Git Commands](http://gitcheats.com/)
1. [沉浸式学 Git: Contents](http://igit.linuxtoy.org/contents.html)
1. [Git 教程 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
