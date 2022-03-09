### RGB 转 hex

```javascript
const rgbToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

console.log(rgbToHex(105, 165, 234)); // 69a5ea
```

```javascript
const hexToRgb = hex =>
  `rgb(${hex
    .slice(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16))
    .join()})`;

console.log(hexToRgb('###  27ae60')); // rgb(39,174,96)
```

### 获取当前页面 URL

```javascript
const currentUrl = _ => window.location.href;
// currentUrl() -> 'https://google.com'
```

### 判断奇偶数:even-偶数

```javascript
const isEven = num => num % 2 === 0;
// isEven(3) -> false
```

### Shallow clone object (浅克隆对象)

使用 Object.assign() 和一个空对象({})来创建原始对象的浅拷贝。

```javascript
const shallowClone = obj => Object.assign({}, obj);

const a = { x: true, y: 1, c: [1, 2] };
const b = shallowClone(a);
console.log(a === b); //false
console.log(a); //  { x: true, y: 1, c: [1, 2] }
console.log(b); //  { x: true, y: 1, c: [1, 2] }
```

### 基本数据类型判断

1.检查一个值是否为一个`数组`

```javascript
const isArray = val => !!val && Array.isArray(val);

console.log(isArray(null)); // false
console.log(isArray([1, 2])); // true
```

2.检查一个值是否为一个`布尔值`

```javascript
const isBoolean = val => typeof val === 'boolean';

console.log(isBoolean(null)); // false
console.log(isBoolean(false)); // true
```

3.检查一个值是否为一个`函数`

```javascript
const isFunction = val => val && typeof val === 'function';

// isFunction('x') -> false
// isFunction(x => x) -> true
```

4.检查一个值是否为一个`数字`

```javascript
const isNumber = val => typeof val === 'number';
// isNumber('1') -> false
// isNumber(1) -> true
```

5.检查一个值是否为一个`字符串`

```javascript
const isString = val => typeof val === 'string';
// isString(10) -> false
// isString('10') -> true
```

6.检查一个值是否为一个`Symbol`

```javascript
const isSymbol = val => typeof val === 'symbol';
// isSymbol('x') -> false
// isSymbol(Symbol('x')) -> true
```

```javascript
// javascript设计模式和开发实践
const isType = function (type) {
  return function (obj) {
    // return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  };
};

const isString = isType('String');
const isArray = isType('Array');
const isNumber = isType('Number');

console.log(isArray([1, 2, 3])); // true
```

### instanceof

instanceof 主要的作用就是判断一个实例是否属于某种类型

```javascript
let person = function () {};
let nicole = new person();
nicole instanceof person; // true
```

### indexOf

```javascript
const str = 'xuetengfei';
log(str.indexOf('t')); // 3
log(str.indexOf('a') == -1); // true
```

### includes

不要用 indexof，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比
较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断
，这会导致对 NaN 的误判。

```javascript
['cat', 'dog', 'bat'].includes('cat'); //true
'asd'
  .includes('s') // true
  [(1, 2, NaN)].includes(NaN); // true
```

