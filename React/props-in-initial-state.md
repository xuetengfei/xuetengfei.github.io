# 避免在 constructor 的时候使用 props 给 state 赋值

使用 props 去在 getInitialState 中生成初始 state(或者在 constructor 中初始化)很容易导致多个数据源的问题, 也会给使用者带来这样的疑问: 我们的真正的数据源到底来自哪? 这是因为 getInitialState 只在组件第一次初始化的时候被调用一次.

这样做的危险在于, 有可能组件的 props 发生了改变但是组件却没有被更新.(见下面的例子) 新的 props 的值不会被 React 认为是更新的数据因为构造器(constructor)或者 getInitialState 方法在组件创建之后不会再次被调用了,因此组件的 state 不再会被更新. 要记住, State 的初始化只会在组件第一次初始化的时候发生.

## bad

```javascript
class SampleComponent extends Component {
  // constructor function (or getInitialState)
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      inputVal: props.inputValue,
    };
  }

  render() {
    return <div>{this.state.inputVal && <AnotherComponent />}</div>;
  }
}
```

## right

```javascript
class SampleComponent extends Component {
  // constructor function (or getInitialState)
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
    };
  }

  render() {
    const { inputValue } = this.props;
    return <div>{inputValue && <AnotherComponent />}</div>;
  }
}
```
