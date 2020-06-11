## 特点一:function first，data last

Underscore 和 Lodash 把处理的数据放到了第一个参数。`Ramda 的数据一律放在最后一个参数`，理念是"function first，data last"。数据放在最后一个参数，这么设计，方便函数柯里化，Ramda 所有方法都支持柯里化，函数柯里化之后，方便函数的合成。

```javascript
const _ = require('lodash);

var square = n => n * n;
_.map([4, 8], square); // [16, 64]
```

上面代码中，`_.map` 的第一个参数[4, 8]是要处理的数据，第二个参数 square 是数据要执行的运算。

```javascript
var R = require('ramda');
R.map(square, [4, 8]); // [16, 64]
```

## 特点二:Ramda 所有方法都支持柯里化

?> ramda.js 常用的重要的 API

## Function

## R.pipe

?> 从『 左 -> 右 』执行函数组合。最左边的函数可以是任意元函数（参数个数不限），其余函数必须是一元函数。

```javascript
// 两个函数都是一元函数
var addOne = x => x + 1;
var square = x => x * x;

var addOneThenSquare = R.pipe(addOne, square);

addOneThenSquare(2); // > 9
```

```javascript
// Math.pow 是二元函数，R.negate，R.inc均为一元函数
var f = R.pipe(Math.pow, R.negate, R.inc);

f(3, 4); // -(3^4) + 1 => -80

// 也可以这样写
R.pipe(Math.pow, R.negate, R.inc)(3, 4); // -80
```

## R.compose

?> 『 从右往左 』执行函数组合。最右侧函数可以是任意元函数（参数个数不限），其余函数必须是一元函数。

```javascript
R.compose(Math.abs, R.add(1), R.multiply(2))(-4); //=> 7
```

## R.curry

?> 函数柯里化

```javascript
var addFourNumbers = (a, b, c, d) => a + b + c + d;

var curriedAddFourNumbers = R.curry(addFourNumbers);
var f = curriedAddFourNumbers(1, 2);
var g = f(3);
g(4); //=> 10
```

## R.\_\_

?> 柯里化函数的参数占位符。允许部分应用于任何位置的参数。

```javascript
var half = R.divide(R.__, 2);
half(42); // 21

R.divide(R.__, 2)(42); // 21
```

## R.clone

?> 深复制

```javascript
var objects = [{}, {}, {}];
var objectsClone = R.clone(objects);
objects === objectsClone; //=> false
objects[0] === objectsClone[0]; //=> false
```

## R.once

?> 执行一次

```javascript
var addOneOnce = R.once(x => x + 1);
addOneOnce(10); //=> 11
addOneOnce(10); //=> 11
```

## R.always

?> 返回一个返回恒定值的函数。注意，对于非原始值，返回的值是对原始值的引用。

```javascript
var t = R.always('Tee');
t(); //=> 'Tee'
```

## R.of

?> 将给定值作为元素，封装成单元素数组。

```javascript
R.of(null); //=> [null]
R.of([42]); //=> [[42]]
```

## R.omit

?> 删除对象中给定的 keys 对应的属性。

```javascript
R.omit(['a', 'd'], { a: 1, b: 2, c: 3, d: 4 }); //=> {b: 2, c: 3}
```

## R.forEach

?> 遍历 list，对 list 中的每个元素执行方法 fn。fn 接收单个参数： (value)。forEach 会将原数组返回，也就是说，并不改变原数组

```javascript
var printXPlusFive = x => console.log(x + 5);
R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
// 6
// 7
// 8
```

---

参考链接：

1. [Ramda API](http://ramda.cn/docs/)
2. [Ramda 函数库参考教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2017/03/ramda.html)
