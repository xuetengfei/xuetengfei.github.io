React v16.6 提供了 lazy 方法和配套的 Suspense 组件，来实现模块的懒加载,用来处理异步渲染场景。通过 lazy 方法，加载对应的模块，lazy 方法接收一个函数作为参数，这个函数返回一个 Promise 对象。Suspense 组件用来在加载对应的模块过程中，展示用户友好的提示信息，这个组件有一个属性，fallback，这个属性可以是一个 React 的组件。

## 1.用来拆分路由组件

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

## 2.用来拆分 react 小组件

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
                onClick={handleDyncImportModuleB}
              >
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

其他

react-router v5 现在支持配置路由了，千呼万唤始出。有空再看一下，哈哈哈。

[React Router: Declarative Routing for React.js](https://reacttraining.com/react-router/web/example/route-config)

```json
{
  "dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-router-dom": "^5.2.0"
  }
}
```

---

1. [React document:代码分割 – React document](https://zh-hans.reactjs.org/docs/code-splitting.html#reactlazy)
2. [web.dev:Code splitting with React.lazy and Suspense /web.dev](https://web.dev/code-splitting-suspense/)
