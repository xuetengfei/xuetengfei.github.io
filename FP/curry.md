在一个函数中首先填充几个参数(然后再返回一个新函数) 的技术称为柯里化(Currying)。
它将多变量函数拆解为单变量的多个函数的依次调用。  
函数柯里化是逐步传参、逐步缩小函数的适用范围、逐步求解的过程，

## 柯里化的好处

1. 参数复用 – 复用最初函数的第一个参数
2. 提前返回 – 返回接受余下的参数且返回结果的新函数
3. 延迟执行 – 返回新函数，等待执行

## 通用的 curry

<!-- 柯里化一个函数。使用递归。 如果提供的参数(args)数量足够，调用传递函数 fn 。否则
返回一个柯里化后的函数 fn ，期望剩下的参数。如果你想柯里化一个接受可变参数数量的
函数(可变参数数量的函数，例如 Math.min() )，你可以选择将参数个数传递给第二个参数
arity。 -->

## 实现一

```js
const curry = (fn, need = fn.length, ...args) =>
  need <= args.length ? fn(...args) : curry.bind(null, fn, need, ...args);
```

## 实现二

```javascript
function curry(fn) {
  let judge = (...args) => {
    if (args.length == fn.length) return fn(...args);
    return (...arg) => judge(...args, ...arg);
  };
  return judge;
}

console.log(curry(sum)(1)(2)(3)); // 6
console.log(curry(sum)(1, 2)(3)); // 6
console.log(curry(sum)(1)(2, 3)); // 6
```

## 实现三

```js
function curry(fn, need = fn.length) {
  if (typeof fn !== 'function') {
    return new Error('No function provided');
  }
  return function curriedFn(...args) {
    if (args.length >= need) {
      return fn.apply(null, args);
    } else {
      return function () {
        return curriedFn.apply(null, args.concat(...arguments));
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

// sum函数在定义时候，已经定义参数长度为3，即:sum.length ===3
console.log(curry(sum)(1)(2)(3)); // 6
console.log(curry(sum)(1, 2)(3)); // 6
console.log(curry(sum)(1)(2, 3)); // 6

// 可以指定参数长度，Math.min 默认参数是2个
console.log(curry(Math.min, 4)(10)(50)(2)(4)); // 2

console.log(curry(sum)(1)(2, 3)(1));
// 因为参数太多导致报错，Error
// 可以在curry兜底，感觉没有必要，报错提示更好
```
