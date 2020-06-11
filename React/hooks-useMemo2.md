# useMemo 记忆组件: Returns a value

如果必须处理大量数据、复杂计算、耗时计算，`useMemo`是一个完美的 hook，因为它将在第一次渲染时完成一次工作，然后在其他每次渲染时返回缓存版本。

?> useMemo 用于避免组件内部不必要的计算

```javascript
/*
 =============  核心概念 ==============
 */
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  );
}
// 当 `a/b` 改变时，`child1/child2` 才会重新渲染。
// 只有在第二个参数数组的值发生变化时，才会触发子组件的更新。
```

## without useMemo

```javascript
import React, { useState, useEffect, useMemo } from 'react';
import styles from './useCallback.css';

function Display(props) {
  console.log('---- render : test for useMemo ---');
  return (
    <>
      <p style={props.style}>I AM Display Component</p>
    </>
  );
}

export default function() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setI(i + 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });
  const fontSizeStyle = { fontSize: '20px' };
  return (
    <div className={styles.normal}>
      <h4>{i}</h4>
      <hr />
      <Display style={fontSizeStyle} />
    </div>
  );
}
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/usememo-1-1558670651.jpg'/>

分析:定时器每秒钟都去修改组件的 state,会导致 re-render，那么就会递归的 render 所有的子组件。
`Display Component`的 console 可以佐证。

## with useMemo

```javascript
import React, { useState, useEffect, useMemo } from 'react';
import styles from './useCallback.css';

function Display(props) {
  console.log('---- render : test for useMemo ---');
  return (
    <>
      <p style={props.style}>I AM Display Component</p>
    </>
  );
}

export default function() {
  const [i, setI] = useState(0);
  // "ticks" to re-render the whole App
  useEffect(() => {
    const timer = setTimeout(() => {
      setI(i + 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });
  const fontSizeStyle = { fontSize: '20px' };
  const DisplayComponent = useMemo(() => <Display style={fontSizeStyle} />, []);
  return (
    <div className={styles.normal}>
      <h4>{i}</h4>
      <hr />
      {DisplayComponent}
    </div>
  );
}
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/usememo-2-1558670651.jpg'/>

观察 `Display Component` 的 console ，只打印出了一次。

1. [xuetengfeiumi demo 页面](http://106.12.98.175/#/useMemo)
1. [xuetengfeiumi demo 页面](http://106.12.98.175/#/useCallback)
