<!-- <img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/react-redux.png"  data-action="zoom"> -->

> react-redux 是什么？

前面的博客中介绍了 redux，为了方便在 React 项目中使用 Redux，Redux 的作者封装了
一个 React 官方的、专用的库
[React Redux](https://react-redux.js.org/introduction/quick-start)。让 react 开
发者更方便的使用 redux。

> react-redux 能做什么？

React Redux 让你的 react 组件可以从 Redux Store 中**subscribe data**以
及**dispatch actions**。 **subscribe data: 获得 store 中数据;dispatch actions:更
新 store 数据。** React-Redux 虽然提供了便利，但是需要掌握额外的 API，并且要遵守
它的组件拆分规范。

> 安装依赖库

```javascript
npm install --save redux react-redux
```

> 一个 完整的 react 应用的是怎么结合 Store 的呢？

首先，必须熟悉 react 本身。react 有 props 和 state. props 是父级分发下来的属性
，state 是组件内部可以自行管理的状态。react 是单向数据流，就像是一个瀑布，水流只
能从上而下流动。所以，我们在根组件处，设置瀑布源头提供水源，那么所有子孙组件，都
可以获得水流。

<figure>
  <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/blm-redux-context.jpg' width='700px'/>
  <figcaption>context</figcaption>
</figure>

> Context 是什么？

所谓 Context ，就是“上下文环境”， 让一个树状组件上所有组件都能访问一个共同的对象
， 为了完成这个任务，需要上级组件和下级组件配合。首先，上级组件要宣称自己支持
context ，并且提供一个函数来返回代表 Context 对象。然后， 这个上级组件之下的所有
子孙组件， 只要宣称自己需要这个 context ，就可以 通过 this.context 访问到这个共
同的环境对象。

> Provider 是什么？

React Redux 提供 **Provider**组件， **Provider**组件包装在应用的根节点组件外，就
相当于设置瀑布源头。那么，所以的组件都可以访问 store 了。

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>，
  rootElement，
);
```

> Provider 实现原理简要解析

```javascript
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store，
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object，
};
```

> connect

一个 react 组件怎么订阅 store 的数据呢？  
React Redux 提供一个 `connect function`，是链接 component 和 store 的桥梁。

```js
import { connect } from 'react-redux';
import { increment， decrement， reset } from './actionCreators';

// const Counter = ...

const mapStateToProps = (state /*，ownProps ?*/,devownProps) => ({
    counter: state.counter，
    someExtraData:devownProps
})

const mapDispatchToProps = { increment， decrement， reset };
export default connect(mapStateToProps， mapDispatchToProps)(Counter);
```

> react 组件拆分

React Redux 将所有组件分成两大类：UI 组件（presentational）和容器组件
（container）。 React Redux 规定，所有的 UI 组件都由用户提供
，`容器组件则是由 React Redux 自动生成`。也就是说，用户负责视觉层，状态管理则是
全部交给它。

在 react-redux 框架下， 一个 React 组件基本上就是要完成以下两个功能：

```md
1、和 Redux Store 打交道， 折腾数据。  
2、根据当前 props 和 state ，负责渲染 UI。
```

拆分`容器组件`和`渲染组件`， 是设计 React 组件的一种模式。两个组件各种的职能分离
，最后进行嵌套，得到一个完整组件。在我们把一个组件拆分为容器组件和渲染组件的时候
，不只是功能分离， 还有一个比较大的变化，那就是`渲染组件不需要有状态了`。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/01_2018-06-18-17-40-0.jpg"  data-action="zoom" width="500px" style="margin:0 auto;">

拆分关系，如下。
<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/smart&dumb.png"   width="350px">

> 渲染“无状态”组件

让渲染组件无状态，是拆分的主要目的之一，渲染组件只需要根据 props 来渲染结果，不
需要 state。状态全都交给容器组件去打点，容器组件通过 props 把状态传递给渲染组件
。完全没有 state，只有一个 render 方法，所有的数据都来自 于 props，这种组件叫做“
无状态”组件 。

```javascript
export default function Counter(props){
    const {value，onDecrement} = props;
    return(
        <div>
            <p>{{value}}</p>
            <button onClick={onDecrement}></<button>
        </div>
    )
};
```

> 容器组件

容器组件，要做的工作无外乎两件事:

```md
1.把 Store 上的状态转化为 内层渲染组件的 prop;  
2.把内层渲染组件中的用户动作转化为派送给 Store 的动作。
```

这两个工作一个是内层渲染对象的输入，一个是内层渲染对象的输出。就像是一个有机体一
般，有静脉和动脉两个血管一般。

```javascript
import Counter form "../Counter.js"

class CounterContainer extends Component{
    render(){
        return(
            <Counter onDecrement={this.onDecrement} value={this.state.value} />
        )
    }
};
export default CounterContainer;
// 引入渲染组件，通过props传入数据
```

> Connect 是做什么的？

之前分析了一种 React 的设计模式。把一个完整的组件拆分`容器组件`和`渲染组件`。容
器组件：复杂业务逻辑。渲染组件：无状态组件，只复杂渲染。编写组件都是一些重复性很
高的过程：先定义一个渲染组件然后，再定义一个容器组件，容器组件中，引入渲染组件，
并且添加 props 接口。繁琐低效。面对重复性劳动，偷懒是第一生产力，我们需要简化定
义组件这个过程。

react-redux 给我们提供了一个高级函数 connect。就是用来提高效率的。connect 函数的
作用是:将 React 组件连接到 Redux 存储。它为其连接的组件提供所需的来自存储的数据
片段，以及用于向存储分派操作的函数。它不修改传递给它的组件类;相反，它返回一个新
的、连接的组件类，该类包装了传递进来的组件。

这个 connect 高级函数本质上，就是把 `渲染组件` 进行一次`容器组件`的包装，形成一
个完整的组件。没有了之前的那么繁缛的过程。最后的最后，产生就是`容器组件`。并且，
这个容器组件已经包含了前面传入的渲染组件 。

1. [connect](https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)

```js
import { login， logout } from './actionCreators';

