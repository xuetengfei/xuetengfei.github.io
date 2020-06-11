## 目前最佳方案

到目前为止，向 JavaScript 的类中引入 private fields 的提案尚未通过。它使用 ＃ 符号表示它是私有的。它的使用方式与命名约定技术非常类似，但对变量访问提供了实际的限制。

我们目前怎么做呢？使用闭包。

```javascript
function Shape() {
  // 私有变量集
  const this$ = {};
  class Shape {
    constructor(width, height) {
      this$.width = width;
      this$.height = height;
    }
    get area() {
      return this$.width * this$.height;
    }
  }

  const instance = new Shape(...arguments);
  // '...arguments'是写死的，不可更改变量名
  Object.setPrototypeOf(Object.getPrototypeOf(instance), this);
  return instance;
}

// 实例化对象
const square = new Shape(10, 10);
console.log(square.area); // 100

// 无法访问私有变量
console.log(square.width); // undefined

// 完整的原型链
console.log(square instanceof Shape); // true
```

解释一下最后的这几行代码的作用就是，为了消除这种写法的不良影响，表现如下。

```javascript
square instanceof Shape; // false
```

原理是修改原型链:`Object -> 外部的 Shape -> 内部的 Shape 原型 -> 内部的 Shape`

```javascript
Object.setPrototypeOf(Object.getPrototypeOf(instance), this);
```

1. [gold-miner/private-variables-in-javascript](https://github.com/xitu/gold-miner/blob/master/TODO/private-variables-in-javascript.md)
