?> new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

## new 关键字会进行如下的操作：

1. 创建一个空的简单 JavaScript 对象
2. 设置该对象的构造函数
3. 将步骤 1 新创建的对象作为 this 的上下文
4. 如果该函数没有返回对象，则返回 this

## 自定义一个 new 函数

```js
function Person(name) {
  this.name = name;
}

function newFn(FN, ...args) {
  // 1.链接到原型
  // or obj.__proto__ = FN.prototype;
  const obj = Object.create(FN.prototype);

  // 2.绑定 this，执行构造函数。构造函数执行 return 一个对象
  const ret = FN.apply(obj, args);
  return typeof ret === 'object' ? ret : obj;
}

const person = newFn(Person, 'xtf');

console.log('person: ', person);
// person:  Person { name: 'xtf' }
```

---

1. [The new operator implemented in JavaScript](https://2ality.com/2014/01/new-operator.html)
1. [new 运算符 -- MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)
