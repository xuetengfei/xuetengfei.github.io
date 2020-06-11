CSS Modules 功能很单纯，只加入了局部作用域 Scope 和模块依赖。它的规则少，同时又非常有用，可以保证某个组件的样式，不会影响到其他组件。

<figure>
  <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/css-module-in-one-pic.png' width='600px'/>
  <figcaption>css-module-in-one-pic</figcaption>
</figure>

## create-react-app 脚手架

使用 react，官方的 create-react-app 脚手架，其中有一个配置项 CSS Modules are turned on for files ending with the .module.css extension.[Adding a CSS Modules Stylesheet · Create React App](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet)。

```javascript
.
├── Dialog
│   ├── index.js
│   └── index.module.css
└── Loader
    ├── index.js
    └── loader.module.css
```

```javascript
import React, { Component } from 'react';
import Modal from 'react-modal';
// 关键
import style from './index.module.css';
// render 中写法如: className={style.xxx}

export default class Loader extends Component {
  state = {
    modalIsOpen: true,
  };
  handleBtnComfirm = () => {
    const { handleClose } = this.props;
    handleClose();
  };
  render() {
    const { isShow, text } = this.props;
    return (
      <>
        <Modal isOpen={isShow} className={style.Modal} overlayClassName={style.Overlay}>
          <div className={style.dialogText}>{text}</div>
          <div className={style.dialogBtn} onClick={this.handleBtnComfirm}>
            确定
          </div>
        </Modal>
      </>
    );
  }
}
```

```css
.Modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  outline: none;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
}

.Overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
```

效果如下。

![alt](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/css-modules-1.jpg)

## webpack css-loader 处理

```javascript
...
module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules"
      },
    ]
  }
...
```

上面代码中，关键的一行是 style-loader!css-loader?modules，它在 css-loader 后面加了一个查询参数 modules，表示打开 CSS Modules 功能。

---

## Compose 来组合样式

对于样式复用，CSS Modules 只提供了唯一的方式来处理：composes 组合

```javascript
// Button.css

.base { /* 所有通用的样式 */ }

.normal {
  composes: base;
  /* normal 其它样式 */
}

.disabled {
  composes: base;
  /* disabled 其它样式 */
}
```

```javascript
import styles from './Button.css';

`<button className=${styles.normal}>Submit</button>`;

<button class="button--base-abc53 button--normal-abc53"> Processing... </button>;
```

composes 还可以组合外部文件中的样式。

```javascript
/* settings.css */
.primary-color {
  color: #f40;
}

/* Button.css */
.base { /* 所有通用的样式 */ }

.primary {
  composes: base;
  composes: $primary-color from './settings.css';
  /* 其它样式 */
}
```
