Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。

在一个典型的 React 应用中，数据是通过 props 属性由上向下（由父及子）的进行传递的，但这对于某些类型的属性而言是极其繁琐的（例如 UI 主题），这是应用程序中许多组件都所需要的。 Context 提供了一种在组件之间共享此类值的方式，而不必通过组件树的每个层级显式地传递 props

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/blm-redux-context.jpg"   width="700px">

> 之前版本的 Context API,以后会废弃

```
─ grid
  ├── index.js
  └── sub.js
```

### index.js

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import Sub from './sub';

export default class Grid extends Component {
  getChildContext() {
    return { color: 'purple' };
  }
  render() {
    return (
      <div className="c">
        <Sub />
      </div>
    );
  }
}

Grid.propTypes = {};

Grid.childContextTypes = {
  color: PropTypes.string,
};
```

### sub.js

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class Sub extends Component {
  render() {
    return (
      <div className="row">
        <div className="card col">
          <h4 style={{ color: this.context.color }}>
            Card cololr is {this.context.color}
          </h4>
          <button className="btn">Okay</button>
          <button className="btn primary">Cancel</button>
        </div>
      </div>
    );
  }
}

Sub.contextTypes = {
  color: PropTypes.string,
};
```

<figure>
  <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/react-context-api-1.jpg'/>
  <figcaption>react-context-api</figcaption>
</figure>

> 最新版本的 createContext API

### App.js

```javascript
import React, { Component } from 'react';

const ThemeContext = React.createContext('light');

function Button(props) {
  console.log('Button props: ', props); // {color: "red", speak: "zh"}
  return <p style={{ color: props.color }}>Me speak {props.speak}</p>;
}

function ThemedButton(props) {
  console.log('ThemedButton props: ', props); // {}
  return (
    <ThemeContext.Consumer>
      {contextValue => (
        <Button
          {...props}
          color={contextValue.theme}
          speak={contextValue.language}
        />
      )}
    </ThemeContext.Consumer>
  );
}

class App extends Component {
  render() {
    return (
      <ThemeContext.Provider value={{ theme: 'red', language: 'zh' }}>
        <ThemedButton />
      </ThemeContext.Provider>
    );
  }
}

export default App;
```

使用最新的 React Context API 需要三个关键步骤：

1、将初始状态传递给 React.createContext。这个方法会返回一个带有 Provider 和 Consumer 的对象。
2、使用 Provider 组件包裹在组件树的最外层，并接收一个 value 属性。value 属性可以是任何值。
3、使用 Consumer 组件，在组件树中 Provider 组件内部的任何地方都能获取到状态的子集。

如你所见，所涉及的概念实际上与 Redux 没有什么不同。事实上，甚至 Redux 也在其公共 API 的底层使用了 React Context API。然而，直到最近，Context API 才达到了足够成熟的水平。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/new-createContext-2019-01-20.jpg' width='600px'/>

---

1. [Context - React](https://react.docschina.org/docs/context.html#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8-context)
2. [React Context API: 轻松管理状态 · Issue #5 · OFED/translation](https://github.com/OFED/translation/issues/5)
