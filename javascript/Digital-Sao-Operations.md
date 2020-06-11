### 字符串转换成数字

```javascript
console.log(+'3.14'); // => 3.14
console.log(typeof +'3.14'); // => number

const strNumber = '2333';
const r = strNumber * 1;
console.log(r, typeof r);
// 2333 'number'
```

### 转换成字符串

要快速将数字转换成字符串，我们可以使用 + 运算符，然后在后面跟上一个空字符串

```javascript
const val = 1 + '';
console.log(val); // Result: "1"
console.log(typeof val); // Result: "string"

console.log(+true); // Return: 1
console.log(+false); // Return: 0
```

### 取整

我们可以使用 Math.floor()、Math.ceil() 或 Math.round() 将浮点数转换成整数，但有另一种更快的方式，即使用位或运算符 |。

| 的实际行为取决于操作数是正数还是负数，所以在使用这个运算符时要确保你知道操作数是正是负。
如果 n 是正数，那么 n|0 向下取整，否则就是向上取整。它会移除小数部分，也可以使用~~ 达到同样的效果。

```javascript
console.log(~~3.14); // Return: 3
console.log(~~-2.5); // Return: -2

console.log(10.98 | 0); // Return: 10
console.log(6.18 | 0); // Return: 6
console.log(-3.6 | 0); // Return: -3

console.log(9.9 >> 0); // Return: 9
console.log(-2.1 >> 0); // Return: -2
```

### 移除整数尾部数字

```javascript
let str = '1553';
Number(str.substring(0, str.length - 1));

console.log((1553 / 10) | 0); // Result: 155
console.log((1553 / 100) | 0); // Result: 15
console.log((1553 / 1000) | 0); // Result: 1
```

### 千分位

<!-- ```javascript
const reg1 = /(\d{1,3})(?=(\d{3})+(?:$|\D))/g;
const reg2 = /(?=(\B\d{3})+$)/g;

const money1 = '12312312321312312.12234';

const A = money1.replace(reg1, '$1,');
console.log('A: ', A);
const B = money1.replace(reg2, ',');
console.log('B: ', B);

// A:  12,312,312,321,312,312.12,234
// B:  12312312321312312.12,234

const money2 = '12312312321312312';

const C = money2.replace(reg1, '$1,');
console.log('C: ', C);
const D = money2.replace(reg2, ',');
console.log('D: ', D);

// C:  12,312,312,321,312,312
// D:  12,312,312,321,312,312
``` -->

```javascript
const num = 2333333.40763;
const money1 = '12312312321312312.12234';

const MicrobitFormate = str =>
  new Intl.NumberFormat('en', {
    maximumFractionDigits: 10,
  }).format(str);

console.log(
  'Result is: ',
  MicrobitFormate(money1),
  'Type is: ',
  typeof MicrobitFormate(money1),
);

console.log('Result is: ', MicrobitFormate(num));

console.log(num.toLocaleString('zh', { style: 'decimal' }));
// 2,333,333.408
```
