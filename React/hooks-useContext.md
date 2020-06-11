# useContext

### ctx.js

```javascript
import { createContext } from 'react';

export const Ctx = createContext(null);
export const CtxProvider = Ctx.Provider;

console.log(CtxProvider);
```

### App.js

```javascript
import React, { useState } from 'react';
import './styles.css';
import { CtxProvider } from './ctx';
import Children from './children';

export default function App() {
  const [weather, setWeather] = useState('🌞');

  return (
    <div className="App">
      <CtxProvider value={[weather, setWeather]}>
        <Children />
      </CtxProvider>
    </div>
  );
}
```

### Children.js

```javascript
import React, { useContext } from 'react';
import { Ctx } from './ctx';

const weatherList = ['🔆', '🌞', '⛅', '🌦️', '🔆', '🌤️', '🌈', '🌨️', '🌩️'];

export default function App() {
  const [weatherObj, setterFn] = useContext(Ctx);

  const onClick = () => {
    setterFn(weatherList[Math.floor(Math.random() * weatherList.length)]);
  };
  return (
    <div>
      <div className="weather"> {weatherObj}</div>
      <button onClick={onClick}>click</button>
      <p>useContext value is: {JSON.stringify(weatherObj, null, 2)}</p>
    </div>
  );
}
```

---

<iframe
     src="https://codesandbox.io/embed/beautiful-feather-ebox0?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="useContent-ctx"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

<!-- <iframe
     src="https://codesandbox.io/embed/nostalgic-beaver-2j68o?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="nostalgic-beaver-2j68o"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe> -->

---

1. [How to Use the useContext Hook in React - 制作 music player ](https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react)
