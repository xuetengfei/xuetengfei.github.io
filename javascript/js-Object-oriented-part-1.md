面向对象编程（Object Oriented Programming）是目前主流的编程范式。它将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟。

每一个对象都是功能中心，具有明确分工，可以完成接受信息、处理数据、发出信息等任务。对象可以复用，通过继承机制还可以定制。因此，面向对象编程具有灵活、代码可复用、高度模块化等特点，容易维护和开发，比起由一系列函数或指令组成的传统的过程式编程（procedural programming），更适合多人合作的大型软件项目。

## 什么是对象？

1. [JavaScript 对象基础 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Basics)
2. [JavaScript 对象入门 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects)

对象是一个集合,包含相关数据(变量)和方法(函数)。

```
对象  = 变量 + 函数
```

```javascript
var a = 12;
function func() {
  alert('hello');
}

// a 是一个变量
// func() 是一个函数
// 全局的变量是 window 的属性
// 全局的函数也是 window 的方法
// 变量 = 属性
// 函数 = 方法

var arr = [];
console.log(typeof arr); // Object
arr.a = 12;
arr.show = function() {
  alert(this.a);
};
arr.show(); // 12

// 变量隶属于一个对象后，我们称它为属性
// 函数隶属于一个对象后，我们称它为方法
// 10 岁小明，是一个“孩子”，在学校他为“学生”
```

## this 指的是谁？

```javascript
var arr = [1, 23, 42];
arr.show = function() {
  alert(this.length);
};
oDiv.onclick = function() {
  alert(this);
};

// 当前的方法属于谁，this 就是指向谁
// arr 的 show 方法中的 this，指向的就是 arr 啦
// 大实话：工资卡上缴老婆
// 唯一例外：this 前面有 new，this 指向实例
// 判断 this 指向谁，看执行时而非定义时
```

## 创建一个完全为空的对象

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

?>虽然 Object 构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点：使用同 一个接口创建很多对象，会产生大量的重复代码。为解决这个问题，人们开始使用工厂模式。

## 简单工厂模式

> 解决了创建多个相似对象的问题:代码复用

工厂模式是软件工程领域一种广为人知的设计模式，这种模式抽象了创建具体对象的过程，开发人员用函数来封装以特定接口创建对象的细节

```javascript
function factoryObj(name) {
  let obj = {};
  obj.age = 25;
  obj.name = name;
  obj.showname = function() {
    console.log(this.name);
  };
  return obj;
}
var obj_1 = factoryObj('jack');
obj_1.showname(); // jack
```

存在的问题

```javascript
function factoryObj(name) {
  let obj = {};
  obj.age = 25;
  obj.name = name;
  obj.showname = function() {
    console.log(this.name);
  };
  return obj;
}
var obj_1 = factoryObj('jack');
var obj_2 = factoryObj('Bob');

console.log(obj_1.showname == obj_2.showname); // false
```

工厂模式虽然解决了创建 多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）。随着 JavaScript 的发展，又一个新模式出现了。

## 构造函数模式

> 解决对象识别的问题:instanceof

```javascript
function CreateObj(name, sex) {
  this.name = name;
  this.sex = sex;
  this.showname = function() {
    console.log(this.name);
  };
}
var obj_1 = new Createobj('jack', 'female');
obj_1.showname(); // jack
```

特征:

1. 没有显式地创建对象
2. 直接将属性和方法赋给了 this 对象
3. 没有 return 语句。
4. 必须使用 new 操作符调用构造函数

使用 new 操作符，调用构造函数实际上会经历以下 4 个步骤：

1. 创建一个新对象;
2. 将构造函数的作用域赋给新对象(因此 this 就指向了这个新对象);
3. 执行构造函数中的代码(为这个新对象添加属性);
4. 返回新对象

创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型；而这正是构造函数模式 胜过工厂模式的地方。

```javascript
function Createobj(name, sex) {
  this.name = name;
  this.sex = sex;
  this.showname = function() {
    console.log(this.name);
  };
}
var obj_1 = new Createobj('jack', 'female');
var obj_2 = new Createobj('bob', 'male');

obj_1.showname(); // jack
obj_2.showname(); // bob

console.log(obj_1 instanceof Createobj); // true
console.log(obj_2 instanceof Createobj); // true
```

构造函数模式虽然好用，但也并非没有缺点。使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。在前面的例子中，obj_1 和 obj_2 都有一个名为 `showname()`的方法，但那两个方法不是同一个 Function 的实例。ECMAScript 中的函数是对象，因此每定义一个 函数，也就是实例化了一个对象。所以：

```javascript
var obj_1 = new Createobj('jack', 'female');
var obj_2 = new Createobj('bob', 'male');

console.log(obj_1.showname == obj_2.showname); // false
```

## 原型模式

> 解决所有对象实例共享它所包含的属性和方法:可以将这些信息直接添加到原型对象中

我们创建的每个函数都有一个 prototype（原型）属性，这个属性是一个指针，指向一个对象， 而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。如果按照字面意思来理解，那 么 prototype 就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以 让所有对象实例共享它所包含的属性和方法。换句话说，不必在构造函数中定义对象实例的信息。

```javascript
function CreateObject() {}

CreateObject.prototype.name = "I'm a Init Name";
CreateObject.prototype.age = 20;
CreateObject.prototype.showname = function() {
  console.log(this.name);
};

const obj_1 = new CreateObject();
console.log(obj_1.name); // I'm a Init Name

const obj_2 = new CreateObject();
console.log(obj_2.name); // I'm a Init Name

console.log(obj_1.showname == obj_2.showname); //true
```

构造函数模式不同的是，新对象的这些属性和方法是由所有实例共享的。这种共享方法非常合适,共享属性有问题。原型上某个属性是一个引用类型值(数组、对象、RegExp、Date、Function)。那么，就出问题了。

```javascript
function CreateObject() {}

CreateObject.prototype = {
  name: "I'm a Init Name",
  age: 20,
  hobby: ['read', 'movie', 'basketball'],
  showname: function() {
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

实力化两个对象后，这两个对象的一个`hobby`属性是继承原型上面的一个引用类型`Array`。对`obj_1.hobby`改动会影响到`obj_2.hobby`,因为这两个对象共享一个引用类型属性。

## 组合使用构造函数模式和原型模式

构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本， 但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参 数；可谓是集两种模式之长。

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ['Shelby', 'Court'];
}

Person.prototype = {
  constructor: Person,
  sayName: function() {
    console.log(this.name);
  },
};

var person1 = new Person('Nicholas', 29, 'Software Engineer');
var person2 = new Person('Greg', 27, 'Doctor');

person1.friends.push('Van');
console.log(person1.friends); // ['Shelby', 'Court', 'Van'];
```

在这个例子中，实例属性都是在构造函数中定义的，而由所有实例共享的属性 constructor 和方 法 sayName()则是在原型中定义的。而修改了 person1.friends（向其中添加一个新字符串），并不 会影响到 person2.friends，因为它们分别引用了不同的数组。

这种构造函数与原型混成的模式，是目前在 ECMAScript 中使用最广泛、认同度最高的一种创建自 定义类型的方法。可以说，这是用来定义引用类型的一种默认模式。
