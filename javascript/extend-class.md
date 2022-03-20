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
