?> render prop: 是指一种在 React 组件之间使用一个值为函数的 prop 在 React 组件间
共享代码的简单技术。带有 render prop 的组件带有一个返回一个 React 元素的函数并调
用该函数而不是实现自己的渲染逻辑。

```javascript
import React, { PureComponent } from 'react';

export default class Origanizational extends PureComponent {
  render() {
    return (
      <SearchTree
        onSelect={this.getSelectedTreeKey}
        tree={tree}
        dataList={dataList}
        goalId={goalId}
        provincecity={handleProviceAndCity}
      />
    );
  }
}
```

分析一下 SearchTree 组件.这个组件有很多自定义的 props,诸
如`onSelect,tree,dataList`等. 工作中,我们使用自定义 props 大多数传递的都是字符串
、数字、对象等，传递的其实是数据，我们能不能传递函数、组件呢？

## render props

注: `render`这个名字是自定义的,你也可以起名叫 render1、render2 等

#### 1. 传递组件

在 props 中传递组件,代码如下

```javascript
import React from 'react';

const Bar = () => <p>我是Bar组件</p>;
const Foo = ({ title, component }) => (
  <>
    <p>{title}</p>
    {component()}
  </>
);

export default class App extends React.Component {
  render() {
    return (
      <>
        <Foo title="这是一个示例组件" component={() => <Bar />} />
      </>
    );
  }
}
```

渲染结果如下

```html
<p>这是一个示例组件</p>
<p>我是Bar组件</p>
```

#### 2. 传递函数

在 props 中传递函数,代码如下

```javascript
import React from 'react';

const Bar = ({ title }) => <p>{title}</p>;

class Foo extends React.Component {
  state = { title: '我是一个state的属性' };
  render() {
    const { render } = this.props;
    const { title } = this.state;

    return <>{render(title)}</>;
  }
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h2>这是一个示例组件</h2>
        <Foo render={title => <Bar title={title} />} />
      </div>
    );
  }
}
```

渲染结果如下

```html
<div>
  <h2>这是一个示例组件</h2>
  <p>我是一个state的属性</p>
</div>
```

在(传递函数)例子中，给`Foo 组件`传递了一个 `render` 参数它是一个函数这个函数返回
一个 `Bar 组件`，这个函数接受一个参数 `title` 他来自于 `Foo 组件`调用时传递并且
我们又将`title 属性`传递给了 `Bar 组件`。经过上述的调用过程我们的 `Bar 组件`就可
以共享到 `Foo 组件内部的 state 属性`。

#### 3. 通过 children 传递

在(传递函数)例子中,这个 render 要写在标签内部,如果是个复杂函数,必然会给书写和阅
读造成困难,我们可以换个写法,使用 react 本身的 `children props`

```javascript
// 书写和阅读都困难

<Foo render={title => <Bar title={title} />} />
```

首先,回顾一下 children props

```javascript
const Title = (props) => <h1>{props.children}</h1>

<Title>Higher-Order Components</Title>
// => <h1>Higher-Order Components</h1>
```

改造一下,我们之前的代码.

```javascript
import React from 'react';

const Bar = ({ title }) => <p>{title}</p>;

class Foo extends React.Component {
  state = { title: '我是一个state的属性' };
  render() {
    const { children } = this.props;
    const { title } = this.state;
    return <>{children(title)}</>;
  }
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h2>这是一个示例组件</h2>
        <Foo>{titleText => <Bar title={titleText} />}</Foo>
      </div>
    );
  }
}
```

只是写法略微有些变法，实际上都是传递一个函数。

```javascript
<Foo>{titleText => <Bar title={titleText} />}</Foo>
```

### 注意事项:性能优化

```javascript
render() {
    return (
      <div>
        <h2>这是一个示例组件</h2>
        <Foo>{titleText => <Bar title={titleText} />}</Foo>
      </div>
    );
  }
```

当我们的 Foo 组件继承于 React.PureComponent 的时候，Foo 组件中 render props 是一
个函数，所以在每次渲染的时候 render prop 将会是一个新的值，那么每次将会重新渲染
Bar 组件,对于 React.PureComponent 有很大的性能问题.

### 正确的书写方式

?> 正确的做法应该是在组件内部创建一个函数用于显示组件

```javascript
import React from 'react';

const Bar = ({ title }) => <p>{title}</p>;

class Foo extends React.Component {
  state = { title: '我是一个state的属性' };
  render() {
    const { render } = this.props;
    const { title } = this.state;
    return <div>{render(title)}</div>;
  }
}

export default class App extends React.Component {
  // 单独创建一个渲染函数
  renderBar = titleText => {
    return <Bar title={titleText} />;
  };

  render() {
    return (
      <div>
        <h2>这是一个示例组件</h2>
        <Foo render={this.renderBar} />
      </div>
    );
  }
}
```

<!-- 1. [Render Props - React](https://react.docschina.org/docs/render-props.html)
2. [[译]使用 Render props 吧！](https://juejin.im/post/5a3087746fb9a0450c4963a5) -->
