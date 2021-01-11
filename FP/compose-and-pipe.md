!> 函数式编程有两个最基本的运算：函数组合和柯里化。

函数组合函数:将多个函数`组合`到一起，产下一个崭新的函数。

### 函数组合一:compose

```js
const inc = a => a + 1;
const times = a => a * 2;

{
  // 简单的写法
  const compose = (a, b) => c => a(b(c));
  const result = compose(inc, times);
  console.log(result(5)); // 11
}

// 抽象出来
const compose = (...fns) => x => fns.reduceRight((x, fn) => fn(x), x);

{
  const result = compose(inc, times); // right -> left
  console.log(result(5)); // 11
}

{
  // 注意参数的顺序以及它们是如何被计算的,从右到左
  const result = compose(times, inc);
  console.log(result(5)); //  12
}
```

### 函数组合二:pipe

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200427101932%20pipeline.png' alt='20200427101932pipeline'/>

```md
ps -ef | grep nginx
```

```js
const inc = a => a + 1;
const add = a => a + 1;
const times = a => a * 2;
const sum = (a, b, c) => a + b + c;

{
  // 好理解的版本
  const pipe = fns => (...args) => {
    const [first, ...rest] = fns;
    const init = first(...args);
    return rest.reduce((acc, each) => {
      return each(acc);
    }, init);
  };
  const result = pipe([sum, add, times])(2, 1, 3);
  console.log(result); // 14
}

{
  // 抽象出来
  const pipe = fns => fns.reduce((f, g) => (...args) => g(f(...args)));
  const result = pipe([sum, add, times])(2, 1, 3);
  console.log(result); // 14
}

{
  const pipe = fns => fns.reduce((f, g) => (...args) => g(f(...args)));
  const result = pipe([sum, add, times]);
  console.log(result(1, 2, 3)); // 14
}
```

执行从左到右的函数组合。

使用 Array.reduce（）与展开操作符(...)来执行从左到右的函数组合。第一个(最左边的)
函数可以接受一个或多个参数；其余的函数必须是一元函数。

```javascript
// ...
const queryString = pipe([
  obj => _.omitBy(obj, _.isEmpty),
  obj =>
    Object.entries(obj)
      .reduce((init, a) => `${init}${a[0]}=${a[1]}&`, '?')
      .slice(0, -1),
])(params);

// const excelUrl = `${window.location.origin}${queryString}`;
// ...
```

---

javascript 目前的话，有一个处在 stage 1 阶段的提案语法`|>`,就是管道操作符的语法
糖。如果被采纳，那么上面的写法可以更简洁。

```javascript
(2, 1, 3) |> inc |> dbl |> sqr;
```

<!-- ## 结合实际

使用上文的 pipe 函数，执行一个函数数组，按照从左到右顺序执行。添加更复杂一点的逻
辑。一个使用纯函数和函数组合的好处是更加容易追踪错误。无论在什么时候出现一个错误
，你都能够通过每个函数追溯到问题的缘由。在面向对象编程中，这通常会相当的复杂，因
为你一般情况下并不知道引发改问题的对象的其他状态。 -->
