在 JS 中污染全局是一个非常不好的实践，这么做可能和其他库起冲突。

想象以下例子：如果你想扩展 JS 中的 Array，为其添加一个 diff 函数显示两个数组间的
差异，此时应如何去做？你可以将 diff 写入 Array.prototype，但这么做会和其他有类似
需求的库造成冲突。如果另一个库对 diff 的需求为比较一个数组中首尾元素间的差异呢？
[使用 ES6 中的 class 对全局的 Array
做简单的扩展显然是一个更棒的选择](https://github.com/alivebao/clean-code-js#
%E4%B8%8D%E8%A6%81%E5%86%99%E5%85%A8%E5%B1%80%E5%87%BD%E6%95%B0)

```js
Array.prototype.diff = function (comparisonArray) {
  let values = [];
  let hash = {};
  for (let i of comparisonArray) {
    hash[i] = true;
  }
  for (let i of this) {
    if (!hash[i]) {
      values.push(i);
    }
  }
  return values;
};
console.log(['a', 'B'].diff(['a', 'b'])); // [ 'B' ]
```

## 扩展内建类

最佳实践方式是对内建进行扩展。例如，一个继承自原生 Array 的类 SuperArray

```js
class SuperArray extends Array {
  diff(comparisonArray) {
    let values = [];
    let hash = {};
    for (let i of comparisonArray) {
      hash[i] = true;
    }
    for (let i of this) {
      if (!hash[i]) {
        values.push(i);
      }
    }
    return values;
  }
}
const SArray = new SuperArray('a', 'b');

console.log(SArray); // SuperArray(2) [ 'a', 'b' ]
console.log(SArray.diff(['a', 'd'])); // [ 'b' ]

const SArray2 = SArray.map(v => v + '_1');
console.log(SArray2); // SuperArray(2) [ 'a_1', 'b_1' ]

console.log(SArray.constructor === SuperArray); // true
console.log(SArray2.constructor === SuperArray); // true
```

请注意。内建的方法例如 filter，map 等 — 返回的正是子类 SuperArray 的新对象。它们
内部使用了对象的 constructor 属性来实现这一功能。

在上面的例子中`SArray.constructor === SuperArray`当 SArray.map() 被调用时，它的
内部使用的是 SArray.constructor 来创建新的结果数组，而不是使用原生的 Array。这意
味着，可以在结果数组上继续使用 SuperArray 的方法

如果希望像 map 或 filter 这样的内建方法返回常规数组，我们可以在 `Symbol.species`
中返回 Array：

```javascript
class SuperArray extends Array {
  // 内建方法将使用这个作为 constructor
  static get [Symbol.species]() {
    return Array;
  }
  diff(comparisonArray) {
    let values = [];
    let hash = {};
    for (let i of comparisonArray) {
      hash[i] = true;
    }
    for (let i of this) {
      if (!hash[i]) {
        values.push(i);
      }
    }
    return values;
  }
}
const SArray = new SuperArray('a', 'b');
const SArray2 = SArray.map(v => v + '_1');
console.log(SArray.constructor === SuperArray); // true
console.log(SArray2.constructor === SuperArray); // false  注意这个
console.log(SArray2.constructor === Array); // true
```

---

<!-- https://zh.javascript.info/extend-natives -->

