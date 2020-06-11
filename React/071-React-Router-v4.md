# React Router 4.x 雷区

## Preface

React Router 作为 React 体系中的重要组成部分，也成为开发者首选的路由库，其主要功能是通过管理 url 实现组件的切换和状态的变化。随着第四版 React Router 的正式亮相，其精简的 API 、语义化的路由匹配方案以及动态路由等变化，都彰显着此次升级的颠覆性。4.x 不仅是 API 的简单改变，还有整个设计理念的变化。 为了避免在使用时遇到同样的问题多绕弯子，把开发过程中遇到的问题以及相应的解决方法做了汇总

4.x 中采用了单代码仓库模型架构，所以里面包含了若干个相互独立的包，如下所示：

1.react-router React Router 核心  
2.react-router-dom 用于 DOM 绑定的 React Router  
3.react-router-native 用于 React Native 的 React Router  
4.react-router-redux React Router 和 Redux 的集成  
5.react-router-config 用于配置静态路由

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import * as routePaths from './js/constants/routePaths';
import Index from './js/pages/Index';

ReactDOM.render(
  <BrowserRouter>
    <div className="container">
      <Route path={routePaths.INDEX} component={Index} />
    </div>
  </BrowserRouter>,
  document.getElementById('app'),
);
```

因此，在实际的 web 项目开发中,「 react-router 」 和 「 react-router-dom 」**不必同时引用**。在 react-router-dom 中包含类似 `<BrowserRouter>` 的 DOM 类组件，所以只需要引入 react-router-dom 包就可以了。

使用方法：

```javascript
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
```

页面中多个模块同时渲染问题

```javascript
ReactDOM.render(
  <BrowserRouter>
    <div className="container">
      <Route path="/" component={Index} />
      <Route path="/card" component={Card} />
    </div>
  </BrowserRouter>,

  document.getElementById('app'),
);
```

当访问 path="/card" 的页面时，path="/" 的页面也会被渲染出来。不同于 3.x 中路由匹配时的独一无二特性，4.x 中有了一层包含关系：如匹配 path="/card" 的路由会匹配 path="/" 的路由。那么这个问题怎么解决呢？有以下两种方法：

(1)使用 `<Router>` 的 `exact` 关键字

```javascript
ReactDOM.render(
  <BrowserRouter>
    <>
      <Route path="/" exact component={Index} />
      <Route path="/card" component={Card} />
    </>
  </BrowserRouter>,
  document.getElementById('app'),
);
```

(2) 使用独立路由：`<Switch>`

```javascript
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <>
        <Route path="/" exact component={Index} />
        <Route path="/card" component={Card} />
      </>
    </Switch>
  </BrowserRouter>,
  document.getElementById('app'),
);
```

模块可以实现独立渲染了。来看下这样解决问题的原因：

---

首先需要了解下 Router ,它是所有路由组件共用的底层接口，在 4.x 中，你可以将各种组件及标签放进 `Router`组件中。比如：

```javascript
<Router>
  <>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
    </ul>

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </>
</Router>
```

需要注意的是：Router 下只允许存在一个子元素，如存在多个则会报错。所以在上面的代码中，需要使用「 div 」将其他元素包裹起来。在实际的项目中，我们一般不会直接使用 Router ，而是使用如下所示的更高级的路由。在这里将会介绍到 「 BrowserRouter 」 以及其他常用的高级路由。

## BrowserRouter

使用 HTML5 提供的 history API ( pushState , replaceState 和 popstate 事件) 来保持 「 UI 和 URL 的同步 」。
下面介绍一下 BrowserRouter 组件中的 5 个属性：

> basename: string

当前位置的基准 url 。如果你的页面部署在服务器的二级（子）目录，你需要将 basename 设置到此子目录。 正确的 url 格式是前面有一个前导斜杠，但不能有尾部斜杠。

```javascript
<BrowserRouter basename="/calendar"/>
<Link to="/today"/> // render result: <a href="/calendar/today">
```

> getUserConfirmation: func

```javascript
// 使用默认的确认函数
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
};
<BrowserRouter getUserConfirmation={getConfirmation} />;
```

## HashRouter

HashRouter 是一种特定的 `<Router>`， HashRouter 使用 url 的 hash (例如： window.location.hash ) 来保持 UI 和 url 的同步。由于使用 hash 的方式记录导航历史不支持 location.key 和 location.state ，该技术仅用于支持传统的浏览器。

## Redirect

当用户手动输入`/test`之后，我们需要跳转至 INDEX 首页，`<Redirect>` 渲染时将会导向一个新的地址，这个新的地址将会覆盖掉 history 堆栈中的当前地址。

```javascript
ReactDOM.render(
  <BrowserRouter>
    <div className="container">
      <Switch>
        <Route path={routePaths.INDEX} exact component={Index} />
        <Route path={routePaths.CARD} component={Card} />
        <Redirect to="/" />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('app'),
);
```

```javascript
<Redirect to="/somewhere/else"/>

<Redirect to={{
  pathname: '/login',
  search: '?utm=your+face',
  state: { referrer: currentLocation }
}}/>

<Redirect push to="/somewhere/else"/>
// push: 为 true 时，重定向操作将会把新地址加入到访问的历史记录里面，并不会替换掉当前的地址。

<Switch>
  <Redirect from='/old-path' to='/new-path'/>
  <Route path='/new-path' component={Place}/>
</Switch>
```

## NavLink、activeClassName

`<NavLink>` 做下简单介绍：该组件是 `<Link>` 的特殊版本，当遇到匹配的 URL 渲染元素时会添加样式属性，适用于页面导航部分。

```javascript
<NavLink to="/faq" activeClassName="selected">
  FAQ
</NavLink>

<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: 'bold',
    color: 'red'
   }}
>FAQ</NavLink>

<NavLink
  exact
  to="/profile"
>Profile</NavLink>
```

## Push

使用 history 控制路由的跳转.history 指的是 history 包，是 4.x 中的重要依赖之一。
需要注意的是：history 对象是可变的，所以不要从 history.location 直接获取，而是需要通过 `<Route>` 的 prop 来获取 location。

```javascript
this.props.history.push('/some/path');
```

## 滚动恢复

切换路由后，页面仍然停留在上一个页面的位置.由 A 页面跳转到 B 页面，B 页面停留在 A 页面的位置，没有返回到顶部。

在 React Router 早期版本中可以使用滚动恢复的开箱即用功能，但是在 4.x 中路由切换时并不会恢复滚动位置，用户需要对 window 和独立组件的滚动位置进行管理。可以使用 withRouter 组件： withRouter 可以访问历史对象的属性和最近的 `<Route>` 匹配项，当路由的属性值 { match, location, history } 改变时，withRouter 都会重新渲染。该组件可以携带组件的路由信息，避免组件之间一层层传递。使用方法如下：

```javascript
import { Route, withRouter } from 'react-router-dom';
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
```

```javascript
ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <div className="container">
        <Route path={routePaths.INDEX} exact component={Index} />
        <Route path={routePaths.CARD} component={Card} />
      </div>
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById('app'),
);
```

这样处理之后，当跳转页面时都会自动回到该页面的顶部位置。

---

1. [JDC | 京东设计中心 » React Router 4.x 开发，这些雷区我们都帮你踩过了](https://jdc.jd.com/archives/212552)
2. [前端路由实现与 react-router 源码分析 ](https://github.com/joeyguo/blog/issues/2)
