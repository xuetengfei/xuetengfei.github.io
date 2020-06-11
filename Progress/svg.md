# react-icon-components

### svg 简介

SVG 是 XML 语言的一种形式，可以用来绘制矢量图形。SVG 可以通过定义必要的线和形状来创建一个图形，也可以修改已有的位图，或者将这两种方式结合起来创建图形。图形和其组成部分可以变形，可以合成，还可以通过滤镜完全改变外观。

HTML 提供了定义标题、段落、表格等等内容的元素。与此类似，SVG 也提供了一些元素，用于定义圆形、矩形、简单或复杂的曲线，以及其他形状 react

#### Icon 组件文件组织

```javascript
├── components
│   ├── Icons
│   │   ├── index.js
│   │   └── map.js
```

#### components/Icons/map.js

```javascript
const i = new Map();

i.set(
  'settingICON',
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </>,
);

i.set(
  'loading',
  <>
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </>,
);
export { i };
```

#### components/Icons/index.js

```javascript
import React from 'react';
import { i } from './map';

const baseSvgConfig = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeLinecap: 'square',
  strokeLinejoin: 'bevel',
};
function Icon(props) {
  const { iconName, ...rest } = props;
  const useConfig = {
    width: rest.width || '50',
    height: rest.height || rest.width || '50',
    stroke: rest.color || '#000',
    strokeWidth: rest.lineWidth || '1',
  };
  return (
    <svg {...baseSvgConfig} {...useConfig}>
      {i.get(iconName)}
    </svg>
  );
}

export { Icon };
```

#### 其他组件中使用

```javascript
import styles from './icon.css';
import { Icon } from '../../components/Icons/index';

export default function() {
  return (
    <div className={styles.normal}>
      <Icon iconName="settingICON" width="10" />
      <Icon iconName="settingICON" width="20" />
      <Icon iconName="settingICON" width="30" />
      <Icon iconName="settingICON" width="40" />
      <Icon iconName="settingICON" width="50" />
      <Icon iconName="settingICON" color="#00897B" />
      <Icon iconName="settingICON" color="#00897B" width="100" height="100" />
      <Icon iconName="loading" width="30" lineWidth="2" />
      <Icon iconName="loading" color="#00897B" width="100" height="100" />
      <Icon iconName="loading" color="#00897B" width="100" height="100" lineWidth="2" />
    </div>
  );
}
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/svg-icon-1557726893.jpg'/>

---

1.  [SVG - MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Introduction)
2.  [ICON - SVG ](https://iconsvg.xyz/)
