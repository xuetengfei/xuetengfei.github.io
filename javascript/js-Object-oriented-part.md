面向对象编程（Object Oriented Programming）是目前主流的编程范式。它将真实世界各
种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟
。

每一个对象都是功能中心，具有明确分工，可以完成接受信息、处理数据、发出信息等任务
。对象可以复用，通过继承机制还可以定制。因此，面向对象编程具有灵活、代码可复用、
高度模块化等特点，容易维护和开发，比起由一系列函数或指令组成的传统的过程式编程
（procedural programming），更适合多人合作的大型软件项目。

> 什么是对象？

1. [JavaScript 对象基础 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Basics)
2. [JavaScript 对象入门 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects)

对象是一个集合,包含相关数据(变量)和方法(函数)。

```
对象  = 变量 + 函数
```

> this 指的是谁？

```javascript
var arr = [1, 23, 42];
arr.show = function () {
  alert(this.length);
};
oDiv.onclick = function () {
  alert(this);
};

// 当前的方法属于谁，this 就是指向谁
// arr 的 show 方法中的 this，指向的就是 arr 啦

// 唯一例外：this 前面有 new，this 指向实例
// 判断 this 指向谁，看执行时而非定义时
```

> 创建一个完全为空的对象

下面这种写法，不会继承原型链上面的方法。

```javascript
const obj = Object.create(null);
```

添加属性和方法

```javascript
const obj = Object.create(null);
obj.name ="bob";
obj.showname(){
	console.log(this.name);
};
obj.showname(); // bob
```

?>虽然 Object 构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺
点：使用同 一个接口创建很多对象，会产生大量的重复代码。为解决这个问题，人们开始
使用工厂模式。

> 简单工厂模式:解决了创建多个相似对象时代码的复用问题

<!-- 工厂模式是软件工程领域一种广为人知的设计模式，这种模式抽象了创建具体对象的过程，开发人员用函数来封装以特定接口创建对象的细节 -->

```js
function factoryObj(name) {
  let obj = {};
  obj.age = 25;
  obj.name = name;
  obj.showname = function () {
    console.log(this.name);
  };
  return obj; //  工厂模式 返回一个对象
}
const obj_1 = factoryObj('jack');
const obj_2 = factoryObj('Bob');

console.log(obj_1.age === obj_2.age); // true
console.log(obj_1.showname === obj_2.showname); // false

console.log(typeof obj_1); // object

// 工厂模式解决了重复实例化的问题 ,
// 但是，无法解决，识别问题。因为根本无法搞清楚 产生的对象 到底是哪个对象的实例。
console.log(obj_1 instanceof Object); // true
```

> 构造函数模式:解决对象识别的问题:instanceof

```javascript
function Createobj(name, sex) {
  this.name = name;
  this.sex = sex;
  this.showname = function () {
    console.log(this.name);
  };
}
var obj_1 = new Createobj('jack', 'female');
var obj_2 = new Createobj('bob', 'male');

obj_1.showname(); // jack
obj_2.showname(); // bob

console.log(obj_1 instanceof Createobj); // true
console.log(obj_2 instanceof Createobj); // true
console.log(obj_1 instanceof Object); // true

console.log(obj_1.showname == obj_2.showname); // false
```

特征:

```
1. 没有显式地创建对象
2. 直接将属性和方法赋给了 this 对象
3. 没有 return 语句。
4. 必须使用 new 操作符调用构造函数
```

使用 new 操作符，调用构造函数实际上会经历以下 4 个步骤：

```
1. 创建一个新对象;
2. 将构造函数的作用域赋给新对象(因此 this 就指向了这个新对象);
3. 执行构造函数中的代码(为这个新对象添加属性);
4. 返回新对象
```

创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型；而这正是构造函
数模式 胜过工厂模式的地方。

构造函数模式虽然好用，但也并非没有缺点。使用构造函数的主要问题，就是每个方法都要
在每个实例上重新创建一遍。在前面的例子中，obj_1 和 obj_2 都有一个名为
`showname()`的方法，但那两个方法不是同一个 Function 的实例。ECMAScript 中的函数
是对象，因此每定义一个 函数，也就是实例化了一个对象。

> 原型模式: 解决所有对象实例共享它所包含的`属性和方法`,可以将这些信息直接添加到
> 原型对象中

<!-- 创建的每个函数都有一个 prototype（原型）属性，这个属性是一个指针，指向一个对象。
而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。
prototype 就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以 让所有对象实例共享它所包含的属性和方法。换句话说，不必在构造函数中定义对象实例的信息。 -->

```javascript
function CreateObject() {}

CreateObject.prototype.name = "I'm a Init Name";
CreateObject.prototype.age = 20;
CreateObject.prototype.showname = function () {
  console.log(this.name);
};

const obj_1 = new CreateObject();
console.log(obj_1.name); // I'm a Init Name

const obj_2 = new CreateObject();
console.log(obj_2.name); // I'm a Init Name

console.log(obj_1.showname == obj_2.showname); //true
```

