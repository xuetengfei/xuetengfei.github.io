<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200427101932%20pipeline.png' alt='20200427101932pipeline'/>

<!--
```
ps -ef | grep nginx
``` -->

## pipe

```javascript
const add = a => a + 1;
const times = a => a * 2;
const sum = (a, b, c) => a + b + c;
```

```javascript
// 比较好理解的版本
const pipe = fns => (...args) => {
  const [first, ...rest] = fns;
  const init = first(...args);
  return rest.reduce((acc, each) => {
    return each(acc);
  }, init);
};

// 简化版
const pipe2 = fns => fns.reduce((f, g) => (...args) => g(f(...args)));

const xue = pipe([sum, add, times])(2, 1, 3);
console.log(xue); // 14
```

执行从左到右的函数组合。

使用 Array.reduce（）与展开操作符(...)来执行从左到右的函数组合。第一个(最左边的)函数可以接受一个或多个参数；其余的函数必须是一元函数。

<!-- `pipe`函数可以接受一个`函数数组`作为参数,然后返回的函数可以接受`多个参数输入`.我们可以这样写 `pipe([])()`.第一个`()`里面的`[]`是我们的处理函数,最有一个`()`是`[]`中第一个函数接收的参数,可以是多个.

分析一下上面的代码计算过程,就是,`[]`中第一个函数`inc`,获取若干个参数`(2,1,3)`进行第一次计算,返回唯一一个计算结果`6`.后面的函数`dbl`以这个结果`6`为输入值再次计算,然后接着返回一个计算结果`12`,接着函数`sqr`接收`12`输出`144`. -->

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

javascript 目前的话，有一个处在 stage 1 阶段的提案语法`|>`,就是管道操作符的语法糖。

如果被确定下来，那么上面的写法可以更简洁。

```javascript
(2, 1, 3) |> inc |> dbl |> sqr;
```
