# useState 保存组件状态

### useState Syntax

```javascript
const [thing, setThing] = useState(initialState);
```

返回一个 state，以及更新 state 的函数。在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同。setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。

```javascript
setState(newState);
```

在后续的重新渲染中，useState 返回的第一个值将始终是更新后最新的 state。

<iframe
     src="https://codesandbox.io/embed/usestate-syntax-78mbk?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="useState Syntax"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## Description

在每一次点击`button`都会调用`setCount,setTitle`两个函数，打开控制台看到只 render 了一次，因为`useState`也是会将一次循环中的 state 变化合并，然后一起更新。

同时在`FunctionComponent`中，useState 可以调用多次，但不意味着一定要这样写，当然，initialState 可以是数组、对象、字符串等。

### 函数式更新

如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 setState。该函数将接收先前的 state，并返回一个更新后的值。下面的计数器组件展示了 setState 的两种用法：

```javascript
function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      <h1>Count: {count}</h1>

      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(count + 1)}>+</button>
  );
}
```

值得注意的是 useState 不帮助处理状态，相较于 setState 非覆盖式更新状态，useState 覆盖式更新状态，需要开发者自己处理逻辑。

## useState pseudocode

```javascript
let stateList = [];
let setterList = [];
let cursor = 0;

const createSetter = index => {
  return function setterWithCursor(newVal) {
    stateList[index] = newVal;
  };
};

// pseudocode
function useState(initVal) {
  stateList.push(initVal); // push a value
  setterList.push(createSetter(cursor)); // push a setter fn

  const setter = setterList[cursor];
  const value = stateList[cursor];

  cursor++;
  return [value, setter];
}

const [firstName, setFirstName] = useState('Xue'); // cursor: 0
const [lastName, setLastName] = useState('Tengfei'); // cursor: 1

console.log('before stateList: ', stateList);
setFirstName('Xue_2');
console.log('after setterList: ', stateList);
// before stateList:  [ 'Xue', 'Tengfei' ]
// after setterList:  [ 'Xue_2', 'Tengfei' ]

console.log('setterList: ', setterList);
// setterList: [[(Function: setterWithCursor)], [(Function: setterWithCursor)]];
```

---

1. [demo](http://106.12.98.175/#/useEffect)
2. [Hook API 索引 – React](https://zh-hans.reactjs.org/docs/hooks-reference.html)
3. [React Hooks 原理](https://github.com/brickspert/blog/issues/26)
