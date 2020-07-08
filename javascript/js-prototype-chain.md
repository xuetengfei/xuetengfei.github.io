<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/prototype-cover-1552709232.png'/>

> 基于原型的语言？

JavaScript 常被描述为一种基于原型的语言 (prototype-based language)——每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

准确地说，这些属性和方法定义在 Object 的构造器函数(constructor functions)之上的 prototype 属性上，而非对象实例本身。

在传统的 OOP 中，首先定义“类”，此后创建对象实例时，类中定义的所有属性和方法都被复制到实例中。在 JavaScript 中并不如此复制——而是在对象实例和它的构造器之间建立一个链接（它是`_proto_` 属性，是从构造函数的 prototype 属性派生的），之后通过上溯原型链，在构造器中找到这些属性和方法。

## prototype

!> 每个「函数」都有 prototype 属性。 在规范里，prototype 被定义为给其它对象提供共享属性的对象。也就是说，prototype 自己也是**对象**，只是被用以承担某个职能罢了。

```javascript
function func() {}

console.log(func.prototype);

/* 

{
    constructor: ƒ func(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
    }
}

*/
// func.prototype 就是个 对象
```

所以,func.prototype.\_\_proto\_\_ 等于 constructor: ƒ Object()

```javascript
function func() {}
func.prototype.myValue = '233';
console.log(func.prototype);

/* 

{
    myValue:"233",
    constructor: ƒ func(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
    }
}

*/

function Person(name) {
  this.name = name;
}

Person.prototype.myValue = 666;
Person.prototype.getName = function () {
  return this.name;
};

console.log(JSON.stringify(Person.prototype));
//{"myValue":666}
var a = new Person('sven');
console.log(a.name); // sven
```

### 内置构造函数 Object

```javascript
console.log(typeof Object); // function
console.log(Object.prototype);
```

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Object.prototype.jpg"/>

<!-- Bl-2018-07-24_151253.jpg -->

```javascript
console.log(Object === Object.prototype.constructor); // true
```

### 自定义的构造函数 Person

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.MyValue = 666;
Person.prototype.getName = function () {
  return this.name;
};

console.log(Person === Person.prototype.constructor); // true

var a = new Person('sven');
console.log(a.name); // sven

console.log(Person.prototype);
```

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/person.prototype.jpg"/ width="500px">

## \_\_proto\_\_

!> javascript 给对象（`object` ）提供了一个隐藏属性（称为`__proto__`） 默认指向它的`构造函数`的`原型对象`（prototype）
\_\_proto\_\_属性没有写入 ES6 的正文，而是写入了附录。原因是它本质上是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6。标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。所以无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，应该使用：**Object.getPrototypeOf(target)（读操作）、Object.setPrototypeOf(target)（写操作）、Object.create(target)（生成操作）**代替

每个对象都有 **\_\_proto\_\_** 属性，指向了创建该对象的构造函数的原型。其实这个属性指向了 [[prototype]]，但是 [[prototype]] 是内部属性，我们并不能访问到，所以使用 _proto_ 来访问。

对象可以通过 **\_\_proto\_\_** 来寻找不属于该对象的属性，**\_\_proto\_\_** 将对象连接起来组成了原型链。

```javascript
const a = { a: '1' };
Object.getPrototypeOf(a) === a.__proto__; // true
```

#### 内置的构造函数是什么、它做了什么

所有函数，都有 prototype 属性，它默认是以 Object.prototype 为原型的对象。普通函数创建时，自带了 prototype 属性，该属性是一个对象，包含 constructor 一个字段，指向构造函数。

```javascript
obj.__proto__ = Constructor.prototype;

const obj = {};
console.log(obj.__proto__);
```

这里 obj 是一个对象,obj 的构造函数是 Object，Object 的 prototype 如下面的图片所示。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Object.prototype.jpg"/>

```javascript
console.log(obj.__proto__ === Object.prototype); // true
```

---

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.MyValue = 666;
Person.prototype.getName = function () {
  return this.name;
};

var a = new Person('sven');
console.log(a.__proto__);
```

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/person.prototype.jpg"/ width="500px">

```javascript
console.log(a.__proto__ === Person.prototype); // true
```

### 原型链

我们牢记住一个概念:`obj.__proto__ = Constructor.prototype;`

#### 自定义构造对象

```javascript
function Person(name) {
  this.name = name;
}
var p1 = new Person('sven');

// p1是函数构造器Person实力化后的一个对象
console.log(p1.__proto__ === Person.prototype); // true

// Person.prototype是一个对象,那么他的构造器是Object
console.log(Person.prototype.__proto__ === Object.prototype); // true

// Object.prototype是顶点，它的__proto__ 指向null
console.log(Object.prototype.__proto__ === null); // true

// 那么，这根原型链条就是如下这样
console.log(p1.__proto__.__proto__.__proto__ === null); // true
```

其余部分

```javascript
// Person是一个函数，其构造器是Function
console.log(Person.__proto__ === Function.prototype); // true

// Function.prototype它也是一个对象,那么他的构造器是Object
console.log(Function.prototype.__proto__ === Object.prototype); // true
```

