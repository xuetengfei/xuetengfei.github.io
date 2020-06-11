?>branch / renderNothing

# 参考链接

1. [acdlite/recompose: A React utility belt for function components and higher-order components.](https://github.com/acdlite/recompose)
1. [recompose/API.md at master · acdlite/recompose](https://github.com/acdlite/recompose/blob/master/docs/API.md#branch)

---

# 一个简单的调试函数

在函数式编程中，很难在 chain 中调试中间变量。我们可以使用一个非常简单的函数。

```javascript
function tap(x) {
  console.log(x);
  return x;
}
```

# branch()

[branch()](https://github.com/acdlite/recompose/blob/master/docs/API.md#branch)

```javascript
branch(test, left, right);
```

这个 branch 可以接受三个参数，第一个是判断函数返回布尔值。如果是 true，返回 left 这个组件，否则返回 right 这个组件.可以理解为就是一个 if else。但是呢，right 组件是可选的，**如果没有的话，就返回被包装的组件**，这一句比较难理解。稍等一下讲解。

# renderNothing()

[renderNothing()](https://github.com/acdlite/recompose/blob/master/docs/API.md#rendernothing)
顾名思义，这个组件总返回 null。什么都不渲染

# 二者结合起来

```javascript
import { branch, renderNothing } from "recompose";
function tap(x) {
  console.log(x);
  return x;
}

const hideIFNoData = NoData => branch(tap(NoData), renderNothing);

const enhance = hideIFNoData(
  props => !(props.name && props.age && props.sexual)
);

const People = enhance(({ name, age, sexual }) => (
  <div>
    <div>{name}</div>
    <div>{age}</div>
    <div>{sexual}</div>
  </div>
));

export { People };
```

观察这句

```javascript
const hideIFNoData = NoData => branch(tap(NoData), renderNothing);
```

tap 函数打印出的是：

```javascript
ƒ (props) {
  return !(props.name && props.age && props.sexual);
}
```

这个就说明，NoData 这个参数是 branch 的第一个参数，用于判断的。renderNothing 是第二个参数，就是 left 参数。没有 right 参数。代码后面的`<div>{name}</div>`等等才是我们默认包装的组件。

组件传入 props 后进行 `props => !(props.name && props.age && props.sexual)`计算后**取反**。如果都满足的话，取反就是 false，则在 branch 这个高阶组件中，返回 right 组件。因为，这里没有 right 组件，那就是渲染默认的被包装的组件，即我们 enhance 里面写的组件。

整体来讲，多次封装产出的 People 组件必须传入至少三个 props 分别是`name age sexual`。三个 props 存在的话，才会正常的渲染出来，否则就不渲染。
