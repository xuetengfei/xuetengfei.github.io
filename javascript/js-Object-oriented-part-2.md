## ES5

JavaScript 语言中，生成实例对象的传统方法是通过 `组合使用构造函数模式和原型模式`

```javascript
function Animal(name, energy) {
  this.name = name;
  this.energy = energy;
}

Animal.prototype = {
  constructor: Animal,
  eat: function(amount = 0) {
    console.log(` ${this.name} is eating  `);
    this.energy += amount;
  },
  sleep: function(length) {
    console.log(` ${this.name} is sleeping.`);
    this.energy += length;
  },
  play: function(length) {
    console.log(` ${this.name} is playing.`);
    this.energy -= length;
  },
};
const leo = new Animal('Leo', 7);
leo.eat(2);
// Leo is eating
console.log('leo.energy is : ', leo.energy);
// leo.energy is :  9
const snoop = new Animal('Snoop', 10);
```

## ES6

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。上面的代码用 ES6 的 class 改写，就是下面这样。

```javascript
class Animal {
  constructor(name, energy) {
    this.name = name;
    this.energy = energy;
  }
  eat(amount) {
    console.log(`${this.name} is eating.`);
    this.energy += amount;
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`);
    this.energy += length;
  }
  play(length) {
    console.log(`${this.name} is playing.`);
    this.energy -= length;
  }
}

const leo = new Animal('Leo', 7);
leo.eat(2); // Leo is eating.
console.log(leo.energy); // 9
const snoop = new Animal('Snoop', 10);
```

## ES6 class constructor 方法

上面代码定义了一个“类”，可以看到里面有一个`constructor方法`，这就是`构造方法`，而 this 关键字则代表实例对象。也就是说，ES5 的构造函数 `Animal` ,对应 ES6 的 `Animal Class`的`构造方法`。

constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor 方法，如果没有显式定义，一个空的 constructor 方法会被默认添加。

```javascript
class Animal {}

// 等同于
class Animal {
  constructor() {}
}
```

<!--

[JavaScript原型初学者指南 - 众成翻译](https://www.zcfy.cc/article/a-beginner-s-guide-to-javascript-s-prototype)


 -->
