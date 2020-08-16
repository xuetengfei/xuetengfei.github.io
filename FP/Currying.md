!> 借助闭包，将一个包含 n（> 1） 个参数的函数转换为 n 个嵌套的只包含一个参数的函数。

```javascript
function sum(x, y, z) {
  return x + y + x;
}

function curry_sum = (x) {
  return y => {
    return z => {
      return x + y + z
    }
  }
}

// ES6
const curry_sum_2 =x=>y=>x+y+z
```

## 实现 curry

柯里化一个函数。使用递归。 如果提供的参数(args)数量足够，调用传递函数 fn 。否则返回一个柯里化后的函数 fn ，期望剩下的参数。如果你想柯里化一个接受可变参数数量的函数(可变参数数量的函数，例如 Math.min() )，你可以选择将参数个数传递给第二个参数 arity。

```javascript
const curry = (fn, need = fn.length, ...args) =>
  need <= args.length ? fn(...args) : curry.bind(null, fn, need, ...args);
```

```javascript
const l = console.log;

const sum = (x, y, z) => x + y + z;

l(curry(Math.min, 4)(10)(50)(2)(4)); // 2
l(curry(sum)(1)(2)(3)); // 6
```