const mapState = state => state.user;
const mapDispatch = { login， logout };

// connect 是一个柯里化函数
// first call: returns a hoc (wrapper function) that you can use to wrap any component
const connectUser = connect(
  mapState，
  mapDispatch?，
);

// second call: returns the wrapper component with the additional props it injects.
// you may use the hoc to enable different components to get the same behavior
const ConnectedUserLogin = connectUser(Login);
const ConnectedUserProfile = connectUser(Profile);
```

```javascript
connect(mapState，mapDispatch?)(Comp);
```

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/blm-connect.jpg"   width="550px">

> mapState:Extracting Data

mapState 是 Connect 的第一个参数，业内习惯性命名 mapStateToProps，也可以叫做其他
名字，我缩写为 mapState。  
mapState 自己是一个 function，返回一个 object。  
mapState 的功能是从 store 中提取(或者说订阅)组件所需要的数据。  
每次 store 有变化的时候，mapState 就会被调用(called)。  
mapState 可以获取一个完整的 store 数据，但是应该只 return 这个组件所需要的那部分
数据。

```javascript
const mapState = (state， ownProps?) => ({
  count: state.count，
});
// component will receive: props.count
```

如果，组件并不想从 store 中订阅数据，那么可以不写这个 mapState 函数，此时
connect 函数变为下面

```javascript
connect(null， mapDispatch)(Comp);
// or
connect(undefined， mapDispatch)(Comp);
```

一个 react 应用中所有 connected 的组件，有一些 mapState 函数。每当 store 改变的
时候，所有的 mapState 函数都会 run 一遍。计算出下一个组件所需要的 stateProps
object，这个 object 的一些字段可能发生改变，也可能没有改变。如果改变了，那么对应
的 react 组件，会重新 render

## mapDispatch:Dispatching Actions

mapDispatch 是 connect 函数的第二个参数，是一个可选参数。mapDispatch 是用来
dispatch actions to the store. dispatch 是一个 Redux store 的 function 。调用
`store.dispatch` 是改变 state 唯一办法。  
使用 React Redux，你的组件永远都不会直接接触到 store， connect 函数帮你完成。

默认情况下，一个已经 connected 的组件，会有一个`props.dispatch`， `dispatch` 就
是一个`props` ，那么，这个组件自己就可以 `dispatch actions`

```javascript
function Counter({ count， dispatch }) {
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
    </div>
  );
}
```

也可以，显示地提供一个 mapDispatch

```javascript
const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' })，
    decrement: () => dispatch({ type: 'DECREMENT' })，
  };
};
// ...
function Counter({ count， decrement， increment }) {
  return (
    <div>
      <span>{count}</span>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
}
// button unaware of "dispatch"
```

如果，不提供 mapDispatch，那么 connect 函数可以写成下面这样的。没有提供
mapDispatch，那么组件就会收到一个`props.dispatch`

```javascript
connect()(MyComponent);
// which is equivalent with
connect(null， null)(MyComponent);

// or
connect(mapStateToProps /** no second argument */)(MyComponent);
```

> connect 函数简单实现原理

上文说到，这个 connect 高级函数本质上，就是把 `渲染组件` 进行一次`容器组件`的包
装，形成一个完整的组件。没有了之前的那么繁缛的过程。最后产生就是`容器组件`。并且
，这个容器组件已经包含了前面传入的渲染组件 。

```javascript
import React， { Component } from 'react'
import PropTypes from 'prop-types'

// 从 store 拿取数据:是绑定数据的过程
const mapState = (state) => ({
    themeColor: state.themeColor，
    themeName: state.themeName
})

// store dispatch:是绑定事件的过程
const mapDispatch = (dispatch) => ({
    onSwitchColor: (color) => {
      dispatch({ type: 'CHANGE_COLOR'， themeColor: color })}
})

export connect = (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }
    render () {
      const { store } = this.context
      let stateProps = mapStateToProps(store.getState())
      // {...stateProps} 意思是把这个对象里面的属性全部通过 `props` 方式传递进去
      return <WrappedComponent {...stateProps，...dispatchProps，} />
    }
  }
  return Connect
}
```

上面的伪代码纰漏很多，不是重点，重点下面这行代码，

```javascript
<WrappedComponent {...stateProps，...dispatchProps，} />
```

传入的 mapState、mapDispath 会解构传入 props 到`渲染组件`，这个过程是隐式的，是
connect 函数自动完成的。

<img src="http://loremxuetengfei.oss-cn-beijing.aliyuncs.com/different-compents.jpg" width="500px" style="margin:0 auto;">

---

1. [Connect: Extracting Data with mapStateToProps · React Redux](https://react-redux.js.org/using-react-redux/connect-mapstate)
2. [参考:动手实现 React-redux（三）：connect 和 mapStateToProps | React.js 小书](http://huziketang.mangojuice.top/books/react/lesson38)
3. [yv6kqo1yw9 - CodeSandbox](https://codesandbox.io/s/yv6kqo1yw9)
4. [Context - React](https://react.docschina.org/docs/context.html#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8-context)
5. [React Context API: 轻松管理状态 · Issue #5 · OFED/translation](https://github.com/OFED/translation/issues/5)
6. [🤞 Just show me the code](https://codesandbox.io/s/9on71rvnyo?file=/src/index.js)
