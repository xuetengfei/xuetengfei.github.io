css-in-js 有比较多的实现方式，比如 styled-components、classnames 等。比较一下。

## 1. styled-components

```javascript
// component.js
import React from 'react';
import styled from 'styled-components';
const Heading = styled.h1`
  color: gray;
  font-size: 1.5em;
`;
const Paragraph = styled.p`
  font-size: 1.1em;
`;
const Article = () => {
  return (
    <div>
      <Heading>Heading</Heading>
      <Paragraph>Article's text</Paragraph>
    </div>
  );
};
```

```javascript
const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${props =>
    props.primary &&
    css`
      background: white;
      color: palevioletred;
    `}
`;
```

对于这种写法，我觉得在完全的 UI 组件封装中可以使用，业务组件中这样写实在是太啰嗦了，不喜欢。

### classnames

```javascript
var classNames = require('classnames');

class Button extends React.Component {
  // ...
  render() {
    var btnClass = classNames({
      btn: true,
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed && this.state.isHovered,
    });
    return <button className={btnClass}>{this.props.label}</button>;
  }
}
```

蛮好用的。因为是它的功能是`joining classNames together`, 前提是都要书写好 classname ，对于`行内样式`就无济于事。因为有的时候，我不需要去起一个 css 名字（classname），只是简单的写到行内可以了。

## 我的写法

```javascript
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/dedupe';

// 使用 css-module
import css from './index.module.scss';

export default function ClassNamesComponents() {
  const [condition, setCondition] = useState(false);

  // 行内样式的判断
  const inner = {
    color: condition ? 'aqua' : 'bisque',
    textAlign: condition && 'center',
  };

  const joinedStyle = classNames(css.wrap, {
    ThemeColor: condition, // ThemeColor 是全局引入的样式，在 根index.js 中就导入了
  });

  useEffect(() => {
    setTimeout(() => {
      setCondition(true);
    }, 3000);
    return () => {};
  }, []);

  return (
    <div className="c">
      <div className={joinedStyle} style={inner}>
        <section>1</section>
        <section>2</section>
        <section>3</section>
      </div>
    </div>
  );
}
```

```html
<!-- before -->

<div class="classnames_wrap__2MGkG" style="color: bisque;">
  <section>1</section>
  <section>2</section>
  <section>3</section>
</div>

<!-- after -->

<div class="classnames_wrap__2MGkG ThemeColor" style="color: aqua; text-align: center;">
  <section>1</section>
  <section>2</section>
  <section>3</section>
</div>
```

---

1. [styled-components](https://www.styled-components.com/)
2. [classnames](https://github.com/JedWatson/classnames)
3. [CSS in JS in real-life – Medium](https://medium.com/warsawjs/css-in-js-in-real-life-e0b50bbbd740)
