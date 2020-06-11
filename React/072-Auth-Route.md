# 权限控制分类

- 登录授权，用户没有登录只能访问登录页面，如果处于登录状态则跳转到当前用户的默认首页；
- 路由授权，当前登录用户的角色，如果对一个 URL 没有权限访问，则重定向到 403 页面；
- 数据授权，当访问一个没有权限的 API，则重定向到 403 页面；
- 操作授权，当页面中某个按钮或者区域没有权限访问则在页面中隐藏。

### react-router 升级到 v.4.x

在 `react-router-4`中移除了[onEnter、onUpdate、onLeave](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/migrating.md#on-properties)  
那么就需要开发者自己去定义`<Route render={ ... } />`,下面是一个最简单的路由重定向。

```javascript
<Route
  exact
  path="/home"
  render={() => (isLoggedIn() ? <Redirect to="/front" /> : <Home />)}
/>
```

### 1、React Router 页面权限拦截

#### 1.1 创建权限控制组件 AuthRouter 组件

在未登录的状态下，不仅需要对请求进行拦截，还需要对一些页面进行拦截，如果未登录用户请求访问一些需要登录的页面，就需要自动跳转到指定页面。这个工作当然可以再每个页面组件的 `constructor()`或 `ComponentWillMount()`状态下进行，但是为了简便可以直接将他们封装成一个组件。

注意： 要使用 withRouter 强制更新路由信息，否则可能会出现路由地址改变但页面没有相应改变的 bug 。

```javascript
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';

const AuthRequireRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (authState ? <Component {...props} /> : <Redirect to={'/login'} />)}
  />
);

export default withRouter(AuthRouter);
```

也可以这样处理，在使用时，只需要在 props 中指定所需要的权限名 authName 即可。

```javascript
const PrivateRouter = ({ component: Component, authName, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      permissionNamesHas(authName) ? (
        <Component {...props} />
      ) : (
        <Redirect to={`/welcome/login`} />
      )
    }
  />
);
```

#### 1.2 创建路由文件 router.js

```javascript
render(){
      return (
      <Router>
        <App>
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route path="/login" component={Login}></Route>
            <AuthRouter path='/main' component={Home}></AuthRouter>   {/*登录权限控制组件*/}
          </Switch>
        </App>
      </Router>
    )
}
```

---

### 2、组件权限控制(细粒度)

当然，不只有 Router 组件需要进行一些权限控制，还要对更小粒度的一些组件进行权限控制。页面操作按钮的显示和隐藏等。

管理员的菜单中比普通用户的菜单要多。封装成一个组件出来：

```javascript
class AuthRequire extends React.Component {
  render() {
    const { authName, children } = this.props;
    return permissionNamesHas(authName) ? children : null;
  }
}
```

使用时，在 props 中指定所需要的权限，在组件内写上渲染的内容即可

```html
<ul>
  <li>个人资料</li>
  <li>退出</li>
  <AuthRequire authName="manager">
    <li>管理</li>
  </AuthRequire>
</ul>
```

---

1. [codepen -- React Router 4](https://codepen.io/bradwestfall/project/editor/XWNWge?preview_height=50&open_file=src/app.js)
2. [React 框架下权限管理的一些解决方案 | Moren's](https://blog.yangteng.me/2018/20180205js-framework-auth/)
3. [react 路由控制权限 - Tiankai's Blog](http://www.tiankai.party/posts/45622/)
