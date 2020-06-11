Pointfree 翻译成中文就是"无值".

### Ramda-pipe

函数式编程中函数合成概念。使用的是 `Ramda` 函数库的 pipe 方法。

```javascript
fn = R.pipe(
  f1,
  f2,
  f3,
);
```

```javascript
const R = require('ramda');

var addOne = x => x + 1;
var square = x => x * x;

var addOneThenSquare = R.pipe(
  addOne,
  square,
);

addOneThenSquare(2); // 9
```

仔细观察，`var addOneThenSquare = R.pipe(addOne, square);`这一句，在定义`addOneThenSquare`合成函数的时候，没有任何地方要求传递一个参数。但是，在使用的时候`addOneThenSquare(2)`，这个`2`就是传入的参数。

### Ramda-allPass

allPass：接受一个函数数组作为参数，只有它们都返回 true，才返回 true，否则返回 false。

```javascript
const R = require('ramda');
var gt10 = x => x > 10;
var even = x => x % 2 === 0;

var isEvenAndGt10 = R.allPass([gt10, even]);

isEvenAndGt10(15); // false
isEvenAndGt10(30); // true
```

isEvenAndGt10 这个函数在定义的时候完全没有说，如何接受参数，是不是很神奇呢！

### 解析一下

解析一下，不使用 `Ramda` 函数库的 pipe 方法，自己写一个。

```javascript
const pipe = fns => x => fns.reduce((v, f) => f(v), x);

const add = a => a + 1;
const times = a => a * 2;

const xue = pipe([times, add]); 
// const xue = (x) => fns.reduce((v, f) => f(v), x)

xue(5); // --> pipe([times, add])(5) --> 11
```

个人理解，`xue`这个变量名，保存着存到这个变量里的函数。
就是说`xue === (x) => [times, add].reduce((v, f) => f(v), x)`

Pointfree 的本质就是使用一些通用的函数，组合出各种复杂运算。上层运算不要直接操作数据，而是通过底层函数去处理。
简单说，Pointfree 就是运算过程抽象化，处理一个值，但是不提到这个值。这样做有很多好处，它能够让代码更清晰和简练，更符合语义，更容易复用，测试也变得轻而易举。
