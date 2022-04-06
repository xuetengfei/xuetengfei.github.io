# 代码分离 code-splitting

随着业务的增长，代码量也会有增长的趋势。有时用户只是访问应用程序（或路由）的一部
分，但是却可能会加载了大量首次页面载入时不必要的组件，这会影响我们应用的初始加载
时间。

为了解决这个问题，需要分割我们的代码。

## 性能优化最适用的路由（按路由加载）

使用「React Router」来定义路由的代码结构一般是这样的：

```javascript
/* Import the components */
import Home from './containers/Home';
import Posts from './containers/Posts';
import NotFound from './containers/NotFound';

/* Use components to define routes */
export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/posts/:id" exact component={Posts} />
    <Route component={NotFound} />
  </Switch>
);
```

首先引入路由需要的组件，然后定义相关的路由，Switch 组件用于渲染与路径相匹配的路
由。

在文件顶部通过使用 import 静态引入了所有的组件，这意味着不管访问哪个路由，这些组
件都会被全部加载。通过「代码分离」想要实现的是在访问一个页面的时候只加载跟这个页
面匹配的组件。

## 创建 asyncComponent

```javascript
import React, { Component } from 'react';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }
    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({
        component: component,
      });
    }
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }
  return AsyncComponent;
}
```

asyncComponent 函数接受一个参数 importComponent，调用这个方法将动态引入给定的组
件。

在组件 componentDidMount 时，我们只需要调用传入的 importComponent 函数，并将动态
加载的组件保存在 AsyncComponent 组件的 state 中。

最后，在 render 方法里，我们需要判断下组件是否已经加载完成。如果组件还未加载成功
，最简单的处理方式是直接返回 null，但是为了给用户更好的体验，我们可以加一个组件
正在加载的反馈，比如可以渲染一个「loader」

## 使用 asyncComponent

```javascript
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { asyncComponent } from './asyncComponent';
import '@babel/polyfill';

const RouterList = [
  {
    path: '/create',
    name: 'create',
    component: asyncComponent(() => import('./views/create')),
  },
  {
    path: '/getItem',
    name: 'getItem',
    component: asyncComponent(() => import('./views/getItem')),
  },
];

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {RouterList.map(({ path, name, component }) => (
            <Route path={path} key={name} component={component} />
          ))}
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
```

## 对比编译文件

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/code-splitting-1-1556194218.jpg'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/code-splitting-2-1556194218.jpg'/>

## react-loadable

```javascript
yarn add react-loadable
```

然后使用它代替我们上面的 asyncComponent 方法

```javascript
const AsyncHome = Loadable({
  loader: () => import('./containers/Home'),
  loading: MyLoadingComponent,
});
```

AsyncHome 组件的使用方式跟之前是完全一样的，另外这里的 MyLoadingComponent 我们可
以写成下面这样。

```javascript
/* 
  MyLoadingComponent
*/
const MyLoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};
```

这个组件代码非常简单，从代码里可以看到在这个组件里处理了各种边缘情况。

## React.lazy 和 Suspense

React v16.6 提供了 lazy 方法和配套的 Suspense 组件，来实现模块的懒加载,用来处理
异步渲染场景。通过 lazy 方法，加载对应的模块，lazy 方法接收一个函数作为参数，这
个函数返回一个 Promise 对象。Suspense 组件用来在加载对应的模块过程中，展示用户友
好的提示信息，这个组件有一个属性，fallback，这个属性可以是一个 React 的组件。

> 如果不确定从哪里开始对 React 应用程序进行代码拆分，请按照以下步骤操作：

1.从路由级别开始。路由是识别应用程序拆分点的最简单方法。  
2.确定网站页面上仅在特定用户交互（例如点击按钮）时呈现的大型组件。  
3.考虑拆分不在屏幕内并且对用户不重要的任何其他组件。

用法如下。

```js
import React, { lazy, Suspense } from 'react';

const OtherComponent = lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

### 1.用来拆分路由组件

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/lodar-1559496417.gif'/>

```js
import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';

const Home = lazy(() => import('./page/Home/index.jsx'));
const LAZYLOAD = lazy(() => import('./page/lazyLoad/index.jsx'));
const NoMatch = lazy(() => import('./page/NoMatch/index.jsx'));

const App = () => {
  return (
    <>
      <Router>
        <Suspense fallback={<div className="loading loading-lg"></div>}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/lazyload">
              <LAZYLOAD />
            </Route>
            <Route exact path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

### 2.用来拆分 react 小组件

例如 Tab 组件、较大体检的脚本，不一定使用的脚本代码。

下图是一个生成 pdf 的功能组件，使用 npm 包 react-pdf，只有当点击按钮的时候采取下
载对应的脚本。

![20220406-wjGCQW-1_HzJpB-2aFBdlYflup1d5PA](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220406-wjGCQW-1_HzJpB-2aFBdlYflup1d5PA.gif)

![20220406-MH9ePc-90261588f0222215b2b81aa9e86b3943](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220406-MH9ePc-90261588f0222215b2b81aa9e86b3943.jpg)
![20220406-BfMABf-69517fe67d3277b67005877916a74afc](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220406-BfMABf-69517fe67d3277b67005877916a74afc.jpg)

---

1. [Code-Splitting – React document](https://zh-hans.reactjs.org/docs/code-splitting.html#reactlazy)
2. [使用 React.lazy 和 Suspense 进行代码拆分](https://web.dev/code-splitting-suspense/)
3. [通过代码拆分减少 JavaScript 负载](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
4. [webpack 中文文档-lazy-loading](https://webpack.docschina.org/guides/lazy-loading)
5. [SplitChunksPlugin | webpack](https://webpack.js.org/plugins/split-chunks-plugin/)
6. [Dynamic import() · V8](https://v8.dev/features/dynamic-import)
7. [模块方法(module methods) | webpack 中文网](https://www.webpackjs.com/api/module-methods/#import-)
