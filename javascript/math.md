Math 对象的方法

```
abs(x) 返回数的绝对值
acos(x) 返回数的反余弦值
asin(x) 返回数的反正弦值
atan(x) 以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值
atan2(y,x) 返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）
ceil(x) 对一个数进行上舍入。
cos(x) 返回数的余弦
exp(x) 返回 e 的指数。
floor(x) 对一个数进行下舍入。
log(x) 返回数的自然对数（底为 e）
max(x,y) 返回 x 和 y 中的最高值
min(x,y) 返回 x 和 y 中的最低值
pow(x,y) 返回 x 的 y 次幂
random() 返回 0 ~ 1 之间的随机数
round(x) 把一个数四舍五入为最接近的整数
sin(x) 返回数的正弦
sqrt(x) 返回数的平方根
tan(x) 返回一个角的正切
toSource() 代表对象的源代码
valueOf() 返回一个 Math 对象的原始值
```

---

#### 四舍五入 Math.round(number)

```javascript
Math.round(20.1); // -> 20
Math.round(20.5); // -> 21
Math.round(20.9); // -> 21
Math.round(-20.1); // -> -20
Math.round(-20.5); // -> -20 注意这里是-20而不是-21
Math.round(-20.9); // -> -21
```

#### 向上取整 Math.ceil(number)

有小数，整数就加一

```javascript
Math.ceil(20.1); // -> 21
Math.ceil(20.5); // -> 21
Math.ceil(20.9); // -> 21
Math.ceil(-20.1); // -> -20
Math.ceil(-20.5); // -> -20
Math.ceil(-20.9); // -> -20
```

#### 向下取整 Math.floor(number)

```javascript
Math.floor(20.1); // -> 20
Math.floor(20.5); // -> 20
Math.floor(20.9); // -> 20
Math.floor(-20.1); // -> -21
Math.floor(-20.5); // -> -21
Math.floor(-20.9); // -> -21
```

#### 删除小数点

```javascript
Math.trunc(42.84); // 42
Math.trunc(0.123); //  0
Math.trunc(-0.123); // -0
Math.trunc('-1.123'); // -1
Math.trunc(NaN); // NaN
Math.trunc('foo'); // NaN
Math.trunc(); // NaN

parseInt(5 / 2); // => 2

console.log(~~47.11); // -> 47
console.log(~~1.9999); // -> 1
console.log(~~3); // -> 3
console.log(~~[]); // -> 0
console.log(~~NaN); // -> 0
console.log(~~null); // -> 0
```

Math.trunc() 方法会将数字的小数部分去掉，只保留整数部分。IE 不支持 Math.trunc，我们可以写一个腻子脚本 Polyfill

```javascript
Math.trunc =
  Math.trunc ||
  function(x) {
    if (isNaN(x)) {
      return NaN;
    }
    if (x > 0) {
      return Math.floor(x);
    }
    return Math.ceil(x);
  };
```

#### 保留小数的位数

```javascript
(3.1415926).toFixed(3); // => '3.142'
```

#### 随机数 Math.random()

random 方法可返回介于 0 ~ 1 之间的一个随机数。

```javascript
// 期望，生成1-20之间的随机数,包括[1,20]
let max = 20;
let a = parseInt(Math.random() * max, 10) + 1;
let b = Math.floor(Math.random() * max) + 1;
let c = Math.ceil(Math.random() * max);

console.log(a);
console.log(b);
console.log(c);

// 期望，生成0-20之间的随机数,包括[0,20]：
let max2 = 20;
let d = parseInt(Math.random() * (max2 + 1), 10);
let e = Math.floor(Math.random() * (max2 + 1));

console.log(d);
console.log(e);

// 期望，区间内取得任意数[5,10]
// max3 - 期望的最大值
// min - 期望的最小值
let min = 5;
let max3 = 10;
let f = parseInt(Math.random() * (max3 - min + 1) + min, 10);
let g = Math.floor(Math.random() * (max3 - min + 1) + min);

console.log(f);
console.log(g);
```

```javascript
// 0-100随机数组成的长度为10的数组

let array = Array(10).fill(0);
for (var i = 0; i < array.length; i++) {
  let rand = Math.floor(Math.random() * (100 + 1));
  if (array[i] != rand) {
    array[i] = rand;
  }
}
console.log(array);
// [ 23, 26, 21, 63, 57, 44, 70, 47, 11, 64 ]
```

#### parseInt(string, radix);

parseInt() 函数解析一个字符串参数，并返回一个指定基数的整数 (数学系统的基础)。这个估计是直接取整最常用的方法了。

`string`
要被解析的值。如果参数不是一个字符串，则将其转换为字符串(使用 ToString 抽象操作)。字符串开头的空白符将会被忽略。
`radix`
一个介于 2 和 36 之间的整数(数学系统的基础)，表示上述字符串的基数。比如参数"10"表示使用我们通常使用的十进制数值系统。始终指定此参数可以消除阅读该代码时的困惑并且保证转换结果可预测。当未指定基数时，不同的实现会产生不同的结果，通常将值默认为 10。

```javascript
parseInt('123', 5); // 返回38 => 1*5^2 + 2*5^1 + 3*5^0 = 38
```
