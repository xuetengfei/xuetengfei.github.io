写业务逻辑时，if-else 可能是最容易想到的逻辑方式了。然而大量堆砌的 if-else 毫无
疑问将给代码维护带来巨大的困难。如何优化这些 if-else 呢？

1 责任链模式

> 责任链模式在面向对象程式设计里是一种软件设计模式，它包含了一些命令对象和一系列
> 的处理对象。使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合
> 关系。将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

责任链模式是实现了类似“流水线”结构的逐级处理，通常是一条链式结构，将“抽象处理者”
的不同实现串联起来：如果当前节点能够处理任务则直接处理掉，如果无法处理则委托给责
任链的下一个节点，如此往复直到有节点可以处理这个任务。

责任链模式提供松散耦合的对象链，该模式本质上是对能够处理特定请求的对象的线性搜索

```javascript
function fn1({ a } = { a: null }) {
  if (a === 1) {
    return { success: 'ok' };
  }
  return null;
}
function fn2({ a } = { a: null }) {
  if (a === 2) {
    return { success: 'ok' };
  }
  return null;
}
function fn3({ a } = { a: null }) {
  if (a === 3) {
    return { success: 'ok' };
  }
  return null;
}
function fn4({ a } = { a: null }) {
  if (a === 4) {
    return { success: 'ok' };
  }
  return null;
}

function ResponsibilityChain(args) {
  this.args = args;
  this.response = null;
}
ResponsibilityChain.prototype = {
  joint: function (fn) {
    if (!this.response) {
      const calc = fn(this.args);
      console.log(`${fn.name} res is run`);
      if (calc) {
        this.response = calc;
      }
    }
    return this;
  },
  value: function () {
    return this.response;
  },
};

function run() {
  var respChain = new ResponsibilityChain({ a: 3 });
  const respChainEntry = respChain.joint(fn1).joint(fn4).joint(fn3).joint(fn2);
  const R = respChainEntry.value();
  console.log('R', R);
}
run();

/* 

fn1 res is run
fn4 res is run
fn3 res is run
R { success: 'ok' }

 */
```

2 策略模式

策略模式是对算法的封装，它把算法的责任和算法本身分割开，委派给不同的对象管理。策
略模式通常把一个系列的算法封装到一系列的策略类里面，作为一个抽象策略类的子类。用
一句话来说，就是“准备一组算法，并将每一个算法封装起来，使得它们可以互换”。在策略
模式中，应当由客户端自己决定在什么情况下使用什么具体策略角色。策略模式仅仅封装算
法，提供新算法插入到已有系统中，以及老算法从系统中“退休”的方便，策略模式并不决定
在何时使用何种算法，算法的选择由客户端来决定。这在一定程度上提高了系统的灵活性，
但是客户端需要理解所有具体策略类之间的区别，以便选择合适的算法，这也是策略模式的
缺点之一，在一定程度上增加了客户端的使用难度。

策略模式的目的是将算法的使用与定义解耦，能够实现根据规则路由到不同策略类进行处理
。可以通过策略模式解决根据不同参数组合执行不同业务逻辑的场景。但是我们的场景仅仅
通过一层策略路由无法满足任务处理需求。请求的分层处理又是责任链模式所擅长的了。

责任链模式可以实现逐级委托，但每一级又不能像策略模式那样路由到不同的处理者上；策
略模式通常只有一层路由，不易实现多个参数的策略组合。可以二者结合使用。

1.[如何优化你的 if-else？来试试“责任树模式”](https://mp.weixin.qq.com/s/Wib0Ly45te00HMUnIG-tbg)

<!--

title: 设计模式(3)--策略模式(算法的使用和算法的定义分开) tags:

- js
- 设计模式 date: 2018-04-08 17:14:32 categories:

策略模式:定义一系列的具体算法，把它们封装到一个策略组。对外开发一个 api 接口，接
受算法请求。然后把请求委托给摸一个策略类，来具体计算。

 -->
