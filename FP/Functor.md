## 函子(Functor)

函数式编程里面的运算，不直接针对值，而是针对这个值的容器。通过接口接入容器，引发
容器里面的值的变形。

这个容器我们成为`函子(Functor)` 。一般约定，函子的标志就是容器具有`map`方法。该
方法将容器里面的每一个值，映射到另一个容器。`functor` 是实现了`map 函数`并遵守一
些特定规则的`容器类型`

<!-- 因此，学习函数式编程，实际上就是学习函子的各种运算。由于可以把运算方法封装在函子
里面，所以又衍生出各种不同类型的函子，有多少种运算，就有多少种函子。函数式编程就
变成了运用不同的函子，解决实际问题。 -->

容器是一种创建函数式友好的数据结构的方法，数据结构其实不仅仅关于值，还关乎这些值
能进行的操作。更通俗的讲，容器可以看作一个 wrapper，通过容器处理后，一个值就能拥
有一些特定的行为。比如说 Promise.resolve() 在也许从某种意义上讲就是一种容器。让
我们的值拥有 Promise 相关的一些特性。

## 容器

容器就是函子，函子就是容器。书写函数式的程序，即通过管道把数据在一系列纯函数间传
递的程序。这些程序就是声明式的行为规范。

但是，控制流（control flow）、异常处理（error handling）、异步操作（asynchronous
actions）和状态（state）呢？还有更棘手的作用（effects）呢？

函数式编程怎么解决这些抽象概念问题呢 ？

首先我们将创建一个容器（`container`）。这个容器必须能够装载任意类型的值。这个容
器将会是一个对象，但我们不会为它添加`面向对象观念`下的`属性`和`方法`。

```javascript
let Container = function (x) {
  this.__value = x;
};

Container.of = function (x) {
  return new Container(x);
};
```

在 node 的 repl 中试一下

```javascript
Container.of(3);
//=>  Container { __value: 3 }

Container.of(3).toString();
//=>  '[object Object]'

Container.of(3).__value;
//=>  3
```

结果显示『 Container 』是一个对象。

Container 是个只有一个属性的对象。尽管容器可以有不止一个的属性，但大多数容器还是
只有一个。`_value` 不能是某个特定的类型。数据一旦存放到 Container，就会一直待在
那儿。我们可以用 `.__value` 获取到数据，但这样做有悖初衷。

可以把容器想象成玻璃罐。
<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/asdas.jpg" >
<img src="https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/images/functormap.png">
<img src="https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/images/functormapmaybe.png">

---

## 运算

一旦容器里有了值，不管这个值是什么，我们就需要运算。就像前面我们所说的,函数式编
程里面的运算，`不直接针对值`，而是`针对这个值的容器`。通过接口接入容器
，`引发容器里面的值的变形`。

编写 map 函数来写一个接口

```javascript
// (a -> b) -> Container a -> Container b
Container.prototype.map = function (f) {
  return Container.of(f(this.__value));
};
```

『 map 』函数针对『 Container.\_\_value 』进行遍历循环处理，Container 里的值传递
给 map 函数之后，就可以任我们操作，操作结束后，为了防止意外再把它放回它所属的
Container，由一个容器『 Container a 』，返回另一个容器『 Container b 』。

演示一下

```javascript
let Container = function (x) {
  this.__value = x;
};

Container.of = function (x) {
  return new Container(x);
};

Container.prototype.map = function (f) {
  return Container.of(f(this.__value));
};

Container.prototype.value = function () {
  return this.__value;
};

const a = Container.of([1, 3, 5])
  .map(x => x.map(v => v + 2))
  .value();
console.log(a); // > [3, 5, 7]

const b = Container.of('flamethrowers')
  .map(s => s.toUpperCase())
  .value();
console.log('b is', b); // > FLAMETHROWERS
```

把值装进一个容器，而且只能使用 map 来处理它，这么做的理由到底是什么呢？如果我们
换种方式来问，答案就很明显了：让容器自己去运用函数能给我们带来什么好处？答案是抽
象，对于函数运用的抽象。当 map 一个函数的时候，我们请求容器来运行这个函数。不夸
张地讲，这是一种十分强大的理念。

---

## 避免空值

我们新建另外一种 functor，名字叫 Maybe 。Maybe 看起来跟 Container 非常类似，但是
有一点不同：Maybe 会先检查自己的值是否为空，然后才调用传进来的函数。这样我们在使
用 map 的时候就能避免恼人的空值了（注意实现做了简化）。

