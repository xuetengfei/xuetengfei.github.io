# 代码分离 code-splitting

随着业务的增长，代码量也会有增长的趋势。有时用户只是访问应用程序（或路由）的一部
分，但是却可能会加载了大量首次页面载入时不必要的组件，这会影响我们应用的初始加载
时间。

为了解决这个问题，需要分割我们的代码。在 Create React App 脚手架中有一个
`Dynamic-import`功能。

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
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/lodar-1559496417.gif'/>

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

## Suspense-Lazy

React v16.6 提供了 lazy 方法和配套的 Suspense 组件，来实现模块的懒加载,用来处理
异步渲染场景。通过 lazy 方法，加载对应的模块，lazy 方法接收一个函数作为参数，这
个函数返回一个 Promise 对象。Suspense 组件用来在加载对应的模块过程中，展示用户友
好的提示信息，这个组件有一个属性，fallback，这个属性可以是一个 React 的组件。

### 1.用来拆分路由组件

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

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200610140723react-lazy.jpg' alt='20200610140723react-lazy'/>

如图, 当前路由组件中，只有当 点击`Edit、Delete`时候才会去加载对于的组件。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200610125807react-lazy-dync-load.jpg' alt='20200610125807react-lazy-dync-load'/>

```js
import React, { lazy, Suspense, useState, useEffect } from 'react';
const CreateModule = lazy(() => import('./com-module-edit.jsx'));
const DeleteModule = lazy(() => import('./com-module-delete.jsx'));

export default function index() {
  const [CreateModuleStatus, setModuleAStatus] = useState(false);
  const [DeleteModuleStatus, setModuleBStatus] = useState(false);

  const handleDyncImportModuleA = () => setModuleAStatus(true);
  const handleDyncImportModuleB = () => setModuleBStatus(true);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>name</th>
            <th>id</th>
            <th>more</th>
          </tr>
        </thead>
        <tbody>
          <tr className="active">
            <td>xuetengfei</td>
            <td>001</td>
            <td>
              <button className="btn" onClick={handleDyncImportModuleA}>
                Edit
              </button>
              <button
                className="btn"
                style={{ marginLeft: '10px' }}
                onClick={handleDyncImportModuleB}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Suspense fallback={<div className="loading loading-lg"></div>}>
        {CreateModuleStatus && <CreateModule />}
        {DeleteModuleStatus && <DeleteModule />}
      </Suspense>
    </>
  );
}
```

---

1. [Code-Splitting – React document](https://zh-hans.reactjs.org/docs/code-splitting.html#reactlazy)
2. [web.dev:Code splitting with React.lazy and Suspense](https://web.dev/code-splitting-suspense/)
3. [react-loadable](https://github.com/jamiebuilds/react-loadable)
4. [Introducing React Loadable – @thejameskyle](https://jamie.build/react-loadable.html)
5. [webpack 中文文档-lazy-loading](https://webpack.docschina.org/guides/lazy-loading)
6. [SplitChunksPlugin | webpack](https://webpack.js.org/plugins/split-chunks-plugin/)
7. [通过代码拆分减少 JavaScript 负载](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
8. [Reduce JavaScript payloads with code splitting](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
9. [Dynamic import() · V8](https://v8.dev/features/dynamic-import)

<!-- 5. [React Router: Declarative Routing for React.js](https://reacttraining.com/react-router/web/example/route-config) -->
