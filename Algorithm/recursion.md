reduce() 的核心就是在每次迭代中接收上次的累加值，然后经过一番处理返回一个计算结果，作为下次迭代的初始值。

### 语法

```javascript
arr.reduce(callback[, initialValue])

function callback(result, item, index, src) {
  // ...
}
// result :表示上次迭代返回的结果
// item: 表示当前的项
// index: 当前索引
// src :源数组
```

注意，如果不传 initialValue 参数，那么将使用数组中的第一个元素，并且 reduce 会从索引 1 的地方开始执行，跳过第一个索引。

## initialValue

```javascript
// 1.有initialValue，那么第一次运行的时候，`accumulator = initialValue`。
// 回调函数从数组的index 0,开始执行。

// 2.没有initialValue，那么第一次运行的时候`accumulator = array[0]`。
// accumulator为数组第一项，回调函数从数组的index 1,开始执行。

[1, 2, 3, 4, 5].reduce((accumulator, currentValue, currentIndex, array) => {
  return accumulator * currentValue;
}, 10);
// 1200

[
  [0, 1],
  [2, 3],
  [4, 5],
].reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
// [0,1,2,3,4,5]
```

### 累加 累乘

```javascript
function Accumulation(...vals) {
  return vals.reduce((t, v) => t + v, 0);
}

function Multiplication(...vals) {
  return vals.reduce((t, v) => t * v, 1);
}
Accumulation(1, 2, 3, 4, 5); // 15
Multiplication(1, 2, 3, 4, 5); // 120
```

### 权重求和

```javascript
const scores = [
  { score: 90, subject: 'chinese', weight: 0.5 },
  { score: 95, subject: 'math', weight: 0.3 },
  { score: 85, subject: 'english', weight: 0.2 },
];
const result = scores.reduce((t, v) => t + v.score * v.weight, 0); // 90.5
```

### Factorial (阶乘)

使用递归。如果 n 小于或等于 1 ，则返回 1 。否则返回 n 和 n - 1 的阶乘。

```javascript
const factorial = n => n < = 1 ? 1 : n * factorial(n - 1);
// factorial(6) -> 720
```

### 代替 reverse

```javascript
function Reverse(arr = []) {
  return arr.reduceRight((t, v) => (t.push(v), t), []);
}
Reverse([1, 2, 3, 4, 5]); // [5, 4, 3, 2, 1]
```

### 代替 map 和 filter

```javascript
const arr = [0, 1, 2, 3];

// 代替map：[0, 2, 4, 6]
const a = arr.map(v => v * 2);
const b = arr.reduce((t, v) => [...t, v * 2], []);

// 代替filter：[2, 3]
const c = arr.filter(v => v > 1);
const d = arr.reduce((t, v) => (v > 1 ? [...t, v] : t), []);

// 代替map和filter：[4, 6]
const e = arr.map(v => v * 2).filter(v => v > 2);
const f = arr.reduce((t, v) => (v * 2 > 2 ? [...t, v * 2] : t), []);
```

### 代替 some 和 every

```javascript
const scores = [
  { score: 45, subject: 'chinese' },
  { score: 90, subject: 'math' },
  { score: 60, subject: 'english' },
];

// 代替some：至少一门合格
const isAtLeastOneQualified = scores.reduce(
  (t, v) => t || v.score >= 60,
  false,
); // true

// 代替every：全部合格
const isAllQualified = scores.reduce((t, v) => t && v.score >= 60, true); // false
```

### 数组分割

```javascript
function Chunk(arr = [], size = 1) {
  return arr.length
    ? arr.reduce(
        (t, v) => (
          t[t.length - 1].length === size
            ? t.push([v])
            : t[t.length - 1].push(v),
          t
        ),
        [[]],
      )
    : [];
}

const arr = [1, 2, 3, 4, 5];
Chunk(arr, 2); // [[1, 2], [3, 4], [5]]
```

### 数组过滤

```javascript
function Difference(arr = [], oarr = []) {
  return arr.reduce((t, v) => (!oarr.includes(v) && t.push(v), t), []);
}
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 3, 6];
Difference(arr1, arr2); // [1, 4, 5]
```

### 数组扁平

```javascript
function Flat(arr = []) {
  return arr.reduce((t, v) => t.concat(Array.isArray(v) ? Flat(v) : v), []);
}

const arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
Flat(arr); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

### 数组去重

```javascript
function Uniq(arr = []) {
  return arr.reduce((t, v) => (t.includes(v) ? t : [...t, v]), []);
}
const arr = [2, 1, 0, 3, 2, 1, 2];
Uniq(arr); // [2, 1, 0, 3]
```

### 数组最大最小值

```javascript
function Max(arr = []) {
  return arr.reduce((t, v) => (t > v ? t : v));
}

