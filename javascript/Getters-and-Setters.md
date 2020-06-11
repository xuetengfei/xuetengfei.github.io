## 对象的 getter 和 setter

```javascript
const book = {
  title: 'Harry Potter',
  author: 'J. K. Rowling',
  category: 'Magic literature',
  pages: 730,
  get name() {
    return this.title;
  },
  set newName(newname) {
    this.title = newname;
  },
  say() {
    console.log(this.title);
  },
};

console.log(book.name); // Harry Potter
console.log((book.newName = 'Harry')); // Harry
console.log(book);

/* 
{ title: 'Harry',
  author: 'J. K. Rowling',
  category: 'Magic literature',
  pages: 730,
  name: [Getter],
  newName: [Setter],
  say: [Function: say] } */
```

## 调用 class 的函数

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

const ruth = new Person('Ruth', 'John');

console.log(ruth.fullName); // [Function: fullName]
console.log(ruth.fullName()); // Ruth John
```

## Getter

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

const ruth = new Person('Ruth', 'John');

console.log(ruth.fullName); // Ruth John
console.log(ruth['fullName']); // Ruth John
console.log(ruth.fullName()); // throw error !
```

`get`的作用就像是把 class 中的函数转换为同名的**属性**，这样的话，可以直接访问实例化对象的这个`fullName`属性，而且调用`fullName()`函数会**报错**。

但是，`fullName`确实不是属性，具体表现是它不可修改，看下面代码。

```javascript
// ...
const ruth = new Person('Ruth', 'John');
console.log(ruth.fullName); // Ruth John
ruth.fullName = 'andy'; // rewrite ruth.fullName property
console.log(ruth.fullName); // Still is 'Ruth John' Not is ‘andy’
```

## Setter

对于 Getter 值不能修改的问题，可以使用 Setter 来解决。Setter 和 Getter 是对应的同一个函数。它接受一个单一的参数，然后进行相应的逻辑处理，一般来说是更新 class 中**属性的值。**

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
  set fullName(val) {
    const names = val.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
}

const ruth = new Person('Ruth', 'John');

console.log(ruth.fullName); // Ruth John
ruth.fullName = 'andy Max';
console.log(ruth.fullName); // andy Max
```

在这个我们使用了 Setter 创建了也叫`fullName`的一个函数。这个函数内部改变了 class 的 `firstName` `lastName` 这两个属性，继而 `fullName` 也就改变了。**非常像`vue`中的计算属性。**

## why use it

首先，使用 get set 可以提供一个统计的访问接口，对于使用者而言，无需关心什么是`静态属性`什么是`计算属性`，二者的对外暴露的接口是统一的，都是属性访问符号`.` 或者`[]`

## Setter -- add validation

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
  set fullName(val) {
    if (typeof val !== 'string') {
      throw new Error('Must be a string');
    }
    const names = val.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
}

const ruth = new Person('Ruth', 'John');
console.log(ruth.fullName); // Ruth John
ruth.fullName = 123; // throw new Error('Must be a string');
```

1. ['Getters and Setters in JavaScript' by Marcus Noble](https://marcusnoble.co.uk/2018-01-26-getters-and-setters-in-javascript/)
