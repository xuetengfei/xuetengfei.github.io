我们对 javascript 生态了如指掌，却常忽视 javascript 本身。这台机器，究竟是哪些零
部件在支持着它运行？

—— 这时你需要懂得抽象语法树（AST）。

AST 在日常业务中也许很难涉及到，但当你不止于想做一个工程师，而想做工程师的工程师
，写出类似 webpack、vue-cli 前端自动化的工具，或者有批量修改源码的工程需求，那你
必须懂得 AST。

事实上，在 javascript 世界中，你可以认为抽象语法树(AST)是最底层。 再往下，就是关
于转换和编译的“黑魔法”领域了。

通过抽象语法树解析，我们可以像童年时拆解玩具一样，透视 JavaScript 这台机器的运转
，并且重新按着你的意愿来组装。

现在，我们拆解一个简单的 add 函数

```javascript
function add(a, b) {
  return a + b;
}
```

首先，我们拿到的这个语法块，是一个 FunctionDeclaration(函数定义)对象。

用力拆开，它成了三块：

一个 id，就是它的名字，即 add

两个 params，就是它的参数，即[a, b]

一块 body，也就是大括号内的一堆东西

add 没办法继续拆下去了，它是一个最基础 Identifier（标志）对象，用来作为函数的唯
一标志，就像人的姓名一样。

```javascript
{
    name: 'add'
    type: 'identifier'
    ...
}
```

params 继续拆下去，其实是两个 Identifier 组成的数组。之后也没办法拆下去了

```javascript
[
    {
        name: 'a'
        type: 'identifier'
        ...
    },
    {
        name: 'b'
        type: 'identifier'
        ...
    }
 ]
```

日常用不到,扩展一下知识面.个人理解,相当于 react 的 jsx 的语法解析,本质上 jsx 就
是一棵语法树.AST 和 jsx 类似.

---

3. [online AST explorer](https://astexplorer.net/)
1. [wanthering/exportific: 抽象语法树(AST)简易教程，附加一个简单的源码编辑工具](https://github.com/wanthering/exportific)
1. [Parser API - Mozilla | MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Node_objects)
