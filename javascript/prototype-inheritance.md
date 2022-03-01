在编程中，我们经常会想获取并扩展一些东西。

例如，我们有一个 user 对象及其属性和方法，并希望将 admin 和 guest 作为基于 user
稍加修改的变体。我们想重用 user 中的内容，而不是复制/重新实现它的方法，而只是在
其之上构建一个新的对象。

原型继承（Prototypal inheritance） 这个语言特性能够帮助我们实现这一需求。

在 JavaScript 中，`对象`有一个特殊的隐藏属性 `[[Prototype]]` ,它要么为 null，要
么就是对另一个对象的引用。该对象被称为“原型”。

属性`[[Prototype]]`是内部的而且是隐藏的，但是有很多设置它的方式。其中之一就是使
用特殊的名字 **\_\_proto\_\_**

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
>
> 备注：遵循 ECMAScript 标准，someObject.[[Prototype]] 符号是用于指向 someObject
> 的原型。从 ECMAScript 6 开始，[[Prototype]] 可以通过 Object.getPrototypeOf()
> 和 Object.setPrototypeOf() 访问器来访问。这个等同于 JavaScript 的非标准但许多
> 浏览器实现的属性 \_\_proto\_\_。
>
> 但它不应该与构造函数 func 的 prototype 属性相混淆。被构造函数创建的实例对象的
> [[Prototype]] 指向 func 的 prototype 属性。Object.prototype 属性表示 Object 的
> 原型对象。

> 当从 object 中读取一个缺失的属性时，JavaScript 会自动从原型中获取该属性。在编
> 程中，这被称为“原型继承”。

```javascript
let user = {
  access: true,
  isAdmin: false,
  isGuest: false,
};
let admin = {
  isAdmin: true,
};
let guest = {
  isGuest: true,
};

admin.__proto__ = user; // 设置 admin 的 Prototype = user
guest.__proto__ = user; // 设置 guest 的 Prototype = user

// 现在,从 admin 中读取一个它没有的属性 access，JavaScript 会自动从 user 中获取。
console.log(admin.access); // true
console.log(admin.isAdmin); // true
console.log(admin.isGuest); // false

console.log(guest.access); // true
console.log(guest.isAdmin); // false
console.log(guest.isGuest); // true
```

在这儿可以说"user"是"admin"的原型"，或者说 "admin 的原型是从"user"继承而来的 "。
因此，如果"user"有许多有用的属性和方法，那么它们将自动地变为在"admin"中可用。这
种属性被称为“继承”。

如果在"user"中有一个方法，它可以在"admin"中被调用：

```javascript
let user = {
  access: true,
  buy() {
    console.log('buy something');
  },
};
let admin = {
  isAdmin: true,
};
admin.__proto__ = user; // 设置 admin的Prototype = user

// buy 方法是从原型中获得的
admin.buy(); // buy something
```

原型链可以很长：

```javascript
let user = {
  access: true,
  buy() {
    console.log('buy something');
  },
};
let admin = {
  isAdmin: true,
};

let superAdmin = {
  isSuperAdmin: true,
};

admin.__proto__ = user; // 设置 admin的Prototype = user
superAdmin.__proto__ = admin; // 设置 superAdmin的Prototype = admin

console.log(superAdmin.access); // true
console.log(superAdmin.isAdmin); // true
console.log(superAdmin.isSuperAdmin); // true

// superAdmin 的 buy 方法是从user中获得的
superAdmin.buy(); // buy something
```

## 三个重点

1.引用不能形成闭环。如果我们试图在一个闭环中分配\_\_proto\_\_，JavaScript 会抛错
。  
2.\_\_proto\_\_ 的值可以是对象，也可以是 null。而其他的类型都会被忽略。  
3.当然，这可能很显而易见，但是仍然要强调：一个对象不能从其他两个对象获得继承。

> \_\_proto\_\_ 是 [[Prototype]]的因历史原因而留下来的 getter/setter.

初学者常犯一个普遍的错误，就是不知道 \_\_proto\_\_ 和 [[Prototype]]的区别。请注
意，\_\_proto\_\_ 与内部的 [[Prototype]]不一样。\_\_proto\_\_ 是 [[Prototype]]的
getter/setter。稍后，将看到在什么情况下理解它们很重要，在建立对 JavaScript 语言
的理解时，让我们牢记这一点。

\_\_proto\_\_ 属性有点过时了。它的存在是出于历史的原因，现代编程语言建议我们应该
使用函数 Object.getPrototypeOf/Object.setPrototypeOf 来取代 \_\_proto\_\_ 去
get/set 原型。稍后将介绍这些函数。

根据规范，\_\_proto\_\_ 必须仅受浏览器环境的支持。但实际上，包括服务端在内的所有
环境都支持它，因此使用它是非常安全的。

## 写入不使用原型

原型仅用于读取属性,对于写入/删除操作可以直接在对象上进行。访问器
（getter/setter）属性是一个例外，因为分配操作是由 setter 函数处理的。因此，写入
此类属性实际上与调用函数相同。

```javascript
let user = {
  access: true,
  name: 'John',
  surname: 'Smith',
  set fullName(value) {
    [this.name, this.surname] = value.split(' ');
  },
  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

let admin = {
  __proto__: user,
  isAdmin: true,
};

console.log(admin.fullName); // John Smith
// setter triggers!
admin.fullName = 'Alice Cooper';
console.log(admin.fullName); // Alice Cooper，admin 的内容被修改了
console.log(user.fullName); // John Smith，user 的内容被保护了
```

## “this” 的值

> 无论在哪里找到方法：在一个对象还是在原型中。在一个方法调用中，this 始终是点符
> 号 `.` 前面的对象。所以，方法是共享的，但对象状态不是。

```javascript
let user = {
  access: true,
  buy() {
    console.log('buy something');
  },
  logout() {
    this.access = false;
  },
};
let admin = {
  isAdmin: true,
};
admin.__proto__ = user; // 设置 admin的Prototype = user
admin.logout();

console.log(user.access); // true
console.log(admin.access); // false
```

## 继承链

```javascript
let user = {
  access: true,
  buy() {
    console.log('buy something');
  },
  logout() {
    this.access = false;
  },
};
let admin = {
  isAdmin: true,
  __proto__: user,
};

console.log(admin.__proto__ === user); // true
console.log(user.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
// 这就是继承链
//
//
//
console.log(Object.getPrototypeOf(admin) === user); // true
console.log(Object.getPrototypeOf(user)); // {}
console.log(Object.prototype); // {}
```

这里有以下继承链：admin 从 user 中继承，user 从 Object.prototype 中继承（因为
user 是对象字面量 {...}，所以这是默认的继承），然后再向上是 nul

## 小结

1.在 JavaScript 中，所有的对象都有一个隐藏的 Prototype 属性，它要么是另一个对象
，要么就是 null。  
2.可以使用 obj.\_\_proto\_\_ 访问它（历史遗留下来的 getter/setter，这儿还有其他
方法）。  
3.通过 Prototype 引用的对象被称为“原型”。  
4.如果想要读取 obj 的一个属性或者调用一个方法，并且它不存在，那么 JavaScript 就
会尝试在原型中查找它。  
5.写/删除操作直接在对象上进行，它们不使用原型（假设它是数据属性，不是 setter）
。  
6.如果调用 obj.method()，而且 method 是从原型中获取的，this 仍然会引用 obj。因此
，方法始终与当前对象一起使用，即使方法是继承的。  
7.for..in 循环在其自身和继承的属性上进行迭代。所有其他的键/值获取方法仅对对象本
身起作用。

---

1. [继承与原型链 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
