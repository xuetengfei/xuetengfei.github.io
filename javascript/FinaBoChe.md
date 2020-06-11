?> 递归-循环-迭代的区别

> 程序调用自身的编程技巧称为递归（ recursion）

```javascript
// 递归算法，计算费纳波切数组
let fibonacci = (len = 5, arr = [0, 1]) => {
  var a = arr[arr.length - 1];
  var b = arr.length < 2 ? 0 : arr[arr.length - 2];
  arr.push(a + b);
  return arr.length == len ? arr : fibonacci(len, arr);
};

console.log(fibonacci(6)); // [ 0, 1, 1, 2, 3, 5 ]
```

```javascript
// 循环算法，计算费纳波切数组
function getFib(x) {
  function fib(x) {
    let fibArr = [0, 1];
    for (let i = 2; i <= x; i++) {
      const len = fibArr.length;
      const last = fibArr[len - 1] + fibArr[len - 2];
      fibArr.push(last);
    }

    return fibArr;
  }
  const arr = fib(x);
  // return arr[arr.length - 1];
  return arr;
}

console.log(getFib(10)); // [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ]
```

> 迭代是重复反馈过程的活动，其目的通常是为了逼近所需目标或结果。迭代算法是用计算机解决问题的一种基本方法。它利用计算机运算速度快、适合做重复性操作的特点，让计算机对一组指令（或一定步骤）进行重复执行，在每次执行这组指令（或这些步骤）时，都从变量的原值推出它的一个新值。

```javascript
// 迭代算法，计算费纳波切数组
function _getFib(x) {
  switch (x) {
    case 0:
      return 0;
    case 1:
      return 1;
    default:
      return _getFib(x - 2) + _getFib(x - 1);
  }
}

console.log(_getFib(10)); // 55
```