构造函数模式不同的是，新对象的这些属性和方法是由所有实例共享的。这种共享方法非常
合适,共享属性有问题。原型上某个属性是一个引用类型值(数组、对象
、RegExp、Date、Function)。那么，就出问题了。

```javascript
function CreateObject() {}

CreateObject.prototype = {
  name: "I'm a Init Name",
  age: 20,
  hobby: ['read', 'movie', 'basketball'],
  showname: function () {
    console.log(this.name);
  },
};

const obj_1 = new CreateObject();
const obj_2 = new CreateObject();
console.log(obj_2.hobby); // [ 'read', 'movie', 'basketball' ]

obj_1.age = 233;
console.log(obj_2.age); // 20

obj_1.hobby.push('swimming');
console.log(obj_1.hobby); // [ 'read', 'movie', 'basketball', 'swimming' ]
console.log(obj_2.hobby); // [ 'read', 'movie', 'basketball', 'swimming' ]
```

实力化两个对象后，这两个对象的一个`hobby`属性是继承原型上面的一个引用类
型`Array`。对`obj_1.hobby`改动会影响到`obj_2.hobby`,因为这两个对象共享一个引用类
型属性。

## 构造函数+原型

**`构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。`**结果，每
个实例都会有自己的一份实例属性的副本， 但同时又共享着对方法的引用，是集两种模式
之长。

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ['Shelby', 'Court'];
}

Person.prototype = {
  constructor: Person,
  sayName: function () {
    console.log(this.name);
  },
};

var person1 = new Person('Nicholas', 29, 'Software Engineer');
var person2 = new Person('Greg', 27, 'Doctor');

person1.friends.push('Van');
console.log(person1.friends); // ['Shelby', 'Court', 'Van'];
```

在这个例子中，**`构造函数中定义实例属性，原型中定义共享的属性和方法`**。

而修改了 person1.friends，并**`不会影响`**到 person2.friends，因为它们分别引用了
不同的数组。

这种构造函数与原型混成的模式，是目前在 ECMAScript 中使用最广泛、认同度最高的一种
创建自 定义类型的方法。可以说，这是用来定义引用类型的一种默认模式。

---

# ES5 实现构造函数

JavaScript 语言中，生成实例对象的传统方法是通过 `组合使用构造函数模式和原型模式`

```javascript
function Animal(name, energy) {
  this.name = name;
  this.energy = energy;
}

Animal.prototype = {
  constructor: Animal,
  eat: function (amount = 0) {
    console.log(` ${this.name} is eating  `);
    this.energy += amount;
  },
  sleep: function (length) {
    console.log(` ${this.name} is sleeping.`);
    this.energy += length;
  },
  play: function (length) {
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
snoop.sleep(2);
// Snoop is sleeping.
console.log('snoop.energy is : ', snoop.energy);
// snoop.energy is :  12
```

# ES6 实现构造函数

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过
class 关键字，可以定义类。上面的代码用 ES6 的 class 改写，就是下面这样。

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

上面代码定义了一个“类”，可以看到里面有一个`constructor方法`，这就是`构造方法`，
而 this 关键字则代表实例对象。也就是说，ES5 的构造函数 `Animal` ,对应 ES6 的
`Animal Class`的`构造方法`。

constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一
个类必须有 constructor 方法，如果没有显式定义，一个空的 constructor 方法会被默认
添加。

```javascript
class Animal {}

// 等同于
class Animal {
  constructor() {}
}
```

# 实现继承

```js
const log = (...x) => console.log(...x);
log('====================================');
/* ES6  */
class A {
  constructor(type) {
    this.a = 10;
    this.type = type;
  }
  print() {
    log(this.a, this.b, this.type);
  }
}

let a = new A('alphabet-a');
log('a: ', a); // a:  A { a: 10, type: 'alphabet-a' }
a.print(); // 10 undefined alphabet-a

class B extends A {
  constructor(type, c) {
    super(type); // super(type) == A.call(this,type)
    this.b = 20;
    this.c = c;
  }
  print() {
    super.print();
    log('b own print function');
  }
}

log('====================================');
let b = new B('alphabet-b', 30);
log('b : ', b); // b :  B { a: 10, type: 'alphabet-b', b: 20, c: 30 }
b.print();
// 10 20 alphabet-b
// b own print function

/* ES5  */
function C(d) {
  this.c = 100;
  this.d = d;
}

C.prototype.print = function () {
  console.log(this.c, this.d);
};

log('====================================');
let c = new C(150);
log('c: ', c); // c:  C { c: 100, d: 150 }
c.print(); // 100 150

function D(d, e) {
  C.call(this, d);
  this.e = e;
}
D.prototype = Object.create(C.prototype);
D.prototype.constructor = D;
D.prototype.print = function () {
  console.log(this.c, this.d, this.e);
};

log('====================================');
let d = new D(150, 200);
log(' d: ', d); // d:  D { c: 100, d: 150, e: 200 }
d.print(); // 100 150 200

console.log(Object.getPrototypeOf(d)); // D { constructor: [Function: D], print: [Function (anonymous)] }
console.log(d.constructor); // [Function: D]
log('====================================');
```

---

1. [JavaScript 中的继承 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Inheritance)
1. [super - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super)
