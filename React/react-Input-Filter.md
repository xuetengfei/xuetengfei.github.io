<iframe
     src="https://codesandbox.io/embed/keen-voice-u4c3l?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="React-Input-Filter"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

```javascript
import React, { useState } from 'react';
import './styles.css';

const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

export default function App() {
  const [value, setValue] = useState('');

  const onChange = (filertType, e) => {
    const v = e.target.value;
    console.log(v);
    if (v === '') {
      setValue('');
      return;
    }
    if (filertType.test(v)) {
      setValue(v);
    }
  };

  let reg = {
    // 整数
    Integer: /^-?\d*$/,
    Integer2: /^([1-9]{1}\d*)\.{0,1}\d{0,2}$/,
    // 正整数
    PositiveInteger: /^\d*$/,
    // Float (use . or , as decimal separator)
    Float: /^-?\d*[.,]?\d*$/,
    // at most two decimal places
    Float2: /^-?\d*[.,]?\d{0,2}$/,
    // A-Z only
    AZ: /^[a-z]*$/i,
    Hexadecimal: /^[0-9a-f]*$/i,
  };

  const handleInput = curry(onChange)(reg.Integer2);

  return (
    <div className="App">
      <h1>React-Input-Filter</h1>
      <input value={value} type="text" onChange={handleInput} />
    </div>
  );
}
```

---

1. [Allow only numbers in Input in React - DEV Community 👩‍💻👨‍💻](https://dev.to/anilsingh/allow-only-numbers-in-input-in-react-2m71)
2. [Input filter showcase - JSFiddle - Code Playground](https://jsfiddle.net/emkey08/zgvtjc51)
