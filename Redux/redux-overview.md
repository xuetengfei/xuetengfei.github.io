随着 JavaScript 单页应用开发日趋复杂，JavaScript 需要管理比任何时候都要多的
state （状态）。 这些 state 可能包括服务器响应、缓存数据、本地生成尚未持久化到服
务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页
器等等。

管理不断变化的 state 非常困难。如果一个 model 的变化会引起另一个 model 变化，那
么当 view 变化时，就可能引起对应 model 以及另一个 model 的变化，依次地，可能会引
起另一个 view 的变化。直至你搞不清楚到底发生了什么。state 在什么时候，由于什么原
因，如何变化已然不受控制。 当系统变得错综复杂的时候，想重现问题或者添加新功能就
会变得举步维艰。

```
Redux 就是解决这个问题。Redux 试图让 state 的变化变得可预测。
这些限制条件反映在 Redux 的三大原则中。

1.单一数据源
2.State 是只读的
3.使用纯函数来执行修改
```

<figure>
  <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/why-use-redux-in-project.png' width='700px'/>
  <figcaption>why-use-redux-in-project</figcaption>
</figure>

### 单一数据源:Store（数据库）

Store 就是保存数据的地方，可以把它看成一个容器。整个应用只能有一个 Store。Redux
提供 createStore 这个函数，用来生成 Store。

```javascript
import { createStore } from 'redux';
const store = createStore(fn);
```

`createStore`函数接受另一个函数作为参数，返回新生成的 Store 对象。这个`fn`参数是
什么，后面会提及。

### state（状态）

Store 对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时
点的数据集合，就叫做 State,State 是只读的。 Redux 规定，一个 State 对应一个
View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然
。 Redux 三个基本原则（3）:使用纯函数来执行修改

```javascript
import { createStore } from 'redux';
const store = createStore(fn);

// 读取当前state
const state = store.getState();
```

### Action (任务对象)

State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所
以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该
要发生变化了。

Action 就是一个普通 JavaScript 对象 ，就像是描述发生了什么的指示器，表达想要修改
的意图。下面是一些 action 的示例。Action 对象，其中的 type 属性是必须的，其他属
性可以自由设置。

```javascript
const action = { type: 'ADD_TODO', text: 'Go to swimming pool' };
const action1 = { type: 'TOGGLE_TODO', index: 1 };
const action2 = { type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' };
```

要想更新 state 中的数据，需要发起一个 action。强制使用 action 来描述所有变化。所
有的修改都被集中化处理，且严格按照一个接一个的顺序执行。因此不用担心
`race condition` 的出现。

```javascript
// 派发事件，action作为任务对象。
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1,
});

// or

function completeTodo(number) {
  return {
    type: `COMPLETE_TODO`,
    index,
  };
}
dispatch(completeTodo(number));

// or

const boundCompleteTodo = number => dispatch(completeTodo(number));
```

?> store 里能直接通过 store.dispatch() 调用 dispatch() 方法，但是多数情况下你会
使用 react-redux 提供的 connect() 帮助器来调用。bindActionCreators() 可以自动把
多个 action 创建函数 绑定到 dispatch() 方法上。

### 任务派发:store.dispatch( )

store.dispatch 函数是 View 发出 Action 的唯一方法。

```javascript
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux',
});
```

### reducer

Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种
State 的计算过程就叫做 Reducer。**Reducer 是一个纯函数**它接受 Action 和当前
State 作为参数，返回一个新的 State。

```javascript
const reducer = function (state, action) {
  // ...
  return new_state;
};

const newState = reducer（oldState,Action）
```

Reducer 函数不用像上面这样手动调用
，`store.dispatch 方法会触发 Reducer 的自动执行`。以后每当 store.dispatch 发送过
来一个新的 Action，就会自动调用 Reducer，得到新的 State。

为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入
createStore 方法。

```javascript
import { createStore } from 'redux';
const store = createStore(reducerFunction);
```

### store.subscribe()

Store 允许使用 store.subscribe 方法设置监听函数，一旦 State 发生变化，就自动执行
这个函数。

## 整个流程

<figure>
  <img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/3923063-bf63f4d086dc7b70.png">
  <figcaption>梳理一下整个流程</figcaption>
</figure>

情景还原一下，web 用户在 CRUD 操作数据基本操作。在 **view-1 **时间节点下，点击删
除按钮，那么点击事件本质上就会产生一个 Action 然后把这个 Action 派发出去，就是执
行函数 store.dispatch(Action) 。派发事件 store.dispatch(Action)，会自动调用
Reducer 函数，而 Reducer 函数会接受这个 Action 作为参数进而用来计算下一个
**view-2 **，web 给用户呈现的网页就会得到想要的变化。

### reducer 的拆分和合并:combineReducers

reducer 本质是一个纯函数，接受 oldState 和 Action 来计算下一个 newState。

大型项目中，State 必然十分庞大，导致 Reducer 函数也十分庞大。需要进行**拆分维
护**，然后进行合并为一个 reducer。为什么最后还要合并呢？ 因为最后合并为一个
totalReducer 函数 ，才能当作参数传给**createStore(totalReducer)** 来使用。

```javascript
import { createStore } from 'redux';
import totalReducer from '../reducer/index.js';
const store = createStore(totalReducer);
```

Redux 提供了一个**combineReducers**方法，用于 Reducer 的拆分。只要定义各
个**slice Reducer **函数，然后用这个方法，将它们合成一个大的
Reducer。`combineReducers({object})`

```javascript
import { combineReducers } from 'redux';

// {object} => function
export default combineReducers({
  chatLog,
  statusMessage,
  userName,
});
```

可以把所有子 Reducer 放在一个文件里面，然后统一引入。现阶段，先不去关心**
sliceReducers.js ** 文件里面具体代码实现

```javascript
import { combineReducers } from 'redux';
import * as allReducers from './reducers/sliceReducers.js';
// allReducers  is object

const totalReducer = combineReducers(allReducers);
export totalReducer;
```

总之，**combineReducers**方法,做的就是产生一个整体的 Reducer 函数。该函数根据
State 的 key 去执行相应的子 Reducer，并将返回结果合并成一个大的 State 对象。

```javascript
// combineReducer 的简单实现。
const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};
```

## 总结

?> 往简单了说 Redux 就是实现了全局 state 、处理全局 state 的方式和统一的数据处理
中心，也就是 store、dispatch 和 reducer。

<figure>
  <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/react-redux-workflow-graphical-cheat-sheet_v110.png' width='700px'/>
  <figcaption>react-redux-workflow-graphical-cheat-sheet</figcaption>
</figure>
