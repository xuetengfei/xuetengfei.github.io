[React Hooks: Countdown - CodeSandbox](https://codesandbox.io/s/react-hooks-countdown-daojishiqi-o41vu)

<iframe
     src="https://codesandbox.io/embed/react-hooks-countdown-daojishiqi-o41vu?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="React Hooks: Countdown (倒计时器)"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

```javascript
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const COUNTDOWN_SECONDS = 5;

// 倒计时器
function Countdown() {
  // 计时中标识
  const [timing, setTiming] = useState(false);
  // 当前秒数
  const [second, setSecond] = useState(COUNTDOWN_SECONDS);

  // 首次渲染和 timing 变化时触发 effect
  useEffect(() => {
    let interval;
    // 开始倒计时
    if (timing) {
      interval = setInterval(() => {
        setSecond(preSecond => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            // 重置秒数
            return COUNTDOWN_SECONDS;
          } else {
            return preSecond - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);

  return (
    <div className="container">
      <button disabled={timing} onClick={() => setTiming(true)}>
        {timing ? 'Timing ' + second : 'Go'}
      </button>
    </div>
  );
}
const rootElement = document.getElementById('root');
ReactDOM.render(<Countdown />, rootElement);
```

---

## 定时器

```javascript
import React, { useState, useEffect } from 'react';

export default function() {
  const [t, setT] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setT(new Date()), 1000);
    return () => {
      clearInterval(timer);
      console.log('timer componentWillUnmount');
    };
  }, []);

  return (
    <>
      <h1>Timer</h1>
      <h2>It is {t.toLocaleTimeString()}.</h2>
    </>
  );
}
```

```javascript
import React, { useState, useEffect } from 'react';

export default function() {
  const [t, setT] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setT(new Date()), 1000);
    return () => {
      clearInterval(timer);
      console.log('timer componentWillUnmount');
    };
  }, [t]);

  return (
    <>
      <h1>Timer</h1>
      <h2>It is {t.toLocaleTimeString()}.</h2>
    </>
  );
}
```
