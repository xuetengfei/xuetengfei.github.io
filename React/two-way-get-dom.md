```javascript
import React, { Component } from 'react';

export default class componentName extends Component {
  handleClick = () => {
    const dom = this.something;
    console.log(dom);
    const dom2 = this.refs.flag;
    console.log(dom2);
  };
  render() {
    return (
      <div>
        <div onClick={this.handleClick}>Click Btn</div>
        <div ref={node => (this.something = node)}>A real Dom Node</div>
        <div ref="flag">Other real Dom Node</div>
      </div>
    );
  }
}
```

打印结果

```html
<div>A real Dom Node</div>
<div>Other real Dom Node</div>
```

## 调用子组件的 ref

```javascript
class Field extends Component {
  render() {
    return <input type="text" ref={this.props.inputRef} />;
  }
}

class MyComponent extends Component {
  componentDidMount() {
    this.inputNode.focus();
  }

  render() {
    return (
      <div>
        <Field inputRef={node => (this.inputNode = node)} />
      </div>
    );
  }
}
```
