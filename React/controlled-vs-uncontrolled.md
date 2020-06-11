<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/controlled-vs-uncontrolled-cover-1567066568.png'/>

React 提供的一个强大概念是使用受控组件(表单)，受控组件是使用 React 实现表单时的推荐标准。

## uncontrolled component

在传统的 HTML 表单中，input 等组件 通常会维护自己的状态并根据用户输入进行更新。换句话说，它们会接受我们输入的内容，并记住它，为了检索它们记住的值，必须在需要时“拉”它。后者通常在表单提交期间发生。它们可归类为 不受控制的组件。

<!--


class Form extends Component {
  handleSubmitClick = () => {
    const name = this._name.value;
    // do something with `name`
  }

  render() {
    return (
      <div>
        <input type="text" ref={input => this._name = input} />
        <button onClick={this.handleSubmitClick}>Sign up</button>
      </div>
    );
  }
}

 -->

```javascript
import React, { useState } from 'react';

const Form = () => {
  const [value, setValue] = useState('Hello React');
  const handleChange = event => setValue(event.target.value);

  return (
    <>
      <label>
        Uncontrolled Input:
        <input type="text" onChange={handleChange} />
      </label>
      <p>Output: {value}</p>
    </>
  );
};
export default Form;
```

## controlled component

通过从 React 的状态给出输入值，input 不再使用其内部状态，而是使用从 React 提供的状态。当在输入内容时，输入字段和输出段落都将通过 React 的状态进行同步。输入字段已成为受控元素，Form 组件成为受控组件。

```javascript
import React, { useState } from 'react';

const Form = () => {
  const [value, setValue] = useState('Hello React');
  const handleChange = event => setValue(event.target.value);
  return (
    <div>
      <label>
        Controlled Input:
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <p>Output: {value}</p>
    </div>
  );
};
export default Form;
```

<!--

https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
https://goshakkk.name/on-forms-react/
 -->
