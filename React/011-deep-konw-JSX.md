## 点表示法

还可以使用 JSX 中的点表示法来引用 React 组件。可以方便地从一个模块中导出许多 React 组件。例如，有一个名为 MyComponents.DatePicker 的组件，可以直接在 JSX 中使用它：

```javascript
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  },
};

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

---

## 默认为 True

如果没有给属性传值，它默认为 true。因此下面两个 JSX 是等价的：

```javascript
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

一般情况下，不建议这样使用，因为它会与 ES6 对象简洁表示法 混淆。比如 `{foo}` 是 `{foo: foo}` 的简写，而不是 `{foo: true}`。这里能这样用，是因为它符合 HTML 的做法。

---

## props.children

可以在开始和结束标签之间放入一个字符串，则 `props.children` 就是那个字符串。这对于许多内置 HTML 元素很有用。例如：

```javascript
<MyComponent>Hello world!</MyComponent>
```

```javascript
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

export const ListOfTenThings = () => {
  return (
    <Repeat numTimes={10}>
      {index => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
};
```

```javascript
// This is item 0 in the list
// This is item 1 in the list
// This is item 2 in the list
// This is item 3 in the list
// This is item 4 in the list
// This is item 5 in the list
// This is item 6 in the list
// This is item 7 in the list
// This is item 8 in the list
// This is item 9 in the list
```

---

## 数组形式

React 组件也可以通过数组的形式返回多个元素：

```javascript
render() {
  // 不需要使用额外的元素包裹数组中的元素
  return [
    // 不要忘记 key :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```

---

[深入 JSX - React](https://react.docschina.org/docs/jsx-in-depth.html#%E7%82%B9%E8%A1%A8%E7%A4%BA%E6%B3%95)
