# 强大的 custom Hooks

Custom Hooks 自定义 Hook 是一个 JavaScript 函数，其名称以“ use” 开头，可以调用其
他 Hook。

与 React 组件不同的是，自定义 Hook 不需要具有特殊的标识。可以自由的决定它的参数
是什么，以及它应该返回什么（如果需要的话）。换句话说，它就像一个正常的函数。但是
它的名字应该始终以 use 开头，这样可以一眼看 Custom Hooks。

在两个组件中使用相同的 Hook**不会共享 state**。自定义 Hook 是一种重用状态逻辑的
机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state
和副作用都是完全隔离的。

## 1. useMousePosition Hook

```javascript
import React, { useState, useEffect } from 'react';

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const setFromEvent = e => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', setFromEvent);
    return () => {
      window.removeEventListener('mousemove', setFromEvent);
    };
  }, []);

  return position;
};
```

[useMousePosition Hook](https://codeburst.io/create-a-usemouseposition-hook-with-useeffect-and-usestate-in-react-4d5a14578845)

## 2. useEventListener

```javascript
import React, { useState, useEffect, useRef } from 'react';
import styles from './hooksUseEventListener.less';

export default function App() {
  const [coords, setCoords] = useState([0, 0]);
  // 利用useCallback来处理回调,这里依赖将不会发生改变
  const handler = useCallback(
    ({ clientX, clientY }) => {
      // 更新坐标
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords],
  );

  // 使用自定义的hook添加事件
  useEventListener('mousemove', handler);

  return (
    <div className={styles.normal}>
      <h1>
        The mouse position is
        <span className={styles.color}>
          ({coords[0]}, {coords[1]})
        </span>
      </h1>
    </div>
  );
}
```

```javascript
// custom useState:  useEventListener
function useEventListener(eventName, handler, element = global) {
  const savedHandler = useRef();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      const eventListener = event => savedHandler.current(event);
      element.addEventListener(eventName, eventListener);
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element], // Re-run if eventName or element changes
  );
}
```

[xuetengfeiumi -- demo](http://106.12.98.175/#/hooksUseEventListener)

## 3. useFormInput

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

export default function () {
  const nameObj = useFormInput('xue');
  return (
    <>
      <h3>Input:{nameObj.value}</h3>
      <input className="card w-100" type="text" {...nameObj} />
    </>
  );
}
```

[xuetengfeiumi -- demo](http://106.12.98.175/#/useEffect)

## 4. useWidth

```javascript
function useWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  return width;
}

export default function () {
  const [count, setCount] = useState(0);
  const width = useWidth();
  return (
    <>
      <h3>window width is: {width}</h3>
    </>
  );
}
```

[xuetengfeiumi -- demo](http://106.12.98.175/#/useEffect)

## 5. useModal

不管你做什么样的前端项目，Modal 组件肯定会使用到。

目前 React 的组件库，比较流行的应该是阿里的 ant.design 了，在使用这个的时候，是
不是经常会写很多重复的逻辑在各个组件里面呢？要么就是自己实现一个高阶组件来抽象一
层，让其他组件可以复用。

```javascript
export const useModal = (
  initTitle: string,
  initContent: string | React.ReactElement,
) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(initTitle);
  const [content, setContent] = useState(initContent);
  const CustomModal = () => {
    return (
      <Modal visible={visible} title={title} closable={false} footer={null}>
        {content}
      </Modal>
    );
  };
  const show = (content?: string | React.ReactElement) => {
    content && setContent(content);
    setVisible(true);
  };
  const hide = (delay?: number) => {
    if (delay) {
      setTimeout(() => setVisible(false), delay);
    } else {
      setVisible(false);
    }
  };
  return {
    show,
    hide,
    CustomModal,
    setTitle,
    setContent,
  };
};
```

使用：

```javascript
const {hide, show, CustomModal} = useModal('系统提示',  '正在初始化...');

render() {
    <div><CustomModal /></div>
}
```

在上面的代码中，首先使用了 useState 定义了 3 个 state 属性，这里示例中就 3 个，
如果你需要更多的自定义内容，可以自己再扩展。useState 方法给定一个初始化的属性值
，返回一个属性变量和设置该属性的方法。以 visible 为例，这个属性用来控制 Modal 的
隐藏和显示。在使用 useState 方法返回的 setVisible 的时候，组件状态会自动更新，然
后触发重新渲染，是不是跟 React 的 Class 组件的 setState 有点类似?

在自定义的 Modal 中，返回了 show，hide 方法，setTitle，setContent 方法，以及一个
CustomModal 组件，这样外部在使用的时候就可以直接像上面的使用代码一样，放到
render 中即可。

在需要修改 title 或者修改内容的时候，调用 setTitle 和 setContent 修改 modal 中的
内容，注意这里的 setContent 不止可以传入 String，还可以传入一个 ReactElement，所
有里面的你可以传一个 Form 进去，实现弹出框形式的表单组件。

## usePrevious

```js
import { useEffect, useRef } from 'react';

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// Usage
export function MyComponent(props) {
  const { name } = props;
  const previousName = usePrevious(name);

  if (name != previousName) {
    // Do something
  }
}
```

<!--

useHooks~小窍门
https://zhuanlan.zhihu.com/p/66170210
 -->
