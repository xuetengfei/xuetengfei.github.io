# useRef 保存引用值

> Syntax

```js
const refContainer = useRef(initialValue);
```

useRef 返回一个可变的 ref 对象，其 `.current`属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变，因为 **useRef 会在每次渲染时返回同一个 ref 对象**
当 ref 对象内容发生变化时，useRef 并不会通知你。**变更 .current 属性不会引发组件重新渲染** 。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。

> e.g. 访问 DOM

`React.createRef` 这种访问 DOM 的方式，useRef 也可以实现

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

> e.g. 保存 setInterval's ID

current 属性可变,且可以容纳任意值的通用容器,可以在 useEffect 内部对其进行改写.

```javascript
function Timer() {
  const intervalRef = useRef();
  useEffect(() => {
    const id = setInterval(() => {});
    intervalRef.current = id;

    return () => {
      clearInterval(intervalRef.current);
    };
  });
}
```

> e.g. 保存 prev-state

```js
function App() {
  const t = useRef(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    t.current = count;
  }); // ⚠️ 没有 deps arr

  const prevCount = t.current;
  return (
    <div>
      <p>currnetCount:{count}</p>
      <p>prevCount:{prevCount}</p>
      <button onClick={() => setCount(c => c + 1)}>click</button>
    </div>
  );
}
```

> e.g. 记录渲染次数

```js
const useRenderTimes = () => {
  const times = React.useRef(0);
  times.current += 1;
  return times.current;
};

export default function App() {
  const [count, setCount] = React.useState(0);
  const renderTime = useRenderTimes();

  return (
    <div>
      <h1>renderTime : {renderTime}</h1>
      <h1>count : {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>click</button>
    </div>
  );
}
```

<iframe
     src="https://codesandbox.io/embed/hit-react-render-count-41ddn?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="hit-react-render-count"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

> e.g. Using useState when no rerender is needed 在不需要重新运行程序时使用使用状态

```js
// Bad
// 这种写法，每个状态更改都将迫使该组件及其子组件重新渲染
function ClickButton(props) {
  const [count, setCount] = useState(0);
  const onClickCount = () => {
    setCount(c => c + 1);
  };
  const onClickRequest = () => {
    doSomething(count);
  };
  return (
    <div>
      <button onClick={onClickCount}>Counter</button>
      <button onClick={onClickRequest}>Submit</button>
    </div>
  );
}

// Good
// 使用 useRef 替代 useState。useRef.current 属性变更不会引发组件重新渲染
function ClickButton(props) {
  const count = useRef(0);
  const onClickCount = () => {
    count.current++;
  };
  const onClickRequest = () => {
    doSomething(count);
  };

  return (
    <div>
      <button onClick={onClickCount}>Counter</button>
      <button onClick={onClickRequest}>Submit</button>
    </div>
  );
}
```

---

1. [Hook API 索引 – React](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref)
