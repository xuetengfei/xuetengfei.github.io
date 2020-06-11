一般来说, 在组件内写死(hard code)样式应该是要被避免的. 这些有可能被不同的 UI 组件分享的样式应该被分开放入对应的模块中.

```javascript
// 样式模块
export const white = '#fff';
export const black = '#111';
export const blue = '#07c';

export const colors = {
  white,
  black,
  blue,
};

export const space = [0, 8, 16, 32, 64];

const styles = {
  bold: 600,
  space,
  colors,
};
export default styles;
```

## Usage

```javascript
// button.jsx
import React from 'react';
import { bold, space, colors } from './styles';

const Button = ({ ...props }) => {
  const sx = {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: bold,
    textDecoration: 'none',
    display: 'inline-block',
    margin: 0,
    paddingTop: space[1],
    paddingBottom: space[1],
    paddingLeft: space[2],
    paddingRight: space[2],
    border: 0,
    color: colors.white,
    backgroundColor: colors.blue,
    WebkitAppearance: 'none',
    MozAppearance: 'none',
  };

  return <button {...props} style={sx} />;
};
```
