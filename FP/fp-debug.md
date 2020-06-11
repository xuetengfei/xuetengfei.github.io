?> 1. 使用 curry 实现 trace 函数进行 debug

```javascript
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

var trace = curry(function (tag, x) {
  console.log(tag, x);
  return x;
});

const compose = function (f, g) {
  return function (x) {
    return f(g(x));
  };
};

var toUpperCase = function (x) {
  return x.toUpperCase();
};
var exclaim = function (x) {
  return x + '!';
};
var shout = compose(trace('测试', exclaim), toUpperCase);

console.log(shout('send in the clowns'));
// 测试 [Function: exclaim]
// SEND IN THE CLOWNS!
```

?> 2. 适用于函数式编程、chain 编程的调试

```javascript
// simple

function tap(x) {
  console.log(x);
  return x;
}
```

```javascript
// complex

function tap(x, fn = x => x) {
  console.log(fn(x));
  return x;
}
```

?> 3. colorful console

```javascript
const tips = msg =>
  console.log(
    '%c%s%s%s',
    'color: #fff; font-weight: bold;background-color:#21c366;',
    ' ',
    msg,
    ' ',
  );
const listen = msg =>
  console.log(
    '%c%s%s%s',
    'color: #fff; font-weight: bold;background-color:rgb(255,69,0);',
    ' ',
    msg,
    ' ',
  );

export { tips, listen };
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/colorful-console-1555861408.jpg' />