```javascript
const getType = v =>
  v === undefined
    ? 'undefined'
    : v === null
    ? 'null'
    : v.constructor.name.toLowerCase();

const a = getType(new Set([1, 2, 3])); // ==> set
const b = getType([1, 2, 3]); // ==> array
const c = getType({}); // ==> object

class EnhanceArray {
  constructor(arr) {
    this.array = arr;
  }
  /* 获取最大值 */
  getArrMax() {
    return Math.max(...this.array);
  }
  /* 获取最小值 */
  getArrMin() {
    return Math.min(...this.array);
  }
  /* 随机获取数组元素 */
  getRandomItem() {
    return this.array[Math.floor(Math.random() * this.array.length)];
  }
  /* 分块 */
  chunk(size) {
    const res = Array.from(
      { length: Math.ceil(this.array.length / size) },
      (v, i) => this.array.slice(i * size, i * size + size),
    );
    return res;
  }
  diff(comparisonArray) {
    const FN_difference = (a, b) => {
      const s = new Set(b);
      return a.filter(x => !s.has(x));
    };

    return FN_difference(this.array, comparisonArray);
  }
  /* 交集 */
  intersection(otherArray) {
    const FN_intersection = (a, b) => {
      const s = new Set(b);
      return a.filter(x => s.has(x));
    };

    return FN_intersection(this.array, otherArray);
  }
  value() {
    return this.array;
  }
  /* deepFlatten */
  deepFlatten() {
    const FN_deepFlatten = arr =>
      [].concat(...arr.map(v => (Array.isArray(v) ? FN_deepFlatten(v) : v)));
    return FN_deepFlatten(this.array);
  }
  /* 获取数组的第一个元素 */
  head() {
    return this.array[0];
  }
  /* sum */
  sum() {
    const FN_sum = arr => arr.reduce((acc, val) => acc + val, 0);
    return FN_sum(this.array);
  }
  /* Take :从一个给定的数组中创建一个前N个元素的数组 */
  take(number) {
    const FN_take = (arr, n = 1) => arr.slice(0, n);
    return FN_take(this.array, number);
  }
  /* concat() */
  concat(args) {
    const FN_ArrayConcat = (arr, ...args) => [].concat(arr, ...args);
    return FN_ArrayConcat(this.array, args);
  }
  /* without 从数组中排除给定值 */
  without(args) {
    const FN_without = (arr, ...args) => arr.filter(v => !args.includes(v));
    return FN_without(this.array, args);
  }
  /* average */
  average(number) {
    const FN_average = arr =>
      arr.reduce((acc, val) => acc + val, 0) / arr.length;
    return number
      ? FN_average(this.array).toFixed(number)
      : FN_average(this.array);
  }
  /* countItem:计数数组中某个值的出现次数 */
  countItem(item) {
    const FN_countOccurrences = (arr, value) =>
      arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0);
    return FN_countOccurrences(this.array, item);
  }
  /* 将数组的第n个元素放到开头 */
  pushFirst(number) {
    const FN_pushFirst = (arr, n) => {
      arr.unshift(arr.splice(n, 1)[0]);
      return arr;
    };
    return FN_pushFirst(this.array, number);
  }
  /* 根据属性来排序 */
  sortBy(key) {
    const FN_sortBy = (arr, key) =>
      arr.sort((a, b) => {
        return a[key] > b[key] ? 1 : -1;
      });
    return FN_sortBy(this.array, key);
  }
}

// Instance1
const Instance1 = new EnhanceArray([9, 22, 1, 2, 3, 4, 5, 1, 2, 1]);
console.log('Instance: ', Instance1);
console.log('getArrMax: ', Instance1.getArrMax()); // 22
console.log('getArrMin: ', Instance1.getArrMin()); // 1
console.log('value: ', Instance1.value()); // [ 9, 22, 1, 2, 3, 4, 5, 1, 2, 1 ]
console.log('chunk: ', Instance1.chunk(2)); // [ [ 9, 22 ], [ 1, 2 ], [ 3, 4 ], [ 5, 1 ], [ 2, 1 ] ]
console.log('diff: ', Instance1.diff([4, 5, 6, 7, 8, 9])); // [ 22, 1, 2, 3, 1, 2, 1 ]
console.log('getRandomItem: ', Instance1.getRandomItem());
console.log('head: ', Instance1.head()); // 9
console.log('sum: ', Instance1.sum()); //50
console.log('take: ', Instance1.take(4)); //  [ 9, 22, 1, 2 ]
console.log('concat: ', Instance1.concat([1, 2, 3, [4]])); // [ 9, 22, 1, 2, 3, 4, 5, 1, 2, 1, 1, 2, 3, [ 4 ] ]
console.log('intersection: ', Instance1.intersection([1, 2, 3, 'x', 'y'])); // [ 1, 2, 3, 1, 2, 1 ]
console.log('without: ', Instance1.without(1, 9)); // [ 9, 22, 2, 3, 4, 5, 2 ]
console.log('average: ', Instance1.average()); // 5
console.log('average: ', Instance1.average(3)); // 5.000
console.log('countItem: ', Instance1.countItem(1)); //3
console.log('pushFirst: ', Instance1.pushFirst(1)); //[ 22, 9, 1, 2, 3, 4, 5, 1, 2, 1 ]

// Instance2
const Instance2 = new EnhanceArray([1, [2], [[3], 4], 5]);
console.log('deepFlatten(): ', Instance2.deepFlatten()); // [ 1, 2, 3, 4, 5 ]

// Instance3
const Instance3 = new EnhanceArray([
  { age: 20 },
  { age: 10 },
  { age: 29 },
  { age: 8 },
]);
console.log('sortBy: ', Instance3.sortBy('age'));
//  [ { age: 8 }, { age: 10 }, { age: 20 }, { age: 29 } ]
```
