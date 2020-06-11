### bind

```javascript
var objA = {
  x: 23,
  offsetX: function(offset) {
    return this.x + offset;
  },
};

var objB = {
  x: 32,
};

var boundOffsetX = objA.offsetX.bind(objB, 10);
console.log('boundOffsetX: ', boundOffsetX()); //42
```

### isEmpty

```javascript
const isEmpty = obj =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

console.log('isEmpty(undefined): ', isEmpty(undefined)); // true
console.log('isEmpty(null): ', isEmpty(null)); // true
console.log("isEmpty('')", isEmpty('')); // true
console.log('isEmpty({}): ', isEmpty({})); //  true
console.log('isEmpty([]: ', isEmpty([])); //  true
console.log("isEmpty({a: '1'}: ", isEmpty({ a: '1' })); //  false
```

## negate - 否定断言

?> 否定断言函数。
接受一个断言函数，并用它的参数应用逻辑非运算符 (!) 。

```javascript
const negate = func => (...args) => !func(...args);

[1, 2, 3, 4, 5, 6].filter(negate(n => n % 2 == 0)); // [ 1, 3, 5 ]
```

## sleep - 休眠，延迟执行异步函数

?> 延迟异步函数的执行。延迟执行 async 函数的一部分，通过把它放到 sleep 状态，返回一个 Promise 。

```javascript
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function sleepyWork() {
  console.log("I'm going to sleep for 1 second.");
  await sleep(1000);
  console.log('I woke up after 1 second.');
}

sleepyWork();

// I'm going to sleep for 1 second.
// I woke up after 1 second.
```

## curry - 函数式编程术语：柯里化

?> 柯里化一个函数。使用递归。 如果提供的参数(args)数量足够，调用传递函数 fn 。否则返回一个柯里化后的函数 fn ，期望剩下的参数。如果你想柯里化一个接受可变参数数量的函数(可变参数数量的函数，例如 Math.min() )，你可以选择将参数个数传递给第二个参数 arity。

```javascript
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

curry(Math.pow)(2)(10); // 1024
curry(Math.min, 3)(10)(50)(2); // 2
```

### Tick Time

```javascript
const tick = Date.now();
const log = v => console.log(`${v} \n Elapsed: ${Date.now() - tick}ms`);

const loop = () => {
  let i = 0;
  while (i < 10000000000) {
    i++;
  }
  return '🐷 big loop';
};

console.log(loop());
```
