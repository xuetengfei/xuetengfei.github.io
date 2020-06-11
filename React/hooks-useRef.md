# useRef 保存引用值

useRef 跟 createRef 类似，都可以用来生成对 DOM 对象的引用。

```javascript
import React, { useState, useRef, Component } from 'react';
import { Button } from '../../components/Button/index';
import { tips } from '../../_public/debug';
import styles from './useRef.less';

export default function () {
  let [name, setName] = useState('XueTengfei');
  let nameRef = useRef(null);
  return (
    <div className={styles.normal}>
      <p>{name}</p>
      <input ref={nameRef} type="text" />
      <br />
      <br />
      <Button onClick={() => setName(nameRef.current.value)}>Send</Button>
    </div>
  );
}
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/useRef-1558248961.gif'/>

---

[有类似实例变量的东西吗？](https://zh-hans.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables)

useRef() Hook 不仅可以用于 DOM refs。「ref」 对象是一个 current 属性可变且可以容纳任意值的通用容器，类似于一个 class 的实例属性。

你可以在 useEffect 内部对其进行写入:

```javascript
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
```

## 记录 react 渲染次数

```javascript
import { useRef } from 'react';

export const useRenderTimes = () => {
  const times = useRef(0);
  times.current += 1;
  return times.current;
};
```

<iframe
     src="https://codesandbox.io/embed/hit-react-render-count-sciis?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="hit-react-render-count"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

---

1. [xuetengfeiumi -demo 页面](http://106.12.98.175/#/useRef)
