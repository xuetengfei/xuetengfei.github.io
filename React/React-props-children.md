## What is ?

> this.props.children 也是一个普通的 Prop

每个组件都可以获取到 props.children。它包含组件的开始标签和结束标签之间的内容。
props.children 不仅能够像传递一个普通的 prop 那样去传递 children，还可以往 prop 里传递 JSX 代码。

```javascript
<Button children={<span>Click Me</span>} />

// 等价

<Button>
    <span>Click Me</span>
</Button>
```

### Demo:渲染一个 title 组件,封装 CSS 样式

```javascript
import React from 'react';
import React, { Component } from 'react';

const SectionTitle = props => {
  return <div className="redColor">{props.children}</div>;
};

export default class componentName extends Component {
  render() {
    return (
      <>
        <SectionTitle> Hello World ! </SectionTitle>
      </>
    );
  }
}
```

## Demo: 以命名卡槽来使用 Props

使用这些 “卡槽” 的 props 的例子 —— 以 3 个 props 调用一个名为 Layout 的组件：

```javascript
function Layout(props) {
  return (
    <div className="layout">
      <div className="top">{props.top}</div>
      <div className="left">{props.left}</div>
      <div className="center">{props.center}</div>
    </div>
  );
}

<Layout left={<Sidebar />} top={<NavBar />} center={<Content />} />;
```

Layout 组件内的代码可以变得十分复杂,无论 Layout 需要做什么，它的使用者只需要知道如何传递 left，top 以及 center 这三个 prop 就够了。

## Passing Data to props.children in React

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/props-children-1566821678.jpg'/>

上图中，整个页面是一个大的组件，叫做「 IndexPage 」。红框内存在的一个列表组件，叫做「 TableComp 」。「 IndexPage 」组件很复杂，是高度封装的组件,内部封装来，数据请求，业务逻辑等功能，在「 IndexPage 」中请求到数据后，那么，需要把数据「 dataSource 」传递给自己的子组件 「 TableComp 」。那么，问题就是:如何给 「 children 」传递「 dataSource 」数据。

```javascript
import React, { useState } from 'react';
// ...

export default function index() {
  // ...
  return (
    <IndexPage>
      <TableComp />
    </IndexPage>
  );
}
```

可以使用 `React.Children 、React.cloneElement API` 来解决上述问题。React.Children 是顶层 API 之一，为处理 this.props.children 这个封闭的数据结构提供了有用的工具。

```javascript
React.cloneElement(child, {
      someData: this.props.someData
      someState: this.state.someState
      someFunction: x => x
    });
```

```javascript
// IndexPage Component

import React, { useEffect } from 'react';
import Wrap from '@/components/BaseComp';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export function Index(props) {
  const {
    M: { dataSource }, //  数据源:dataSource
  } = props;

  // Fetch Data
  useEffect(() => {
    FetchData();
    return () => {};
  }, []);

  /* React.Children  React.cloneElement  */
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { dataSource }),
  );

  return (
    <PageHeaderWrapper>
      <Wrap>{childrenWithProps}</Wrap>
    </PageHeaderWrapper>
  );
}

const mapState = rootState => ({ M: rootState['module-name'] });
export default connect(mapState)(Index);
```

---

1. [React 术语词汇表 – React](https://zh-hans.reactjs.org/docs/glossary.html#propschildren)
2. [Passing Data to props.children in React - Better Programming - Medium](https://medium.com/better-programming/passing-data-to-props-children-in-react-5399baea0356)