```javascript
var Maybe = function (x) {
  this.__value = x;
};

Maybe.of = function (x) {
  return new Maybe(x);
};

Maybe.prototype.isNothing = function () {
  return this.__value === null || this.__value === undefined;
};

Maybe.prototype.map = function (f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
};
```

尝试一下

```javascript
Maybe.of(2).map(x => x + 2);
//=>  Maybe { __value: 4 }

Maybe.of(null).map(x => x + 2);
//=>  Maybe { __value: null }
```

实际当中，『 Maybe 』最常用在那些可能会无法成功返回结果的函数中。

---

1. [functors-monads](http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html)

---

函数式的程序，即通过管道把数据在一系列纯函数间传递的程序。但是，控制流（control
flow）、异常处理（error handling）、异步操作（asynchronous actions）和状态
（state）呢？还有更棘手的作用（effects）呢？

函数式编程怎么解决这些抽象概念问题呢 ？

首先我们将创建一个容器（`container`）。这个容器必须能够装载任意类型的值。这个容
器将会是一个对象，但我们不会为它添加`面向对象观念`下的`属性`和`方法`。

```javascript
const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`,
});

Box(2)
  .map(x => x + 2)
  .fold(x => x); // => 4
```

### Try-Catch

```javascript
const getUser = id =>
  [
    { id: 1, name: 'Loren' },
    { id: 2, name: 'Zora' },
  ].filter(x => x.id === id)[0];

const name = getUser(1).name;
console.log(name); // => 'Loren'

const name2 = getUser(4).name;
console.log(name2); // => 'TypeError: Cannot read property 'name' of undefined'
```

````javascript
try {
    const result = getUser(4).name
    console.log(result)
} catch (e) {
    console.log('error', e.message) // => 'TypeError: Cannot read property 'name' of undefined'
}```
````

仔细分析 try-catch 代码块的逻辑，希望代码从 try 分支走完的，catch 是一个兜底方案
，那么我们可以类比 try 为 Right 指代正常的分支，catch 为 Left 指代出现异常的分支
，他们两者绝不会同时出现！那么我们扩展一下我们的 Box ，分别为 Left 和 Right

Left 和 Right 的区别在于 Left 会自动跳过 map 方法传递的函数，而 Right 则类似于最
基本的 Box，会执行函数并把返回值重新包装到 Right 容器里面。Left 和 Right 完全类
似于 Promise 中的 Reject 和 Resolve，一个 Promise 的结果要么是 Reject 要么是
Resolve，而拥有 Right 和 Left 分支的结构体，我们可以称之为 Either ，要么向左，要
么向右，很好理解，对吧！上面的代码说明了 Left 和 Right 的基本用法，现在把我们的
Left 和 Right 应用到 getUser 函数上吧！

```javascript
const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

const resultLeft = Left(4)
  .map(x => x + 1)
  .map(x => x / 2);
console.log(resultLeft); // => Left(4)

const resultRight = Right(4)
  .map(x => x + 1)
  .map(x => x / 2);
console.log(resultRight); // => Right(2.5)
```

```javascript
const fromNullable = x => (x != null ? Right(x) : Left(null));

const getUser = id =>
  fromNullable(
    [
      { id: 1, name: 'Loren' },
      { id: 2, name: 'Zora' },
    ].filter(x => x.id === id)[0],
  );

const result = getUser(4)
  .map(x => x.name)
  .fold(
    () => 'not found',
    c => c.toUpperCase(),
  );

console.log(result); // => not found
```

```javascript
const tryCatch = f => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const jsonFormat = str => JSON.parse(str);

const app = str =>
  tryCatch(() => jsonFormat(str))
    .map(x => x.path)
    .fold(
      () => 'default path',
      x => x,
    );

const result = app('{"path":"some path..."}');
console.log(result); // => 'some path...'

const result2 = app('the way to death');
console.log(result2); // => 'default path'
```

为什么使用 Functor?

把值装进一个容器（比如 Box，Right，Left 等），然后只能用 map 来操作它，这么做的
理有到底是什么呢？如果我们换种方式来思考，答案就很明显了：让容器自己去运用函数能
给我们带来什么好处呢？答案是：抽象，对于函数运用的抽象。

纵观整个函数式编程的核心就在于把一个个的小函数组合成更高级的函数。

---

[函数式编程进阶：Functor](https://segmentfault.com/a/1190000021437883#item-1)