#### js 内置构造函数

```javascript
const a1 = [];

console.log(a1.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
console.log(a1.__proto__.__proto__.__proto__ === null); // true
```

```javascript
console.log(Array.__proto__ === Function.prototype); // true
```

#### 原型链

```javascript
class Developer {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
  getName() {
    return this.firstname + ' ' + this.lastname;
  }
}

class ReactDeveloper extends Developer {
  getJob() {
    return 'React Developer';
  }
}

var me = new ReactDeveloper('Robin', 'Wieruch');

console.log(me.getName()); // Robin Wieruch
console.log(me.getJob()); // React Developer

console.log(me.__proto__ == ReactDeveloper.prototype); // true
console.log(ReactDeveloper.prototype.__proto__ == Developer.prototype); // true
console.log(Developer.prototype.__proto__ == Object.prototype); // true
console.log(Object.prototype.__proto__ == null); // true
```

## 基于原型链的继承

### 继承属性

JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

```javascript
function F() {
  this.a = 1;
  this.b = 2;
}
let o = new F();
F.prototype.b = 3;
F.prototype.c = 4;

console.log(o); // {a:1,b:2}

console.log(o.a); //  1

console.log(o.b); //  2
//原型上也有一个'b'属性,但是它不会被访问到.这种情况称为"属性遮蔽 (property shadowing)"

console.log(o.c); //  4
// c是o的自身属性吗？不是，那看看原型上有没有.有的，该属性的值为4

// 综上，整个原型链如下:(根据定义，null 没有Prototype)
//{a:1, b:2} ---> {b:3, c:4} ---> Object.prototye---> null
```

### 继承方法

在 JavaScript 里，任何函数都可以添加到对象上作为对象的属性。函数的继承与其他的属性继承没有差别，包括上面的“属性遮蔽”（这种情况相当于其他语言的方法重写）。
当继承的函数被调用时，this 指向的是当前继承的对象，而不是继承的函数所在的原型对象。

#### 显式原型继承-1. Object.create();

```javascript
var o = {
  a: 2,
  m: function () {
    return this.a + 1;
  },
};

console.log(o.m()); // 3
// 当调用 o.m 时,'this'指向了o.

var p = Object.create(o);
// p是一个继承自 o 的对象

p.a = 4; // 创建 p 的自身属性 a
console.log(p.m()); // 5
// 调用 p.m 时, 'this'指向 p.
// 又因为 p 继承 o 的 m 函数
// 此时的'this.a' 即 p.a，即 p 的自身属性 'a'
```

#### 显式原型继承-2. Object.setPrototypeOf

```javascript
const obj_a = { a: '1' };
const obj_b = { b: '2' };
Object.setPrototypeOf(obj_b, obj_a);

console.log(obj_b.a); // 1
```

#### class

```javascript
class Developer {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
  getName() {
    return this.firstname + ' ' + this.lastname;
  }
}

class ReactDeveloper extends Developer {
  getJob() {
    return 'React Developer';
  }
}

var me = new ReactDeveloper('Robin', 'Wieruch');

console.log(me.getName()); // Robin Wieruch
console.log(me.getJob()); // React Developer
```

#### JS 原型其实是一个隐式的单向链表。

在某些场景下，我们甚至可以直接把 Prototype 当作 JS 里内置的单向链表来用，而不必手动实现。

```javascript
Object.defineProperty(Object.prototype, 'previous', {
  get() {
    let previous = Object.getPrototypeOf(this);
    return previous === Object.prototype ? null : previous;
  },
  set(value) {
    return Object.setPrototypeOf(this, value);
  },
});

const a = { value: 'a' };
const b = { value: 'b' };
const c = { value: 'c' };

a.previous = b;
b.previous = c;

console.log(a);
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200608101410js-object.jpg' alt='20200608101410js-object'/>

---

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/prototype-01-1552708761.jpg'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/prototype-02-1552708761.jpg'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/prototype-03-1552708761.jpg'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/prototype-04-1552708761.jpg'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/prototype-05-1552708761.jpg'/>

<!-- ---

1. [继承与原型链 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
2. [配图来源](https://cnodejs.org/topic/5c8a6a657ce0df3732428093)
3. [How To Work with Prototypes and Inheritance in JavaScript | DigitalOcean](https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript)
4. [Understanding Classes in JavaScript – Tania Rascia](https://www.taniarascia.com/understanding-classes-in-javascript/)
5. [【第 1752 期】深入理解 JavaScript 原型](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651234313&idx=1&sn=4f645f142e2b5bccc3651214a81de6bd&chksm=bd49798d8a3ef09bbe23df57fd068e4aa3fdefc0d889a6f5ef495574cb7980fc872ce20febd0&scene=21#wechat_redirect)
6. [JS 基础-原型、原型链 | 前端进阶积累](http://obkoro1.com/web_accumulate/accumulate/JS/prototype.html#prototype) -->
