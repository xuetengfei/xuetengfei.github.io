```javascript
const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();

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
    const res = Array.from({ length: Math.ceil(this.array.length / size) }, (v, i) =>
      this.array.slice(i * size, i * size + size),
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
    const FN_average = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;
    return number ? FN_average(this.array).toFixed(number) : FN_average(this.array);
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
const Instance3 = new EnhanceArray([{ age: 20 }, { age: 10 }, { age: 29 }, { age: 8 }]);
console.log('sortBy: ', Instance3.sortBy('age'));
//  [ { age: 8 }, { age: 10 }, { age: 20 }, { age: 29 } ]
```
