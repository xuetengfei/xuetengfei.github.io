# AOP

面向切面的程序设计（Aspect-oriented programming，AOP，又译作面向方面的程序设计、剖面导向程序设计）是计算机科学中的一种程序设计思想，旨在将横切关注点与业务主体进行进一步分离，以提高程序代码的模块化程度。通过在现有代码基础上增加额外的通知（Advice）机制，能够对被声明为“切点（Pointcut）”的代码块进行统一管理与装饰，如“对所有方法名以‘set*’开头的方法添加后台日志”。该思想使得开发人员能够将与代码核心业务逻辑关系不那么密切的功能（如日志功能）添加至程序中，同时又不降低业务代码的可读性。面向切面的程序设计思想也是面向切面软件开发的基础。

面向切面的程序设计将代码逻辑切分为不同的模块（即关注点（Concern），一段特定的逻辑功能)。几乎所有的编程思想都涉及代码功能的分类，将各个关注点封装成独立的抽象模块（如函数、过程、模块、类以及方法等），后者又可供进一步实现、封装和重写。部分关注点“横切”程序代码中的数个模块，即在多个模块中都有出现，它们即被称作横切关注点（Cross-cutting concerns, Horizontal concerns）。

日志功能即是横切关注点的一个典型案例，因为日志功能往往横跨系统中的每个业务模块，即“横切”所有有日志需求的类及方法体。而对于一个信用卡应用程序来说，存款、取款、帐单管理是它的核心关注点，日志和持久化将成为横切整个对象结构的横切关注点。

切面的概念源于对面向对象的程序设计和计算反射的融合，但并不只限于此，它还可以用来改进传统的函数。与切面相关的编程概念还包括元对象协议、主题（Subject）、混入（Mixin）和委托（Delegate）。

## 原型上面添加函数实现:before、after、around


```javascript
Function.prototype.before = function (beforefun) {
  //函数调用前执行
  let _this = this; // 保存原函数引用
  return function () {
    // 返回包含了原函数和新函数的"代理函数"
    beforefun.apply(this, arguments); // 执行新函数，修正this
    return _this.apply(this, arguments); // 执行原函数
  };
};

Function.prototype.after = function (afterfun) {
  let _this = this; // 保存原函数引用
  return function () {
    // 返回包含了原函数和新函数的"代理函数"
    let ret = _this.apply(this, arguments); // 执行原函数
    afterfun.apply(this, arguments); // 执行新函数，修正this
    return ret;
  };
};

// 利用前面的before、after方法实现
Function.prototype.around = function (beforeFun, afterFun) {
  var _this = this;
  return function () {
    return _this.before(beforeFun).after(afterFun).apply(this, arguments);
  };
};
```

## 代码实践

```js
// Function.prototype.before code
// Function.prototype.after code 
// Function.prototype.around code
  
const Step1 = function (orderType, isPaid, stock) {
  console.log(`run ~ Step1`);
};

const Step2 = function (orderType, isPaid, stock) {
  console.log(`run ~ Step2`);
};

const Step3 = function (orderType, isPaid, stock) {
  console.log(`run ~ Step3`);
};

const order = Step1.after(Step2).after(Step3);
const order2 = Step1.before(Step2).before(Step3);
const order3 = Step1.around(Step2, Step3);

order(1, true, 10);
console.log('--------');
order2(1, true, 10);
console.log('--------');
order3(1, true, 10);

```

print result

```md
run ~ Step1
run ~ Step2
run ~ Step3
--------
run ~ Step3
run ~ Step2
run ~ Step1
--------
run ~ Step2
run ~ Step1
run ~ Step3
```



---

1. [面向切面的程序设计 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E9%9D%A2%E5%90%91%E5%88%87%E9%9D%A2%E7%9A%84%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1)