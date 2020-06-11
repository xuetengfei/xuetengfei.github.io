# 惰性初始化 State

```javascript
const [thing, setThing] = useState(initialState);
```

> initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。  
> 也就是说，useState( ) 函数把 initialState 赋值给 thing 这个过程，只会在第一次渲染中发生。

如果初始 state 需要通过复杂计算获得，则可以传入一个函数，比如叫做 someExpensiveComputation 函数，在函数中计算并返回初始的 state，此函数（someExpensiveComputation）只在`初始渲染时`被调用：

```javascript
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

假设 initialState 数值是父组件 props 传递过来的，即

```javascript
const { initialState } = props;
const [thing, setThing] = useState(initialState);
```

> 情况是这样的: `仅在第一次组件渲染时` useState( ) 函数被调用了，使得 thing 等于 initialState。当 props 更改时，initialState 随之也改变了，但是在后续多轮渲染中，`thing 不作更新`，因为，在后续多轮渲染中 useState( ) 函数没有再被调用。如果想再后续多轮渲染中，及时更新 thing，需要主动调用 setThing( ) 函数去更新 thing 值。这个 setThing( ) 函数调用过程一般写在 useEffect 中。

## 情景重新

> 坑: props 改变了，但是 useState 没有重置 variable。原因: 如上所述。

父组件中有一组天气列表数据，被渲染为一组按钮。点击按钮后，会打开一个 Modal 弹窗组件，并且把对应的天气数据对象传递给 Modal 组件。
Modal 组件里有一个受控组件 Input,接收 props 传值后渲染到 Input 的 value 字段。

```javascript
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../../components/Button';
import Subcomp from './subcomp';

// 天气数据
const List = [
  {
    date: '2019-10-7',
    weather: 'A Sunny day',
  },
  {
    date: '2019-10-8',
    weather: 'A Rain day',
  },
  {
    date: '2019-10-9',
    weather: 'A Cloudy day',
  },
];

export default function() {
  const [weather, setWeather] = useState(List[0].weather);
  const [visible, setVisible] = useState(false);

  const handleChangeWeather = date => {
    setWeather(List.find(a => a.date === date).weather);
    setVisible(true);
  };

  const config = {
    weather,
    visible,
    Close: () => setVisible(false),
  };

  return (
    <>
      <h3>Weather is: {weather}</h3>
      {List.map(a => (
        <Button key={a.date} onClick={() => handleChangeWeather(a.date)}>
          {a.weather}
        </Button>
      ))}
      <Subcomp {...config} />
    </>
  );
}
```

#### 初始化，父组件 UI 渲染如下

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/lazy-useState-init-1565525873.png'/>

## 子组件: Modal

在 Modal 组件中，使用了名为 `useInput` 的自定义 hook ，来给 Input 组件赋予 value 数值和 onChange 函数，Input 开始渲染。

```javascript
import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';

// Custom hook
const useInput = initialState => {
  const [value, setValue] = useState(initialState);
  return {
    value,
    onChange: event => {
      setValue(event.target.value);
    },
  };
};

export default function Index(props) {
  const { visible, weather, Close } = props;
  const WeatherInput = useInput(weather);
  return (
    <Modal visible={visible} onOk={Close} onCancel={Close}>
      <h5>{JSON.stringify(props, null, 2)}</h5>
      <Input {...WeatherInput} />
    </Modal>
  );
}
```

#### 问题来了

当第一次点击 Button(无论点击哪一个 Button)时候，UI 渲染正常。比如，我点击了 Summy Day Button，显示如下，数值对的上，没毛病。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/useInput-4-1565524692.png'/>

当我关闭 Modal 弹窗后，换一个按钮点击，这次我点击了 Rain Day Button，问题出现了。Input 不是期望显示的 A Rain day，还是上一轮渲染的 UI 结果，数值没有对上。
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/useInput-3-1565524692.png'/>

> 原因: 在第一轮渲染之后的后续渲染过程中，useState( ) 函数没有被调用，所以，即使 props 发生了改变，但是 useInput 里面的 value 并没有发生改变。解决办法:调用 useInput 里面的 setValue( )函数，主动更新 value 数值。

修改后的 useInput 函数如下，可以正常的渲染工作

```javascript
const useInput = initialState => {
  const [value, setValue] = useState(null);

  // ========= useEffect 中主动更改 value =========
  useEffect(() => {
    setValue(initialState);
  }, [initialState]);
  // =========

  return {
    value,
    onChange: event => {
      setValue(event.target.value);
    },
  };
};
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/useInput-2-1565513973.png'/>
