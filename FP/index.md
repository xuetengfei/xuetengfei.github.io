<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200427101228%20functional-programming.jpg' alt='20200427101228functional-programming'/>

> 函数式编程是一种编程范例，它将计算机运算视为数学上的函数计算，并且避免了状态的改变和易变的数据。面向对象编程(OOP)通过封装变化使得代码更易理解。函数式编程(FP)通过最小化变化使得代码更易理解。

"面向对象编程的问题是，默认带有环境。你只想要一个香蕉，但是得到了一只拿着香蕉的大猩猩，甚至还有整个丛林。" 计算机语言大师 [Joe Armstrong](http://www.defprogramming.com/quotes-by/joe-armstrong/) ，2019 年 4 月 20 日去世。他非常不喜欢面向对象编程，发明了函数式语言 Erlang。

### 声明式编程

函数式编程大多时候都是在声明我需要做什么，而非怎么去做。这种编程风格称为 声明式编程 。这样有个好处是代码的可读性特别高，因为声明式代码大多都是接近自然语言的，同时，它解放了大量的人力，因为它不关心具体的实现，因此它可以把优化能力交给具体的实现，这也方便我们进行分工协作。

SQL 语句就是声明式的，无需关心 Select 语句是如何实现的，不同的数据库会去实现它自己的方法并且优化。React 也是声明式的，你只要描述你的 UI，接下来状态变化后 UI 如何更新，是 React 在运行时帮你处理的，而不是靠你自己去渲染和优化 diff 算法。

```javascript
// 命令式方式
var array = [0, 1, 2, 3];
for (let i = 0; i < array.length; i++) {
  array[i] = Math.pow(array[i], 2);
}

// 声明式方式
[0, 1, 2, 3].map(num => Math.pow(num, 2));
```

可以看到命令式很具体的告诉计算机如何执行某个任务。而声明式是将程序的描述与求值分离开来。它关注如何用各种表达式来描述程序逻辑，而不一定要指明其控制流或状态关系的变化。

### 纯函数

纯函数指没有副作用的函数。相同的输入有相同的输出，就跟我们上学学的函数一样，常常这些情况会产生副作用。

改变一个全局的变量、属性或数据结构
改变一个函数参数的原始值
处理用户输入
抛出一个异常
屏幕打印或记录日志
查询 HTML 文档，浏览器的 Cookie 或访问数据库

### 引用透明

```javascript
// 非引用透明
const counter = 0;
function increment() {
  return ++counter;
}

// 引用透明
const increment = counter => counter + 1;
```

### 不可变性

```javascript
const sortDesc = function (arr) {
  return arr.sort(function (a, b) {
    return b - a;
  });
};

const arr = [1, 3, 2];
sortDesc(arr); // [1, 2, 3]
arr; // [1, 2, 3]
```

这段代码会导致在排序的过程中会产生副作用，修改了原始引用，可以看到原始的 arr 变成了 [1, 2, 3]。

## 函数式编程核心

1. 柯里化（Currying）
2. 函数组合（Compose）


---

4. [Introduction · JS 函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)
<!-- 2. [functional-programming-for-javascript](https://github.com/FrontendMagazine/FrontendMagazine.github.io/blob/master/src/_posts/2016-04-29-functional-programming-for-javascript-people.md)
3. [函数式编程入门教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html)
 -->
