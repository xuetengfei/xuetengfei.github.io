## es6 Class

```javascript
class Cat {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Lion extends Cat {
  speak() {
    console.log(this.name + ' roars.');
  }
}

let v = new Lion('Tom');
v.speak(); // Tom roars.
```

```javascript
class Cat {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(this.name + ' roars.');
  }
}

let v = new Lion('Tom');
v.speak();

// Tom makes a noise.
// Tom roars.
```

如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。super 引用的是父类构造函数，在调用父类构造函数之前，无法用`this`。

```javascript
class Cat {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Lion extends Cat {
  constructor(name) {
    super();
    this.name = name;
    this.color = 'yellow';
  }
  showColor() {
    console.log(this.color);
  }
  speak() {
    console.log(this.name + ' roars.');
  }
}

let v = new Lion('Tom');
v.speak();
v.showColor();

// Tom roars.
// yellow
```

## React

```javascript
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: true };
  }
  // ...
}
```

```javascript
class Checkbox extends React.Component {
  state = { isOn: true };
  // ...
}
```

props 不传也能用。

[tc39/class 属性提案](https://github.com/tc39/proposal-class-fields):只要没有显式声明构造函数，所有参数都会被自动传递。所以，在 `state = {}` 表达式中，你可以访问 `this.props`。

---

1. [类 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)
1. [为什么我们要写 super(props) ？ — Overreacted](https://overreacted.io/zh-hans/why-do-we-write-super-props/)
