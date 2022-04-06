setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步
的。

setState 的“异步”并不是内部异步代码实现的，其本身执行过程和代码是同步的，只是合
成事件和钩子函数的调用顺序在更新之前，导致这两个场景下没法立马拿到更新后的值，形
成了所谓的“异步”，但是我们还是可以通过 setState 的第二个参数，callback 函数去拿
到更新后的值的。

setTimeout 的批量更新优化机制是建立在“异步”（合成事件，钩子函数）之上的，在原生
事件和 setTimeout 中不会批量更新。在“异步”中，如果是对同一个 key 值进行多次
setState，批量更新策略会对其进行覆盖，只对最后一次 setState 进行更新。如果同时
setState 多个不同的 key 值，会先进行合并操作，再在最后一个 setState 进行更新。

```javascript
import React, { Component } from 'react';
export default class Button extends Component {
  constructor() {
    super();
    this.state = { buttonText: 'Click me, please', a: 0, val: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.setState({ val: 1 });
    this.setState({ val: 2 });
    Promise.resolve().then(() => {
      this.setState({ val: 3 });
      this.setState({ val: 4 });
    });
    this.setState({ val: 5 });
    this.setState({ val: 6 });

    this.setState({ val: this.state.val + 1 });
    console.log('a', this.state.val); // 0
    this.setState({ val: this.state.val + 1 });
    console.log('b', this.state.val); // 0
    setTimeout(() => {
      this.setState({ val: this.state.val + 1 });
      console.log('c', this.state.val);
      this.setState({ val: this.state.val + 1 });
      console.log('d', this.state.val);
    }, 0);
  }

  handleClick() {
    const { val } = this.state;
    this.setState(() => {
      return { buttonText: 'Thanks, been clicked!', val: val + 1 };
    });
    console.log('e', this.state.val);
    this.setState(() => {
      return { buttonText: 'Thanks, been clicked!', val: val + 1 };
    });
    console.log('f', this.state.val);
  }

  render() {
    console.log('render', this.state.val);
    const { buttonText } = this.state;
    return (
      <>
        <button onClick={this.handleClick}>{buttonText}</button>
      </>
    );
  }
}
```

![20220406-ksOsPV-Xnip2022-04-06_15-47-55](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220406-ksOsPV-Xnip2022-04-06_15-47-55.jpg)

---

1.[CodeSandbox](https://codesandbox.io/s/divine-wildflower-035cg8?file=/src/button.js:0-1473)
[React 中 setState() 更新机制和源码解读 - 贺鹏飞的博客](https://www.hepengfei.net/react/61.html)
