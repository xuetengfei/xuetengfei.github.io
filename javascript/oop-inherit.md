怎样实现 JS 中的继承? 其实实现继承的方式有多种。 原型链继承，构造函数继承，组合继承等等。

### ES5 实现

第一种情况: 继承全部属性和方法

```js
children.prototype = new Father();
```

```js
// 定义基类
function Animal(kind) {
  // 私有属性
  this.name = 'Animal';
  this.type = kind;
}

// 静态属性
Animal.fn = 'fn';

// 公有方法或属性
Animal.prototype.eat = function () {
  console.log('吃');
};

// 定义子类
function Duck() {
  // 私有属性
  this.type = 'Duck';
}

Duck.prototype = new Animal(); // 继承

const duck = new Duck();

duck.eat(); // 吃
console.log(duck.name); // Animal
```

第二种情况: 只继承公有方法 有时候显然不想让子类继承父类的私有属性，

```js
children.prototype.__proto__ = Father.prototype;
// or
children.prototype.__proto__ = Object.create(Father.prototype);
```

```js
Duck.prototype.swim = function () {
  console.log('游泳');
};
// 只继承Animal的公有方法或者属性
Duck.prototype.__proto__ = Animal.prototype;

let duck = new Duck();
duck.eat(); // 吃,
duck.swim(); // 游泳
console.log(duck.name); // undefined,
//  先会在Duck类上找name私有属性，而且Animal.prototype没有包含Animal类的私有属性
```

### ES6 实现

```js
class Cat {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

// -- 01-class Lion --
class Lion extends Cat {
  speak() {
    console.log(this.name + ' roars.');
  }
}

let litterLion = new Lion('Tom');
litterLion.speak(); // Tom roars.

// -- 02-class Tiger --
class Tiger extends Cat {
  speak() {
    super.speak();
    console.log(this.name + ' roars.');
  }
}

let litterTiger = new Tiger('Tom');
litterTiger.speak();
// Tom makes a noise.
// Tom roars.

//  -- 03-class Fox --
class Fox extends Cat {
  constructor(name) {
    // super关键字用于访问和调用父对象上的函数。
    // 在构造函数中使用时，super关键字将单独出现，并且必须在使用this关键字之前使用
    super();
    // 调用super,是为了重写变量
    this.name = 'rename-' + name;
  }
  speak() {
    super.speak();
    console.log(this.name + ' roars.');
  }
}

let litterFox = new Fox('ffox');
console.log('litterFox: ', litterFox);
// litterFox:  Fox { name: 'rename-ffox' }
litterFox.speak();
// rename-ffox makes a noise.
// rename-ffox roars.
```

---

1. [super - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super)
