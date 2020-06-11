# 从 virtual DOM 中取值

```javascript
import React, { Component } from 'react';
import './input.css';

const formatNumber = (str, space = true) => {
  const compact = arr => arr.filter(v => v != ' ');
  const res = compact([...str.trim()]);
  if (space) {
    res.length > 3 && res.splice(3, 0, ' ');
    res.length > 8 && res.splice(8, 0, ' ');
  }
  if (res.length > 13) {
    return res.slice(0, 13).reduce((init, v) => init + v, '');
  }
  return res.reduce((init, v) => init + v, '');
};

export default class componentName extends Component {
  state = {
    value: null,
  };
  handleInput = () => {
    this.refs.InputDom.value = formatNumber(this.refs.InputDom.value);
    this.setState({
      value: formatNumber(this.refs.InputDom.value, false),
    });
  };
  render() {
    const { value } = this.state;
    return (
      <div>
        <input
          className="input-style"
          type="text"
          onChange={this.handleInput}
          ref="InputDom"
        />
        <div> {value}</div>
      </div>
    );
  }
}
```

无论用户是输入还是粘贴数字，都进行处理。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/react-refs-input.jpg' width="550px"/>
