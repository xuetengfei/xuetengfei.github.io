目的是，同时执行多个函数。

callAll: 它接收任意数量的函数和任意数量的参数，如果作为参数的函数存在就用所有的参数调用那个函数。

```javascript
// 剩余参数是一个真正的数组，可以使用任何数组方法
const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));
```

```javascript
const add = (a, b) => {
  console.log(a + b);
};
const minus = (a, b) => {
  console.log(a - b);
};
callAll(add, minus)(2, 1);
// 3
// 1
```

```javascript
const firstName = ({ firstName }) => {
  console.log(`firstName is:${firstName}`);
};

const fullName = ({ firstName, lastName }) => {
  console.log(`fullName is: ${firstName}-${lastName}`);
};

callAll(firstName, fullName)({ firstName: 'MOikz', age: 12, lastName: 'lucj' });

// firstName is:MOikz
// fullName is: MOikz-lucj
```
