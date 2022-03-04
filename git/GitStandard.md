```bash
<type>(scope): <subject>

#  注意冒号后面有个空格
```

```bash
type (必选)
用于说明 commit 的类别，只允许使用下面7个标识。
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动



scope （可选）
用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。



subject （必选）
是 commit 目的的简短描述，不超过50个字符。
1.以动词开头，使用第一人称现在时，比如change，而不是changed或changes
2.第一个字母小写
3.结尾不加句号（.）
```

参考链接：

1. [commitizen/cz-cli: The commitizen command line utility.](https://github.com/commitizen/cz-cli)
2. [可能会忽略的 Git 提交规范](http://jartto.wang/2018/07/08/git-commit/?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)
3. [Git 提交代码的时候，必须给出一段文字说明。有时候，会想要一个模板，提交时自动跳出来，只要填写一下就可以了。本文给出实现方法。](https://gist.github.com/lisawolderiksen/a7b99d94c92c6671181611be1641c733)
