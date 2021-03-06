http://python.jobbole.com/84927/

---

## 命令式编程 & 函数式编程

[命令式编程 & 函数式编程](/FunctionTypeProgram/Declarative-imperative)

我们先回顾下平时在写代码时主要的情景。其实，不管我们的业务代码有多复杂，都离不开以下几类操作：

函数定义：def
条件控制：if, elif, else
循环控制：for, break, continue, while

当然，这只是部分操作类型，除此之外还应该有类和模块、异常处理等等。我们就先只关注上面这三种最常见的操作。

## 在 Python 语言中

对应地，函数式编程也有自己的关键字。在 Python 语言中，用于函数式编程的主要由 3 个基本函数和 1 个算子。

- 基本函数：map()、reduce()、filter()
- 算子(operator)：lambda

令人惊讶的是，仅仅采用这几个函数和算子就基本上可以实现任意 Python 程序。

当然，能实现是一回事儿，实际编码时是否这么写又是另外一回事儿。

估计要真只采用这几个基本单元来写所有代码的话，不管是在表达上还是在阅读上应该都挺别扭的。不过，尝试采用这几个基本单元来替代上述的函数定义、条件控制、循环控制等操作，对理解函数式编程如何通过函数和递归表达流程控制应该会很有帮助。

在开始尝试将命令式编程转换为函数式编程之前，我们还是需要熟悉下这几个基本单元。
