# 条件渲染

## 1.三元表达式

```js
const isEditMode = mode === 'EDIT';
// ...
return (
  <div>{isEditMode ? <ItemEdit item={item} /> : <ItemView item={item} />}</div>
);
//...
```

## 2.Use `&&`

```js
function LoadingIndicator({ isLoading }) {
  return <div>{isLoading && <p>Loading...</p>}</div>;
}
```

## 3.switch case

```js
function Notification({ text, state }) {
  switch (state) {
    case 'info':
      return <Info text={text} />;
    case 'warning':
      return <Warning text={text} />;
    case 'error':
      return <Error text={text} />;
    default:
      return null;
  }
}

Notification.propTypes = {
  text: React.PropTypes.string,
  state: React.PropTypes.oneOf(['info', 'warning', 'error']),
};
```

## 4.enum:利用对象

```js
function Notification({ text, state }) {
  return (
    <div>
      {
        {
          info: <Info text={text} />,
          warning: <Warning text={text} />,
          error: <Error text={text} />,
        }[state]
      }
    </div>
  );
}
```

## 4.enum:利用对象(传参)

```js
const CONFIG = text => ({
  info: <Info text={text} />,
  warning: <Warning text={text} />,
  error: <Error text={text} />,
  default: null,
});

export const Notification = ({ text, state }) => {
  const obj = CONFIG(text);
  const comp = obj[state] || obj[default] ;
  return <div>{comp}</div>;
};
```

## 处理多级判断

```js
// Higher-Order Component
function withLoadingIndicator(Component) {
  return function EnhancedComponent({ isLoading, ...props }) {
    if (!isLoading) {
      return <Component {...props} />;
    }

    return (
      <div>
        <p>Loading</p>
      </div>
    );
  };
}

const ListWithLoadingIndicator = withLoadingIndicator(List);

function App({ list, isLoading }) {
  return (
    <div>
      <h1>Hello Conditional Rendering</h1>

      <ListWithLoadingIndicator isLoading={isLoading} list={list} />
    </div>
  );
}
```

列表组件可以专注于呈现列表。它不必担心加载状态。可以添加更多的 HOCS 来屏蔽多个条
件呈现边缘情况。一个 HOC 可以选择一个或多个条件渲染。甚至可以使用多个 HOC 来处理
多个条件渲染。

## 参考链接

1. [条件渲染 - React](https://react.docschina.org/docs/conditional-rendering.html)
1. [All the Conditional Renderings in React - RWieruch](https://www.robinwieruch.de/conditional-rendering-react/)

<!--
https://www.robinwieruch.de/gentle-introduction-higher-order-components/
https://www.zcfy.cc/article/javascript-fundamentals-before-learning-react#
-->
