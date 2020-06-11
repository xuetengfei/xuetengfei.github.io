# 不要写全局函数

在 JS 中污染全局是一个非常不好的实践，这么做可能和其他库起冲突，且调用你的 API 的用户在实际环境中得到一个 exception 前对这一情况是一无所知的。

想象以下例子：如果你想扩展 JS 中的 Array，为其添加一个 diff 函数显示两个数组间的差异，此时应如何去做？你可以将 diff 写入 Array.prototype，但这么做会和其他有类似需求的库造成冲突。如果另一个库对 diff 的需求为比较一个数组中首尾元素间的差异呢？
[使用 ES6 中的 class 对全局的 Array 做简单的扩展显然是一个更棒的选择](https://github.com/alivebao/clean-code-js# %E4%B8%8D%E8%A6%81%E5%86%99%E5%85%A8%E5%B1%80%E5%87%BD%E6%95%B0)

```javascript
Array.prototype.diff = function(comparisonArray) {
  var values = [];
  var hash = {};
  for (var i of comparisonArray) {
    hash[i] = true;
  }
  for (var i of this) {
    if (!hash[i]) {
      values.push(i);
    }
  }
  return values;
};
console.log(['a', 'b'].diff(['a', 'd'])); // [ 'b' ]
```

```javascript
class SuperArray extends Array {
  constructor(...args) {
    super(...args);
  }
  diff(comparisonArray) {
    var values = [];
    var hash = {};
    for (var i of comparisonArray) {
      hash[i] = true;
    }
    for (var i of this) {
      if (!hash[i]) {
        values.push(i);
      }
    }
    return values;
  }
}
const SArray = new SuperArray('a', 'b');
console.log(SArray); // SuperArray [ 'a', 'b' ]
console.log(SArray.diff(['a', 'd'])); // [ 'b' ]
```
