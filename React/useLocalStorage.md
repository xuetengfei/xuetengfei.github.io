`react-use`第三方有一个好用的[useLocalStorage](https://streamich.github.io/react-use/?path=/story/side-effects-uselocalstorage--docs),我在此基础上进行简单的封装，方便在其他组件的调用

### useLocalStorage: side-effect hook that manages a single localStorage key.

```javascript
import { useLocalStorage } from 'react-use';

const Demo = () => {
  const [value, setValue] = useLocalStorage('my-key', 'foo');

  return (
    <div>
      <div>Value: {value}</div>
      <button onClick={() => setValue('bar')}>bar</button>
      <button onClick={() => setValue('baz')}>baz</button>
    </div>
  );
};
```

### Secondary packaging

LocalStorage 是`Key-Value Pair`,需要通过为一个"key"去获取对应的"Value",各个组件想要使用 LocalStorage 的某些数据,显式/隐式传递对应的"key",蛮麻烦的。
进行简单的封装后，各个组件调用这个 **custom hooks**就可以获取数据，也可以再次基础上对"key""value"进行加解密处理。

```javascript
import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useLocalStorage, useSessionStorage } from 'react-use';
import { fetchItemList } from './server';

export function useObtainFinanceItemSet() {
  const KEY = 'save-item-list-to-browser-LocalStorage';
  // 不需要记住 这个 key

  const [value, setValue] = useLocalStorage(KEY, []);

  useEffect(() => {
    if (isEmpty(value)) {
      fetchItemList().then(res => {
        if (res.status === '1') {
          // 可以在这里对数据加密
          setValue(res.data);
        } else {
          message.error('Obtain Finance Account Error !');
        }
      });
    }
  }, []);

  // 返回数据(解密数据)
  return value;
}
```

<figure>
  <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/useLocalStorage-1578734468.jpg'/>
  <figcaption>对 LocalStorage 数据 加密</figcaption>
</figure>

### call this custom hooks

在其他的组件中使用这个**custom hooks**

```javascript
function Index(props) {
  // ...
  const ITEMSETLIST = useObtainFinanceItemSet();
  // ...

  useEffect(() => {
    // ...
  }, [counter]);

  return (
    <>
      <Select
        style={{ width: 800 }}
        placeholder="Please Select Item"
        mode="multiple"
        allowClear
        showSearch
        onChange={handleSelect}
      >
        {ITEMSETLIST.map(({ id, itemName }) => (
          <Option value={itemName} key={id}>
            {itemName}
          </Option>
        ))}
      </Select>
    </>
  );
}
```
