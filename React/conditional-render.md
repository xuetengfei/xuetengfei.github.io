# 条件渲染

## 1.三元表达式 (ternary operation)

For instance, imagine you have a toggle to **switch** between two modes, edit and view, in your component. The derived condition is a simple boolean. You can use the boolean to decide which element you want to return.

```javascript
function Item({ item, mode }) {
  const isEditMode = mode === 'EDIT';
  return (
    <div>
      {isEditMode ? <ItemEdit item={item} /> : <ItemView item={item} />}
    </div>
  );
}
```

语言太多，可以加圆括号.

```javascript
// ...
return (
  <div>{isEditMode ? <ItemEdit item={item} /> : <ItemView item={item} />}</div>
);
//...
```

## 2.Use && to return null

If you want to render `either an element or nothing`.You can do it in JSX with an if statement or ternary operation.But there is an alternative way that omits the necessity to return null.The logical `&&` operator helps you to make conditions that would return null more concise(简洁).

```javascript
true && 'Hello World' ==> 'Hello World'
false && 'Hello World' ==> false.
```

```javascript
function LoadingIndicator({ isLoading }) {
  return <div>{isLoading && <p>Loading...</p>}</div>;
}
```

## 3.switch case operator in React

```javascript
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

另一种方法是内嵌开关箱，因此，您需要一个自动调用 JavaScript 函数。.

```javascript
function Notification({ text, state }) {
  return (
    <div>
      {(() => {
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
      })()}
    </div>
  );
}
```

## 枚举:利用对象的键值对

```javascript
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

## 传参枚举(很实用)

```javascript
import { Info, Warning, Error } from "./a"

const SOME_OBJ = (text) => ({
    info: (<Info text={text} />),
    warning: (<Warning text={text} />),
    error: (<Error text={text} />),
    bar：null
})

export const Notification1 = ({ text, state }) => {
    return (
        <div>
            {SOME_OBJ(text)[state]}
        </div>
    );
}
```

## 处理多级判断

初级

```javascript
function List({ list }) {
    const isNull = !list;
    const isEmpty = !isNull && !list.length;

    return (
        <div>
            { isNull
                ? null
                : ( isEmpty
                    ? <p>Sorry, the list is empty.</p>
                    : <div>{list.map(item => <ListItem item={item} />)}</div>
                )
            }
        </div>
    );
}

// Usage

<List list={null} />
// <div></div>

<List list={[]} />
// <div><p>Sorry, the list is empty.</p></div>

<List list={['a', 'b', 'c']} />
// <div><div>a</div><div>b</div><div>c</div><div>
```

中级

```javascript
function List({ list }) {
  const isList = list && list.length;

  return (
    <div>
      {isList ? (
        <div>
          {list.map(item => (
            <ListItem item={item} />
          ))}
        </div>
      ) : (
        <NoList isNull={!list} isEmpty={list && !list.length} />
      )}
    </div>
  );
}

function NoList({ isNull, isEmpty }) {
  return !isNull && isEmpty && <p>Sorry, the list is empty.</p>;
}
```

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2018-07-28_23-28-05.jpg"  data-action="zoom" style="margin:0 auto;" >

在该示例中，列表组件可以专注于呈现列表。它不必担心加载状态。最终，您可以添加更多的 HOCS 来屏蔽多个条件呈现边缘情况。
一个 HOC 可以选择一个或多个条件渲染。甚至可以使用多个 HOC 来处理多个条件渲染。毕竟，一个特设屏蔽掉所有的噪音从您的组件。如果您想深入挖掘具有高阶组件的条件渲染，您应该阅读
https://www.robinwieruch.de/gentle-introduction-higher-order-components/

## 参考链接

1. [条件渲染 - React](https://react.docschina.org/docs/conditional-rendering.html)
1. [学习 React 之前你需要知道的的 JavaScript 基础知识 - 众成翻译](https://www.zcfy.cc/article/javascript-fundamentals-before-learning-react#)
1. [All the Conditional Renderings in React - RWieruch](https://www.robinwieruch.de/conditional-rendering-react/)
