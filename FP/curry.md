?> 柯里化 是一种转换，将 f(a,b,c) 转换为可以被以 f(a)(b)(c) 的形式进行调用
。JavaScript 实现通常都保持该函数可以被正常调用，并且如果参数数量不足，则返回偏
函数。

## 小试牛刀

```javascript
function sum(x, y, z) {
  return x + y + z;
}

function currySum(x) {
  return y => {
    return z => {
      return x + y + z;
    };
  };
}

{
  // ES6
  const currySum = x => y => x + y + z;
}
```

## 通用的 curry

柯里化一个函数。使用递归。 如果提供的参数(args)数量足够，调用传递函数 fn 。否则
返回一个柯里化后的函数 fn ，期望剩下的参数。如果你想柯里化一个接受可变参数数量的
函数(可变参数数量的函数，例如 Math.min() )，你可以选择将参数个数传递给第二个参数
arity。

```javascript
const curry = (fn, need = fn.length, ...args) =>
  need <= args.length ? fn(...args) : curry.bind(null, fn, need, ...args);

const sum = (x, y, z) => x + y + z;

// sum函数在定义时候，已经定义参数长度为3，即:sum.length ===3
console.log(curry(sum)(1)(2)(3)); // 6

// 可以指定参数长度，Math.min 默认参数是2个
console.log(curry(Math.min, 4)(10)(50)(2)(4)); // 2
```

## 实现分析

```javascript
/*
const curry = (fn, need = fn.length, ...args) =>
  need <= args.length ? fn(...args) : curry.bind(null, fn, need, ...args);
*/

function curry(func, needArgsLength = func.length) {
  return function curried(...args) {
    // args.length 既当前参数个数
    // func.length 既原函数参数的个数
    // 条件分支
    // 根据当前参数个数与原函数参数的个数来决定
    // 返回执行结果
    // 或者返回一个偏函数;
    if (args.length >= needArgsLength) {
      // apply 接受 args这个数组作为参数 并立即执行
      return func.apply(this, args);
    } else {
      return function pass(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

const result1 = curry(Math.min, 4)(10)(50)(2)(4);
console.log('result1', result1); // 2

const passfnc = curry(Math.min, 4)(10)(50);
const result2 = passfnc(2, 4);
console.log('result2', result2); // 2

const sum = (x, y, z) => x + y + z;

console.log(curry(sum)(1)(2)(3)); // 6
console.log(curry(sum)(1, 2)(3)); // 6
console.log(curry(sum)(1)(2, 3)); // 6

console.log(curry(sum)(1)(2, 3)(1));
// 因为参数太多导致报错，Error
// 可以在curry兜底，感觉没有必要，报错提示更好
```
