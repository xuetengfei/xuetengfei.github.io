# Simplify React Forms With Hooks

## Controlling Inputs The Old Way

```javascript
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  handleSubmit = event => {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

组件的功能是:跟踪输入字段的状态,更新更改时的值,使字段值对提交处理程序可用.虽然这段代码并不十分复杂，但对于处理单个输入字段来说，它确实有点繁重。

## 用钩子重写

```javascript
import React, { useState } from 'react';

// Custom Hooks: useInput
const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      },
    },
  };
};

export function Form(props) {
  const { value, bind, reset } = useInput('');
  const handleSubmit = evt => {
    evt.preventDefault();
    console.log(`Submitting Name ${value}`);
    reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" {...bind} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

## Ant-Design

```javascript
import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input } from 'antd';
import { useInput } from '@/utils/hooks';
import { ModelName } from './model';

function CreateNewPageAuthMask(props) {
  const { dispatch, visible, handleOk, handleCancel } = props;
  const PageUrlObj = useInput('');
  const DescriptionObj = useInput('');
  const handlefn = () => {
    dispatch({
      type: `${ModelName}/addNewPageAuth`,
      payload: {
        url: PageUrlObj.value,
        description: DescriptionObj.value,
        method: 'GET',
        parentId: 0,
        seq: 1,
      },
      callback: () => {
        handleOk();
        PageUrlObj.reset();
        DescriptionObj.reset();
      },
    });
  };

  return (
    <Modal
      title="Create New Page Auth"
      visible={visible}
      onOk={handlefn}
      onCancel={handleCancel}
    >
      <Form>
        <Form.Item label="Url">
          <Input
            placeholder="Please Input Url"
            allowClear
            {...PageUrlObj.bind}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input
            placeholder="Please Input Description"
            allowClear
            {...DescriptionObj.bind}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default connect()(CreateNewPageAuthMask);
```

## 在解构中重命名值,添加更多字段

```javascript
export function NameForm(props) {
  const {
    value: firstName,
    bind: bindFirstName,
    reset: resetFirstName,
  } = useInput('');
  const {
    value: lastName,
    bind: bindLastName,
    reset: resetLastName,
  } = useInput('');

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log(`Submitting Name ${firstName} ${lastName}`);
    resetFirstName();
    resetLastName();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" {...bindFirstName} />
      </label>
      <label>
        Last Name:
        <input type="text" {...bindLastName} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

### 后续

ant-design v4 的 React 组件中，处理 Field/Input/Forms 还是很棘手啰嗦的。有很多的业务场景，需要处理大量的表单，比如，编辑一个用户权限，打开一个 modal 组件，里面是大量的 Forms，处理完成后。编辑其他的表单时候，会带出之前输入的值，这时候需要清空，就要在 submit 成功后的回调函数中，执行 reset input。

之前我的 hook 是下面这样写的，没有 reset 功能，不知道怎么清空 Input Value，头铁了好久。

```javascript
function useFormInput(initalValue) {
  const [value, setvalue] = useState(initalValue);
  const handleChanged = e => {
    setvalue(e.target.value);
  };
  return {
    value,
    onChange: handleChanged,
  };
}
```

## 再后续

[惰性初始 state -导致的渲染问题](/React/lazy-initial-state)

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/useInput-1565513973.png'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/useInput-2-1565513973.png'/>

<!--
下一篇博客讲，在稍微复杂一些的业务，存在大量的表单验证，我的组件划分和代码书写习惯。

[Simplifying React Forms with Hooks | Rangle.io](https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/)
 -->
