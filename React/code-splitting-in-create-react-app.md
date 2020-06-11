# 代码分离 code-splitting

在 React.js 单页应用时，随着业务的增长，代码量也会有增长的趋势。有时用户只是访问应用程序（或路由）的一部分，但是却可能会加载了大量首次页面载入时不必要的组件，这会影响我们应用的初始加载时间。

在使用 Create React App 来构建应用时，Create React App 最终会生成几个大的 js 文件。 这个文件包含了我们应用中所有的 JavaScript 代码，但如果一个用户他只是想要在登录页登录，我们加载其他的组件代码是没有意义的。当我们的应用还比较小的时候，加载所有的代码不是一个问题，但是随着应用越来越大，这个问题就会慢慢凸显出来。

为了解决这个问题，需要分割我们的代码。

在 Create React App 脚手架中有一个 `Dynamic-import`功能。

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

首先引入路由需要的组件，然后定义相关的路由，Switch 组件用于渲染与路径相匹配的路由。

在文件顶部通过使用 import 静态引入了所有的组件，这意味着不管访问哪个路由，这些组件都会被全部加载。通过「代码分离」想要实现的是在访问一个页面的时候只加载跟这个页面匹配的组件。

## 创建异步组件

首先在 `src/components/AsyncComponent.js`文件中添加以下代码：

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

asyncComponent 函数接受一个参数 importComponent，调用这个方法将动态引入给定的组件。

在组件 componentDidMount 时，我们只需要调用传入的 importComponent 函数，并将动态加载的组件保存在 AsyncComponent 组件的 state 中。

最后，在 render 方法里，我们需要判断下组件是否已经加载完成。如果组件还未加载成功，最简单的处理方式是直接返回 null，但是为了给用户更好的体验，我们可以加一个组件正在加载的反馈，比如可以渲染一个「loader」

## 使用异步组件

```javascript
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '@babel/polyfill';

// const Async = asyncComponent(() => import('./views/deposit'))
const RouterMap = [
  {
    path: '/l',
    name: 'login',
    component: asyncComponent(() => import('./views/login/index')),
    hidden: true,
  },
  {
    path: '/createplan',
    name: 'createplan',
    component: asyncComponent(() => import('./views/createPlan')),
  },
  {
    path: '/result',
    name: '结果页面',
    component: asyncComponent(() => import('./views/Result/index')),
  },
  {
    path: '/getItem',
    name: 'getItem',
    component: asyncComponent(() => import('./views/createPlan/getItem')),
  },
];

const RouterList = RouterMap.filter(v => !v.hidden);
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ height: '100%' }}>
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

## 对比一下编译后的文件

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/code-splitting-1-1556194218.jpg'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/code-splitting-2-1556194218.jpg'/>

---

### GIF

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/lodar-1559496417.gif'/>

<!--
0. [webpack 懒加载](https://webpack.docschina.org/guides/lazy-loading/#%E6%A1%86%E6%9E%B6)
1. [如何使用代码分离](https://www.zcfy.cc/article/code-splitting-in-create-react-app)
1. [Progressive Web Apps with React.js: Part 2 — Page Load Performance](https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-2-page-load-performance-33b932d97cf2)
1. [What's New in Create React App – React Blog](https://reactjs.org/blog/2017/05/18/whats-new-in-create-react-app.html#code-splitting-with-dynamic-import)

 -->

<!--

1. [React+Redux 项目中的代码分割](https://blog.whezh.com/react-redux-code-splitting/)
 -->
