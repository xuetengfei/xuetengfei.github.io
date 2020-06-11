# React-Virtualized-List

一个项目有一个联系人列表，需要显示 5000 个联系人，使用无限滚动组件，直接渲染数组，意味着需要在屏幕上呈现 5000 个包含许多嵌套组件的复杂 DOM 元素。

当构建时候，渲染这么多的元素对于 DOM 是一个非常繁重的操作。 如果将所有 DOM 元素映射到的视图中，那么响应就会显示所有的 DOM 元素，这会影响的渲染性能。使用**虚拟列表**,解决了大多数与列表 DOM 和滚动相关的渲染和性能问题。

### 拿来主义

直接使用,第三方组件 [react-virtualized](https://github.com/bvaughn/react-virtualized)

### DIY

也可以自己写一个，原理其实很简单。

```javascript
import React, { useState } from 'react';

const CELLHEIGHT = 40;
const INNERHEIGHT = 400;
const List = Array.from({ length: 100 }, (_, i) => i);

const scrollArea = {
  backgroundColor: '#eee',
  overflowY: 'scroll',
};
const innerArea = {
  height: INNERHEIGHT,
  position: 'relative',
};

export default function App() {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / CELLHEIGHT);
  const endIndex = startIndex + INNERHEIGHT / CELLHEIGHT + 2;
  // 安全起见,多渲染一个，slice裁剪会少一个，这里也多算一个，所以就是 「 +2 」

  const onScroll = e => setScrollTop(e.currentTarget.scrollTop);
  const validList = List.slice(startIndex, endIndex).map(v => ({
    index: v,
    style: {
      position: 'absolute',
      top: `${v * CELLHEIGHT}px`,
      width: '100%',
      height: CELLHEIGHT,
      borderBottom: '1px solid #666',
    },
  }));

  const childrenListComp = validList.map(v => (
    <div style={v.style}>
      {v.index}-{JSON.stringify(v.style.top, null, 2)}
    </div>
  ));
  return (
    <>
      <h1>react-virtualized</h1>
      <div style={scrollArea} onScroll={onScroll}>
        <div style={innerArea}>{childrenListComp}</div>
      </div>
    </>
  );
}
```

<iframe
     src="https://codesandbox.io/embed/test-react-virtualized-f6l39?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="test-react-virtualized"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>