function Min(arr = []) {
  return arr.reduce((t, v) => (t < v ? t : v));
}
const arr = [12, 45, 21, 65, 38, 76, 108, 43];
Max(arr); // 108
Min(arr); // 12
```

### 数组成员个数统计

```javascript
function Count(arr = []) {
  return arr.reduce((t, v) => ((t[v] = (t[v] || 0) + 1), t), {});
}

const arr = [0, 1, 1, 2, 2, 2];
Count(arr); // { 0: 1, 1: 2, 2: 3 }
```

### 数组成员位置记录

```javascript
function Position(arr = [], val) {
  return arr.reduce((t, v, i) => (v === val && t.push(i), t), []);
}
const arr = [2, 1, 5, 4, 2, 1, 6, 6, 7];
Position(arr, 2); // [0, 4]
```

### 数字千分化

```javascript
function ThousandNum(num = 0) {
  const str = (+num).toString().split('.');
  const int = nums =>
    nums
      .split('')
      .reverse()
      .reduceRight((t, v, i) => t + (i % 3 ? v : `${v},`), '')
      .replace(/^,|,$/g, '');
  const dec = nums =>
    nums
      .split('')
      .reduce((t, v, i) => t + ((i + 1) % 3 ? v : `${v},`), '')
      .replace(/^,|,$/g, '');
  return str.length > 1 ? `${int(str[0])}.${dec(str[1])}` : int(str[0]);
}

ThousandNum(1234); // "1,234"
ThousandNum(1234.0); // "1,234"
ThousandNum(0.1234); // "0.123,4"
ThousandNum(1234.5678); // "1,234.567,8"
```

### 使用 reduce 快速匹配

> 根据给出的 List 快速累加出对于的 title

```javascript
const Array = [
  { id: 1, title: '太原' },
  { id: 2, title: '昆明' },
  { id: 3, title: '天津' },
  { id: 4, title: '西安' },
  { id: 5, title: '北京' },
  { id: 6, title: '武汉' },
  { id: 7, title: '南昌' },
];

const goal = [1, 4, 7];

const result = Array.reduce(
  (init, v) => init + (goal.includes(v.id) ? `${v.title}/` : ''),
  '',
);

console.log(result.slice(0, -1)); // ==> 太原/西安/南昌
```

### reduce 复选框累加计算

> 有一个复选框,每点击的时候都要去判断是否全部选中,怎么计算

```javascript
const calc = index => {
  checkBoxList[index].checkedStatus = !checkBoxList[index].checkedStatus;
  const result = checkBoxList.reduce((init, v) => {
    return init + (v.checkedStatus == true ? 1 : 0);
  }, 0);
  return checkBoxList.length ? true : false;
};
```

### 实现 pipe 函数

执行从左到右的函数组合。

使用 Array.reduce（）与展开操作符(...)来执行从左到右的函数组合。第一个(最左边的)函数可以接受一个或多个参数；其余的函数必须是一元函数。

```javascript
const pipe = fns => fns.reduce((f, g) => (...args) => g(f(...args)));
```

```javascript
const pipe = fns => fns.reduce((f, g) => (...args) => g(f(...args)));

const inc = (num, a, b) => num + a + b;
const dbl = num => num * 2;
const sqr = num => num * num;

const result = pipe([inc, dbl, sqr])(2, 1, 3);

console.log(result); // > 144
```

### reduce 方法同时实现 map 和 filter

```javascript
const numbers = [10, 20, 30, 40];
const doubledOver50 = numbers.reduce((finalList, num) => {
  num = num * 2;
  if (num > 50) {
    finalList.push(num);
  }
  return finalList;
}, []);
console.log('doubledOver50: ', doubledOver50);
// doubledOver50:  [ 60, 80 ]
```

### 统计数组中相同项的个数

```javascript
var cars = ['BMW', 'Benz', 'Benz', 'Tesla', 'BMW', 'Toyota'];
var carsObj = cars.reduce(function (obj, name) {
  obj[name] = obj[name] ? ++obj[name] : 1;
  return obj;
}, {});
console.log('carsObj: ', carsObj);
// => { BMW: 2, Benz: 2, Tesla: 1, Toyota: 1 }
```
