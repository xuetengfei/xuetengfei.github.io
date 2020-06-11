使用状态和类方法定义 React 类组件的一种方法如下：

```javascript
import React, { Component } from 'react';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onIncrement() {
    this.setState(state => ({ counter: state.counter + 1 }));
  }
  onDecrement() {
    this.setState(state => ({ counter: state.counter - 1 }));
  }

  render() {
    return (
      <div>
        <p>{this.state.counter}</p>
        <button onClick={this.onIncrement} type="button">
          Increment
        </button>
        <button onClick={this.onDecrement} type="button">
          Decrement
        </button>
      </div>
    );
  }
}
```

但是，当实现大量的 React 类组件时，构造函数中的 `class 方法的绑定` 以及首先`具有构造函数`变为繁琐的实现细节。通过使用 JavaScript 箭头函数，您可以`自动绑定类方法`，而无需在构造函数中绑定它们。通过将`状态直接定义为类属性`，也可以在不使用 props 时省略构造函数。请注意，`类属性`尚未使用 JavaScript 语言。因此，这种定义 React 类组件的方式比其他版本更简洁

```javascript
import React, { Component } from 'react';

export default class Counter extends Component {
  state = {
    counter: 0,
    total: 999,
  };
  onIncrement = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };
  onDecrement = () => {
    this.setState(state => ({ counter: state.counter - 1 }));
  };
  render() {
    return (
      <>
        <p>{this.state.counter}</p>
        <p>{this.state.total}</p>
        <button onClick={this.onIncrement} type="button">
          Increment
        </button>
        <button onClick={this.onDecrement} type="button">
          Decrement
        </button>
      </>
    );
  }
}
```

## 箭头函数

但是，当实现大量的 React 类组件时，构造函数中的 class 方法的绑定 以及首先具有构造函数变为繁琐的实现细节。

## 实例属性

ES7 定义实例属性吧，ES7 和 ES6 的静态属性和实例属性只是定义不一样,调用的方式是一样的。 没有查到更多官方资料。 ES6 定义属性只能在 constructor 构造函数中，而不能在 class 中

---

1. [事件处理 - React](https://react.docschina.org/docs/handling-events.html)
2. [React v16.2.0: Improved Support for Fragments - React Blog](https://react.docschina.org/blog/2017/11/28/react-v16.2.0-fragment-support.html)
3. [ES6 类(Class)基本用法和静态属性+方法详解](https://blog.csdn.net/pcaxb/article/details/53759637)
