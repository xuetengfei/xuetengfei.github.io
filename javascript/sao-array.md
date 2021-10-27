### range

```js
Object.assign(Number.prototype, {
  *[Symbol.iterator](a) {
    for (let i = this; i--; ) yield this - i;
  },
});
console.log('[...20]', [...20]);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

```javascript
Array.from(Array(10).keys());
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
Array.from({ length: 4 }, (_, i) => i); // =>: [0, 1, 2, 3]
[...Array(4).keys()].map(k => k + 1); // =>: [1, 2, 3, 4]

Array(6).fill(8); //  [8, 8, 8, 8, 8, 8]

const range = (start = 0, stop, step) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

console.log('range(0, 5, 1): ', range(0, 5, 1));
// range(0, 5, 1):  [ 0, 1, 2, 3, 4 ]

const alphabet = range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1, 1).map(x =>
  String.fromCharCode(x),
);
console.log('alphabet : ', alphabet);
// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
```

### 2.过滤空值

空值指的是没有具体意义的一些值，比如 0，undefined，null，false，空字符串等

```javascript
let res = [1, 2, 0, undefined, null, false, ''].filter(Boolean);

// Result: 1,2
```

```javascript
const _ = require('lodash');

const object = { a: 1, b: '2', c: 3, d: 0, e: null, f: undefined };

const r = _.omitBy(object, v => [null, undefined].includes(v));
console.log(' r: ', r);
//  r:  { a: 1, b: '2', c: 3, d: 0 }
```

### Unique

```javascript
var arr = [1, 2, 1, 4, 1, 3];

// es6
const r1 = [...new Set(arr)];
//  or
const r3 = arr.reduce(
  (init, v) => (init.includes(v) ? init : [...init, v]),
  [],
);

// es5
const r2 = arr.filter((v, i) => arr.indexOf(v) === i);

console.log(r1, r2, r3);
```

### 解构

```javascript
const pair = a => b => [a, b];
const [a, b] = pair('first')('second');

console.log(a); // first
console.log(b); // second
```

```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];

// first是1，rest是[2, 3, 4, 5]
```

### Chunk

使用 Array.from() 创建一个新的数组，它的长度与将要生成的 chunk(块) 数量相匹配。
使用 Array.slice() 将新数组的每个元素映射到长度为 size 的 chunk 中。 如果原始数
组不能均匀分割，最后的 chunk 将包含剩余的元素。

```javascript
const chunk = (arr, size) => {
  const _chunk = Array.from({ length: Math.ceil(arr.length / size) });
  return _chunk.map((_each, i) => {
    return arr.slice(i * size, i * size + size);
  });
};
const end = chunk([1, 2, 3, 4, 5], 2);

console.log('end: ', end);
// end:  [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]
```

### difference

```javascript
let arrays = [
  [1, 2, 3, 4, 5],
  [5, 2, 10],
];

const Result = arrays.reduce((a, b) => a.filter(c => !b.includes(c)));
console.log('Result: ', Result); // Result:  [ 1, 3, 4 ]
```

### fill

```javascript
var array = [1, 2, 3];
array.fill('a'); // ['a', 'a', 'a']

Array(3).fill(2); // [2, 2, 2]
[4, 6, 8, 10].fill('*', 1, 3); // [4, '*', '*', 10]
```

### first

```javascript
[1, 2, 3, 4, 5][0]; // => 1

[].concat(1, 2, 3, 4, 5).shift(); // => 1

[].concat([1, 2, 3, 4, 5]).shift(); // => 1

[].concat(undefined).shift(); // => undefined

[1, 2, 3, 4, 5].slice(0, 2); // => [1, 2]
```

### head and tail

```javascript
const array = [1, 2, 3];

const [head, ...tail] = array;
console.log(head); // 1
console.log(tail); // [2, 3]
```

### 8.flatten

```javascript
const flatten = [1, [2, [3, [4]], 5]].reduce((a, b) => a.concat(b), []);
// => [1, 2, [3, [4]], 5]
```

### 9.flattenDeep

```javascript
const flattenDeep = arr =>
  Array.isArray(arr)
    ? arr.reduce((a, b) => a.concat(flattenDeep(b)), [])
    : [arr];

flattenDeep([1, [[2], [3, [4]], 5]]);
// => [1, 2, 3, 4, 5]

// ES2019
[1, [2, [3, [4]], 5]].flat(Infinity); // => [1, 2, 3, 4, 5]
```

### 10.fromPairs

```javascript
const fromPairs = arr =>
  arr.reduce((acc, val) => ((acc[val[0]] = val[1]), acc), {});

const Result = fromPairs([
  ['a', 1],
  ['b', 2],
]);
console.log('Result: ', Result);
// Result:  { a: 1, b: 2 }
```

### 11.without

```javascript
var array = [1, 2, 3];
const Result = array.filter(value => value !== 2);
console.log('Result: ', Result); // [1, 3]
```

### 12.Array

```javascript
/* 
  https://dmitripavlutin.com/javascript-array-from-applications/
  Array.from(arrayLikeOrIterable[, mapFunction[, thisArg]]);
*/
const someNumbers = { 0: 10, 1: 15, length: 2 };
Array.from(someNumbers, value => value * 2); // => [20, 30]

// 2. Transform array-like into an array
function sumArguments() {
  return Array.from(arguments).reduce((sum, num) => sum + num);
}
sumArguments(1, 2, 3); // => 6

// 3 shallow copy
// Array.from(numbers) creates a shallow copy of numbers array.
const numbers = [3, 6, 9];
const numbersCopy = Array.from(numbers);

numbers === numbersCopy; // => false

// 4 deep clone of
/* 
 Is it possible to use Array.from() to create a clone of the array, 
 including all the nested ones ? Challenge accepted!
*/
function recursiveClone(val) {
  return Array.isArray(val) ? Array.from(val, recursiveClone) : val;
}

const numbers = [
  [0, 1, 2],
  ['one', 'two', 'three'],
];
const numbersClone = recursiveClone(numbers);

numbersClone; // => [[0, 1, 2], ['one', 'two', 'three']]
numbers[0] === numbersClone[0]; // => false

// 5 Fill an array with values
const length = 3;
const init = 0;
const result = Array.from({ length }, () => init);
const result2 = Array(length).fill(init);
console.log('result: ', result);
console.log('result2: ', result2);

function range(end) {
  // array - like { length: end }
  return Array.from({ length: end }, (_, index) => index);
}

range(4); // => [0, 1, 2, 3]

function unique(array) {
  return Array.from(new Set(array));
}

unique([1, 1, 2, 3, 3]); // => [1, 2, 3]`
```