[JavaScript 确定一个字符串是否包含在另一个字符串中的四种方法 - Mazey - 博客园](https://www.cnblogs.com/mazey/p/8436381.html)

[浅谈 instanceof 和 typeof 的实现原理 | Nicole's Blog](https://tinycat2017.github.io/2018/05/28/%E6%B5%85%E8%B0%88-instanceof-%E5%92%8C-typeof-%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86/)

### hasOwnProperty 判断属性是否存在

判断**自身属性**而非**继承属性**

```javascript
o = new Object();
o.prop = 'exists';

function changeO() {
  o.newprop = o.prop;
  delete o.prop;
}

o.hasOwnProperty('prop'); // 返回 true
changeO();
o.hasOwnProperty('prop'); // 返回 false
```

### in

[in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in)
如果指定的属性在指定的对象或其原型链中，则 in 运算符返回 true

prop in object

```javascript
var mycar = { make: 'Honda', model: 'Accord', year: 1998 };
console.log('make' in mycar); // true
console.log('toString' in mycar); // true
```

### 数组去假值

从数组中移除 falsey 值元素。使用 Array.filter() 过滤掉数组中所有 假值元素(false,
null, 0, "", undefined, and NaN)。

```javascript
// lodash
const _ = require('lodash');
let arr = [undefined, undefined, 123, undefined];

console.log(_.compact(arr)); // 123
```

```javascript
const compact = arr => arr.filter(Boolean);

// compact([0, 1, false, 2, '', 3, 'a', 'e'*23, NaN, 's', 34]) -> [ 1, 2, 3, 'a', 's', 34 ]
```

```javascript
const a = [0, 1, false, 2, '', 3, null, 123, undefined, 'apple'].filter(
  Boolean,
);

console.log('a is', a); // => [ 1, 2, 3, 123, 'apple' ]
```

### 对象去假值

```javascript
// 删除对象中空的属性

const _ = require('lodash');

let obj = {
  bank: 'ICCB',
  rentNum: '',
  custmer: undefined,
  prepay: null,
  id: 4386,
};

const compactObj = obj => {
  let raw = Object.keys(obj).filter(x => !!obj[x] === false);
  return _.omit(obj, raw);
};

console.log(compactObj(obj)); // { bank: 'ICCB', id: 4386 }
```

### 三元表达式

```javascript
// 箭头函数没有{}也没有return关键字，隐式返回
const getGreeting = user => (user ? `Hello, ${user}` : `Hello, Strange`);

// 或

const getGreeting = user => {
  return user ? `Hello, ${user}` : `Hello, Strange`;
};

console.log(getGreeting()); // Hello, Strange
console.log(getGreeting('li')); // Hello, li
```

```javascript
const add = num => {
  let inner = 10;
  return num > 0 ? inner + num : '';
};
console.log(add(1)); //  11
console.log(add()); //  输出:空字符串
console.log(typeof add()); //  string
```

### 短路求值，避免无意义的条件判断

```javascript
// 反例
function createMicrobrewery(name) {
  var breweryName;
  if (name) {
    breweryName = name;
  } else {
    breweryName = 'Hipster Brew Co.';
  }
}
```

```javascript
// 正例
function createMicrobrewery(name) {
  var breweryName = name || 'Hipster Brew Co.';
}
```

```javascript
// 默认传参
const createMicrobrewery = (name = 'Hipster Brew Co.') => {
  return name;
};
console.log(createMicrobrewery22('asd')); // asd
console.log(createMicrobrewery22()); // Hipster Brew Co.
```

### React 中的三目运算符

如果要在 render 中的 JSX 中使用 if-else 语句，可以使用 JavaScripts 三元运算符来
执行此操作：

```javascript
import React, { Component } from 'react';

class App extends Component {
  render() {
    const users = [{ name: 'Robin' }, { name: 'Markus' }];

    const showUsers = false;

    if (!showUsers) {
      return null;
    }

    return (
      <ul>
        {users.map(user => (
          <li>{user.name}</li>
        ))}
      </ul>
    );
  }
}

export default App;
```

```javascript
//...
return (
      <div>
        {
          showUsers ? (
            <ul>
              {users.map(user => <li>{user.name}</li>)}
            </ul>
          ) : (
            null
          )
        }
      </div>
// ...
```

另一种方法是，如果你只返回条件渲染的一边，则使用&&运算符：

```javascript
// ...
 return (
      <div>
        {
          showUsers && (
            <ul>
              {users.map(user => <li>{user.name}</li>)}
            </ul>
          )
        }
      </div>
// ...
```

### 隐性返回速记法

我们经常使用 return 关键字来返回一个函数的结果。仅有一个表达式的箭头函数会隐性返
回函数结果（函数必须省略大括号({})才能省略 return 关键字）。如果要返回多行表达式
（比如一个对象字面量），那么需要用 **()** 而不是 **{}** 来包裹函数体。这样可以确
保代码作为一个单独的表达式被计算返回。

### 强制要求传参，否则报错

可以在**utils.js**这类函数文件头部，写一个小函数，来检测函数调用是否正确传参。

```javascript
// utils.js
const required = (...para) => {
  let type;
  para.length === 0 ? (type = '!') : (type = ':' + para[0]);
  throw new Error(`Missing parameter${type}`);
};
```

使用方式如下。

```javascript
const add = (a = required(), b = required('number')) => a + b;
add(1, 2); //3
add(1); // Error: Missing parameter:number.
```

### 在函数参数中解构嵌套对象

```javascript
var car = {
  model: 'bmw 2018',
  engine: {
    v6: true,
    turbo: true,
    vin: 12345,
  },
};
const modelAndVIN = ({ model, engine: { vin } }) => {
  console.log(`model: ${model} vin: ${vin}`);
};
modelAndVIN(car); // => model: bmw 2018  vin: 12345
```

### 类数组的数据类型转为为数组

```javascript
typeof [...doucment.getElementByClassName('name')]  // is Array

Array.form（ArrayLike）
```

### 数值交换(数组结构)

```javascript
let param1 = 1;
let param2 = 2;
//swap and assign param1 & param2 each others values
[param1, param2] = [param2, param1];
console.log(param1); // 2
console.log(param2); // 1
```

### 接收函数返回的多个结果

在下面的代码中，我们从/post 中获取一个帖子，然后在/comments 中获取相关评论。由于
我们使用的是 async/await，函数把返回值放在一个数组中。而我们使用数组解构后就可以
把返回值直接赋给相应的变量。

```javascript
async function getFullPost() {
  return await Promise.all([fetch('/post'), fetch('/comments')]);
}
const [post, comments] = getFullPost();
```

### Object [key] 验证函数

```javascript
// object validation rules
const schema = {
  first: {
    required: true,
  },
  last: {
    required: true,
  },
};

// universal validation function
const validate = (schema, values) => {
  for (x in schema) {
    if (schema[x].required) {
      if (!values[x]) {
        return false;
      }
    }
  }
  return true;
};

console.log(validate(schema, { first: 'Bruce' })); // false
console.log(validate(schema, { first: 'Bruce', last: 'Wayne' })); // true
```

### 让对象拥有私有成员

可以通过闭包完成

```javascript
// 1
const uniqueId = (function () {
  let count = 0;
  return function () {
    ++count;
    return `id_${count}`;
  };
})();

console.log(uniqueId()); // "id_1"
console.log(uniqueId()); // "id_2"
console.log(uniqueId()); // "id_3"
```

```javascript
// 2
var Employee = (function () {
  function Employee(name) {
    this.getName = function () {
      return name;
    };
  }

  return Employee;
})();

var employee = new Employee('John Doe');
console.log('Employee name: ' + employee.getName()); // Employee name: John Doe
delete employee.name;
console.log('Employee name: ' + employee.getName()); // Employee name: John Doe
```

```javascript
let stopBodyScroll = (() => {
  let bodyEl = document.body;
  let topH = 0;
  return isFixed => {
    if (isFixed) {
      topH = window.scrollY;
      bodyEl.style.position = 'fixed';
      bodyEl.style.top = -topH + 'px';
    } else {
      bodyEl.style.position = '';
      bodyEl.style.top = '';
      window.scrollTo(0, topH);
    }
  };
})();

let open = () => {
  stopBodyScroll(true);
};
let close = () => {
  stopBodyScroll(false);
};
```

### 混叠变量

不管在外部作用域有什么值指定给$，在 IIFE 中，这些值都会被"屏蔽"，$参数一直指向
jQuery 方法。

```javascript
(function ($) {
  // ...
})(jQuery);

(function (global) {
  // ...
})(this);

(function (window, document, undefined) {
  // ...
})(window, document);
```

[JavaScript 立即执行函数表达式(IIFE)用例 - 众成翻译](https://www.zcfy.cc/article/use-cases-for-javascript-x27-s-iifes-marius-schulz-4082.html)

### 使用 Set 实现数组去重

```javascript
let arr = [1, 1, 2, 2, 3, 3];
let deduped = [...new Set(arr)];

console.log(deduped); // [1, 2, 3]
```

### 短路、类型转换、且或非

```javascript
callback && callback();
// 回调函数存在的话，就执行它
// 避免，没有真正的回调函数的时候，报错

console.log(true && false); // false
console.log(true && true); // true
console.log(false && false); // false
console.log(false && true); // false
console.log(0 && 1); // 0
console.log(1 && 2); // 2
// 1、只要“&&”前面是true，无论“&&”后面是true还是false，结果都将返“&&”后面的值;
// 2、只要“&&”前面是false，无论“&&”后面是true还是false，结果都将返“&&”前面的值;
```

之所以可以这么做，是因为在 JavaScript 中，true && expression 总是返回
expression，而 false && expression 总是返回 false。

<!-- [全面解析 JavaScript 中“&&”和“||”操作符(总结篇)*javascript 技巧*脚本之家](https://www.jb51.net/article/88781.htm) -->

### 日期格式化(不依赖第三方)

```javascript
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }

  return fmt;
};

const a = new Date().format('yyyy-M-d h:m:s');
console.log('a is', a);
// 17-10-14 22:18:17
```

### 星级评价

```javascript
const startLevel = rate => '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate);
console.log('startLevel is', startLevel(4)); // => startLevel is ★★★★☆
```

---

### 将数字转化为整数数组

Number to array of digits 将数字转换为字符串，使用 split() 来转换构建一个数组。
使用 Array.map() 和 parseInt() 将每个值转换为整数。

```javascript
const digitize = n => ('' + n).split('').map(i => parseInt(i));

console.log(digitize(2334)); // [2, 3, 3, 4]
```

### 交换两个变量的值

使用数组解构来交换两个变量之间的值。

```javascript
// method_1

let a = 1;
let b = 233;

[a, b] = [b, a];

console.log(a); // 233
console.log(b); // 1
```

```javascript
// method_2

var a = 20,
  b = 30;

a ^= b;
b ^= a;
a ^= b;

console.log(a); // 30
console.log(b); // 20
```

### 求数组最大(小)值

```javascript
Math.max(...[14, 3, 77]);

console.log(Math.max(...[14, 3, 77])); // 77
console.log(Math.min(...[14, 3, 77])); // 3

const arrayMax = arr => Math.max(...arr);
// arrayMax([10, 1, 5]) -> 10

const arrayMin = arr => Math.min(...arr);
// arrayMin([10, 1, 5]) -> 1
```

### 过滤出数组中的非唯一值

使用 Array.filter() 滤除掉非唯一值，使数组仅包含`唯一值`。

```javascript
const filterNonUnique = arr =>
  arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

console.log(filterNonUnique([1, 2, 2, 3, 4, 4, 5])); // [1,3,5]
```

### 根据指定的 depth 平铺数组

每次递归，使 depth 减 1 。使用 Array.reduce() 和 Array.concat() 来合并元素或数组
。默认情况下， depth 等于 1 时停递归。省略第二个参数 depth ，只能平铺 1 层的深度
(单层平铺)。

```javascript
const flattenDepth = (arr, depth = 1) =>
  depth != 1
    ? arr.reduce(
        (a, v) => a.concat(Array.isArray(v) ? flattenDepth(v, depth - 1) : v),
        [],
      )
    : arr.reduce((a, v) => a.concat(v), []);

console.log(flattenDepth([1, [2], [[[3], 4], 5]], 2)); // [ 1, 2, [ 3 ], 4, 5 ]
```

### 平铺数组

```javascript
const flatten = arr => arr.reduce((a, v) => a.concat(v), []);

console.log(flatten([1, [9], 8, 23])); // [ 1, 9, 8, 23 ]

// 验证之后，对于三层嵌套的时候，无法展开一层平铺 ？！
```

### 深度平铺数组

使用递归。 通过空数组([]) 使用 Array.concat() ，结合 展开运算符(... ) 来平铺数组
。 递归平铺每个数组元素。

```javascript
const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]
```

### 多维数组展开为一维数组

How to flatten nested array in JavaScript?

```javascript
var foo = [1, [2, 3], ['4', 5, ['6', 7, [8]]], [9], 10];

function flatten(a) {
  return Array.isArray(a) ? [].concat(...a.map(flatten)) : a;
}

flatten(foo);
// [1, 2, 3, "4", 5, "6", 7, 8, 9, 10]
```

### 获取数组的第一个元素

得到第一个元素

```javascript
const head = arr => arr[0];

console.log(head([1, 2, 3])); // 1
```

删除最后一个元素

```javascript
const initial = arr => arr.slice(0, -1);
// initial([1,2,3]) -> [1,2]
```

获得最后一个元素

```javascript
const last = arr => arr.slice(-1)[0];
// last([1,2,3]) -> 3
```

Tail of list (返回剔除第一个元素后的数组)

```javascript
const tail = arr => (arr.length > 1 ? arr.slice(1) : arr);

console.log(tail([1, 2, 3])); // [2,3]
console.log(tail([1])); // [1]
```

获取数组的第 N 个元素

```javascript
const nth = (arr, n = 0) => (n > 0 ? arr.slice(n, n + 1) : arr.slice(n))[0];

console.log(nth(['a', 'b', 'c', 'd'], -2)); // c
```

### 获取数组交集

```javascript
const similarity = (arr, values) => arr.filter(v => values.includes(v));
// similarity([1,2,3], [1,2,4]) -> [1,2]
```

### 数组求和

```javascript
const sum = arr => arr.reduce((acc, val) => acc + val, 0);

console.log(sum([1, 2, 3, 4, 999])); // 1009
```

### Take right

```javascript
// 从一个给定的数组中创建一个后N个元素的数组

const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length);
// takeRight([1, 2, 3], 2) -> [ 2, 3 ]
// takeRight([1, 2, 3]) -> [3]
```

### Take

```javascript
// 从一个给定的数组中创建一个前N个元素的数组

const take = (arr, n = 1) => arr.slice(0, n);
// take([1, 2, 3], 5) -> [1, 2, 3]
// take([1, 2, 3], 0) -> []
```

### Current URL (获取当前页面 URL)

```javascript
const currentUrl = _ => window.location.href;
// currentUrl() -> 'https://google.com'
```

### Factorial (阶乘)

使用递归。如果 n 小于或等于 1 ，则返回 1 。否则返回 n 和 n - 1 的阶乘。

```javascript
const factorial = n => n < = 1 ? 1 : n * factorial(n - 1);
// factorial(6) -> 720
```

### Greatest common divisor (GCD) (最大公约数)

使用递归。当 y 等于 0 的情况下，返回 x 。否则，返回 y 和 x/y 余数最大公约数。

```javascript
const gcd = (x, y) => (!y ? x : gcd(y, x % y));
// gcd (8, 36) -> 4
```

### Percentile (百分比)

使用 Array.reduce() 来计算有多少数字小于等于该值，并用百分比表示。

```javascript
const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0,
    )) /
  arr.length;
// percentile([1,2,3,4,5,6,7,8,9,10], 6) -> 55
```

指定长度

```javascript
const percentile = (arr, val, length = 3) =>
  Number(
    String(
      (100 *
        arr.reduce(
          (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
          0,
        )) /
        arr.length,
    ).substr(0, length + 1),
  );
// percentile([1,2,3,4,5,6,7,8,9,10], 6) -> 55
console.log(percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 18, 11], 6, 5)); // 45.833
```

### Round number to n digits (精确的几位小数)

```javascript
const round = (n, decimals = 0) =>
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

console.log(round(11.00123233735, 4)); // 11.0012
```

### 数组拼接

```javascript
const ArrayConcat = (arr, ...args) => [].concat(arr, ...args);

console.log(ArrayConcat([1], [1, 2, 3, [4]]));
// [ 1, 1, 2, 3, [ 4 ] ]
```

### 数组比较

```javascript
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

console.log(difference([1, 2, 3], [1, 2])); // [3]
```

### 检查数组包含

使用 slice() 来抵消数组/字符串，并且使用 indexOf() 来检查是否包含该值。如果省略
最后一个参数 fromIndex ，则会检查整个数组/字符串。

```javascript
const includes = (collection, val, fromIndex = 0) =>
  collection.slice(fromIndex).indexOf(val) != -1;

console.log(includes([1, 2, 3, 4], [1, 2], 1)); // false
console.log(includes('30-seconds-of-code', 'code')); // true
```

### 数组交集

根据数组 b 创建一个 Set 对象，然后在数组 a 上使用 Array.filter() 方法，只保留数
组 b 中也包含的值。

```javascript
const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
};

console.log(intersection([1, 2, 3], [4, 3, 2])); // [ 2, 3 ]
```

### 移除数组中的元素

使用 Array.filter() 和 Array.reduce() 来查找返回真值的数组元素，使用
Array.splice() 来移除元素。 func 有三个参数(value, index, array)，是过滤函数

```javascript
const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
        arr.splice(arr.indexOf(val), 1);
        return acc.concat(val);
      }, [])
    : [];
//remove([1, 2, 3, 4], n => n % 2 == 0) -> [2, 4]
```

### Array union (数组合集)

用数组 a 和 b 的所有值创建一个 Set 对象，并转换成一个数组。

```javascript
const union = (a, b) => Array.from(new Set([...a, ...b]));

// union([1,2,3], [4,3,2]) -> [1,2,3,4]
```

### 从数组中排除给定值

使用 Array.filter() 创建一个排除所有给定值的数组。

```javascript
const without = (arr, ...args) => arr.filter(v => args.indexOf(v) === -1);
// without([2, 1, 2, 3], 1, 2) -> [3]
// without([2, 1, 2, 3, 4, 5, 5, 5, 3, 2, 7, 7], 3, 1, 5, 2) -> [ 4, 7, 7 ]
```

### 求数组的平均数 Average

使用 Array.reduce() 将数组中的每个值添加到一个累加器，使用 0 初始化，除以数组的
length (长度)。

```javascript
const average = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;
// average([1,2,3]) -> 2
```

### 计数数组中某个值的出现次数

每次遇到数组中的指定值时，使用 Array.reduce() 来递增计数器

```javascript
const countOccurrences = (arr, value) =>
  arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0);
// countOccurrences([1,1,2,1,2,3], 1) -> 3
```

### 删除数组中的元素

循环数组，使用 Array.shift() 删除数组的第一个元素，直到函数的返回值为 true 。返
回其余的元素。

```javascript
const dropElements = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr.shift();
  return arr;
};
// dropElements([1, 2, 3, 4], n => n >= 3) -> [3,4]
```

### Fill array (填充数组)

使用 Array.map() 将指定值映射到 start(包含)和 end (排除)之间。省略 start 将从第
一个元素开始，省略 end 将在最后一个元素完成。

```javascript
const fillArray = (arr, value, start = 0, end = arr.length) =>
  arr.map((v, i) => (i >= start && i < end ? value : v));

// fillArray([1,2,3,4],'8',1,3) -> [1,'8','8',4]
```

### 复制数组

```javascript
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
// a2都是a1的克隆。
```

### 合并数组

```javascript
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]

var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```

### 数组的处理：同位覆盖

```javascript
let a = Object.assign([1, 2, 3, 9], [4, 5, , 6]);
console.log(a); // [ 4, 5, 3, 6 ]
console.log(typeof a);
```

### 递归计算费纳波切数组

```javascript
let fibonacci = (len = 5, arr = [1]) => {
  var a = arr[arr.length - 1];
  var b = arr.length < 2 ? 0 : arr[arr.length - 2];
  arr.push(a + b);
  return arr.length == len ? arr : fibonacci(len, arr);
};

console.log(fibonacci(6)); // [ 1, 1, 2, 3, 5, 8 ]
```

### instanceof

instanceof 主要的作用就是判断一个实例是否属于某种类型

```javascript
let person = function () {};
let nicole = new person();
nicole instanceof person; // true
```

### indexOf

```javascript
const str = 'xuetengfei';
log(str.indexOf('t')); // 3
log(str.indexOf('a') == -1); // true
```

### includes

不要用 indexof，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比
较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断
，这会导致对 NaN 的误判。

```javascript
['cat', 'dog', 'bat'].includes('cat'); //true
'asd'
  .includes('s') // true
  [(1, 2, NaN)].includes(NaN); // true
```

[JavaScript 确定一个字符串是否包含在另一个字符串中的四种方法 - Mazey - 博客园](https://www.cnblogs.com/mazey/p/8436381.html)

### some

some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。 some() 方法会依次
执行数组的每个元素：如果**有一个**元素满足条件，则表达式返回 true , 剩余的元素不
会再执行检测。如果没有满足条件的元素，则返回 false。注意： some() 不会对空数组进
行检测。some() 不会改变原始数组

```javascript
const arr = ['a', 'b', 'c', 'd'];
log(arr.some(x => x === 'a')); // true
```

[浅谈 instanceof 和 typeof 的实现原理 | Nicole's Blog](https://tinycat2017.github.io/2018/05/28/%E6%B5%85%E8%B0%88-instanceof-%E5%92%8C-typeof-%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86/)

### hasOwnProperty 判断属性是否存在

判断**自身属性**而非**继承属性**

```javascript
o = new Object();
o.prop = 'exists';

function changeO() {
  o.newprop = o.prop;
  delete o.prop;
}

o.hasOwnProperty('prop'); // 返回 true
changeO();
o.hasOwnProperty('prop'); // 返回 false
```

### in

[in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in)
如果指定的属性在指定的对象或其原型链中，则 in 运算符返回 true

prop in object

```javascript
var mycar = { make: 'Honda', model: 'Accord', year: 1998 };
console.log('make' in mycar); // true
console.log('toString' in mycar); // true
```

### Object.keys/value/entries

```javascript
const icecreamColors = {
  chocolate: 'brown',
  vanilla: 'white',
  strawberry: 'red',
};

const values = Object.values(icecreamColors);
console.log(values); // [ 'brown', 'white', 'red' ]

const keys = Object.keys(icecreamColors);
console.log(keys); // [ 'chocolate', 'vanilla', 'strawberry' ]

const entries = Object.entries(icecreamColors);
console.log(entries);
// [ [ 'chocolate', 'brown' ],['vanilla', 'white'],['strawberry', 'red'] ]
```

### 三元表达式

```javascript
// 箭头函数没有{}也没有return关键字，隐式返回
const getGreeting = user => (user ? `Hello, ${user}` : `Hello, Strange`);

// 或

const getGreeting = user => {
  return user ? `Hello, ${user}` : `Hello, Strange`;
};

console.log(getGreeting()); // Hello, Strange
console.log(getGreeting('li')); // Hello, li
```

```javascript
const add = num => {
  let inner = 10;
  return num > 0 ? inner + num : '';
};
console.log(add(1)); //  11
console.log(add()); //  输出:空字符串
console.log(typeof add()); //  string
```

### 短路求值，避免无意义的条件判断

```javascript
// 反例
function createMicrobrewery(name) {
  var breweryName;
  if (name) {
    breweryName = name;
  } else {
    breweryName = 'Hipster Brew Co.';
  }
}
```

```javascript
// 正例
function createMicrobrewery(name) {
  var breweryName = name || 'Hipster Brew Co.';
}
```

```javascript
// 默认传参
const createMicrobrewery = (name = 'Hipster Brew Co.') => {
  return name;
};
console.log(createMicrobrewery22('asd')); // asd
console.log(createMicrobrewery22()); // Hipster Brew Co.
```

### React 中的三目运算符

如果要在 render 中的 JSX 中使用 if-else 语句，可以使用 JavaScripts 三元运算符来
执行此操作：

```javascript
import React, { Component } from 'react';

class App extends Component {
  render() {
    const users = [{ name: 'Robin' }, { name: 'Markus' }];

    const showUsers = false;

    if (!showUsers) {
      return null;
    }

    return (
      <ul>
        {users.map(user => (
          <li>{user.name}</li>
        ))}
      </ul>
    );
  }
}

export default App;
```

```javascript
//...
return (
      <div>
        {
          showUsers ? (
            <ul>
              {users.map(user => <li>{user.name}</li>)}
            </ul>
          ) : (
            null
          )
        }
      </div>
// ...
```

另一种方法是，如果你只返回条件渲染的一边，则使用&&运算符：

```javascript
// ...
 return (
      <div>
        {
          showUsers && (
            <ul>
              {users.map(user => <li>{user.name}</li>)}
            </ul>
          )
        }
      </div>
// ...
```

### 隐性返回速记法

我们经常使用 return 关键字来返回一个函数的结果。仅有一个表达式的箭头函数会隐性返
回函数结果（函数必须省略大括号({})才能省略 return 关键字）。如果要返回多行表达式
（比如一个对象字面量），那么需要用 **()** 而不是 **{}** 来包裹函数体。这样可以确
保代码作为一个单独的表达式被计算返回。

### 强制要求传参，否则报错

可以在**utils.js**这类函数文件头部，写一个小函数，来检测函数调用是否正确传参。

```javascript
// utils.js
const required = (...para) => {
  let type;
  para.length === 0 ? (type = '!') : (type = ':' + para[0]);
  throw new Error(`Missing parameter${type}`);
};
```

使用方式如下。

```javascript
const add = (a = required(), b = required('number')) => a + b;
add(1, 2); //3
add(1); // Error: Missing parameter:number.
```

[[翻译]你点的 ES6 小技巧，请查收 · Issue ### 9 · WhiteYin/translation](https://github.com/WhiteYin/translation/issues/9)

### 在函数参数中解构嵌套对象

```javascript
var car = {
  model: 'bmw 2018',
  engine: {
    v6: true,
    turbo: true,
    vin: 12345,
  },
};
const modelAndVIN = ({ model, engine: { vin } }) => {
  console.log(`model: ${model} vin: ${vin}`);
};
modelAndVIN(car); // => model: bmw 2018  vin: 12345
```

### 数值交换(数组结构)

```javascript
let param1 = 1;
let param2 = 2;
//swap and assign param1 & param2 each others values
[param1, param2] = [param2, param1];
console.log(param1); // 2
console.log(param2); // 1
```

### 接收函数返回的多个结果

在下面的代码中，我们从/post 中获取一个帖子，然后在/comments 中获取相关评论。由于
我们使用的是 async/await，函数把返回值放在一个数组中。而我们使用数组解构后就可以
把返回值直接赋给相应的变量。

```javascript
async function getFullPost() {
  return await Promise.all([fetch('/post'), fetch('/comments')]);
}
const [post, comments] = getFullPost();
```

### Object [key] 验证函数

```javascript
// object validation rules
const schema = {
  first: {
    required: true,
  },
  last: {
    required: true,
  },
};

// universal validation function
const validate = (schema, values) => {
  for (x in schema) {
    if (schema[x].required) {
      if (!values[x]) {
        return false;
      }
    }
  }
  return true;
};

console.log(validate(schema, { first: 'Bruce' })); // false
console.log(validate(schema, { first: 'Bruce', last: 'Wayne' })); // true
```

### 使用 Set 实现数组去重

```javascript
let arr = [1, 1, 2, 2, 3, 3];
let deduped = [...new Set(arr)];

console.log(deduped); // [1, 2, 3]
```

### difference - 数组比较

返回两个数组之间的差异。根据数组 b 创建一个 Set 对象，然后在数组 a 上使用
Array.filter() 方法，过滤出数组 b 中不包含的值。

```javascript
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};
```

查看示例

```javascript
difference([1, 2, 3], [1, 2, 4]); // [3]
```

### differenceWith - 通过比较函数比较两个数组的差异

过滤出数组中比较函数不返回 true 的所有值。 类似于 difference ,除了接受一个
comparator （比较函数）。

使用 Array.filter() 和 Array.findIndex() 来查找合适的值。

```javascript
const differenceWith = (arr, val, comp) =>
  arr.filter(a => val.findIndex(b => comp(a, b)) === -1);
```

```javascript
differenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0],
  (a, b) => Math.round(a) === Math.round(b),
); // [1, 1.2]
```

---

1. [30 秒就能理解的 JavaScript 代码片段（30 seconds of code）](http://www.css88.com/30-seconds-of-code/)
2. [Eustia: A Tool for Generating JavaScript Utility Libraries:)](http://eustia.liriliri.io/)
3. [打造自己的 JavaScript 武器库 - 前端进阶者 - SegmentFault 思否](https://segmentfault.com/a/1190000011966867)
4. [You-Dont-Need-Lodash/Underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore)
   [damonare/Sorts: The algorithm of sort.Personal site //damonare.cn](https://github.com/damonare/Sorts)
