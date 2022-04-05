React 是一个用于构建用户界面的 JavaScript 库。React 的设计思想极其独特，属于革命
性创新，性能出众，代码逻辑却非常简单。它的设计从一开始就考虑到了性能。在本文中，
将介绍 react `diff 算法`和`渲染`如何工作，以便你可以优化自己的应用程序。

## 如何工作

在我们讨论实现细节之前，了解一下 react 是如何工作的

```javascript
var MyComponent = React.createClass({
  render: function () {
    if (this.props.first) {
      return (
        <div className="first">
          <span>A Span</span>
        </div>
      );
    } else {
      return (
        <div className="second">
          <p>A Paragraph</p>
        </div>
      );
    }
  },
});
```

使用 react 开发的时候，只需要描述(声明式)希望 UI 看起来是什么样子。重要的是要理
解 render 的结果，不是实际的 dom 节点。render 的结果,我们称它们为虚拟 DOM，一种
存在于内存之中的一种数据结构,是轻量级的 javascript 对象。

```javascript
class C extends React.Component {
    render () {
        return (
            <div className='container'>
                  "lorem"
                  <i onClick={(e) => console.log(e)}>{this.state.val}</i>
                  <Children val={this.state.val}/>
            </div>
        )
    }
}
// virtual DOM(React element)
{
  $$typeof: Symbol(react.element)
  key: null
  props: {  // props 代表元素上的所有属性, 有children属性, 描述子组件, 同样是元素
    children: [
      ""lorem"",
      {$$typeof: Symbol(react.element), type: "i", key: null, ref: null, props: {…}, …},
      {$$typeof: Symbol(react.element), type: class Children, props: {…}, …}
    ]
    className: 'container'
  }
  ref: null
  type: "div"
  _owner: ReactCompositeComponentWrapper {...} // class C 实例化后的对象
  _store: {validated: false}
  _self: null
  _source: null
}
```

每个标签, 无论是 DOM 元素还是自定义组件, 都会有 key、type、props、ref 等属性.

react 将尝试查找从上一个渲染到下一个渲染的`最小步骤数`。例如，如果我们挂
载`<mycomponent first=true/>`，将其替换为`<mycomponent first=false/>`，然后卸载
它.步骤如下

```javascript
Create node `<div className="first"><span>A Span</span></div>`

Replace attribute `className="first" by className="second"`

Replace node:`<span>A Span</span> by <p>A Paragraph</p>`

Remove node:`<div className="second"><p>A Paragraph</p></div>`
```

## Level by Level

树中元素个数为 n,将一棵树转换为另一棵树的最小操作数算法的通用方
案[最先进的算法](http://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)的
时间复杂度为 O(n^3) 。

react 只尝试逐级(Level by Level)协调树。这大大降低了复杂性，因为在 Web 应用程序
中，很少有组件被移动到树中的不同级别。
<img  src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/LevelbyLevel.png'/>

## List

假设有一个组件在一次迭代中呈现 5 个组件，下一个组件在列表中间插入一个新组件。仅
凭这些信息就很难知道如何在两个组件列表之间进行映射。默认情况下，react 将前一个列
表的第一个组件与下一个列表的第一个组件相关联。可以提供一个 key 属性，以帮助
react 找出映射。这通常很容易在 chidren 中找到一把独特的 key。
<img  src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/diff-keys.png'/>

## Components

React 应用程序通常由许多用户定义的组件组成，这些组件最终会变成一个主要由 `div`组
成的树。由于 react 只匹配具有相同 class 的组件，因此 diff 算法正在考虑这些附加信
息。例如，如果一个 `<Header>`被一个`<Block>`替换，react 将删除`<Header>`并创建一
个`<Block>`。不需要花费的时间来匹配两个不太可能有相似之处的组件。

<img  src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/react-Components.png'/>

## Rendering

#### 批处理(合并操作)

每当调用组件上的 setState 时，react 都会将其标记为`脏`。在事件循环的末尾，react
查看所有脏组件并重新渲染它们。批处理意味着在事件循环期间，只有一次更新 DOM。批处
理是构建一个性能良好的应用程序的关键，但是使用通常编写的 javascript 很难做到。在
React 应用程序中，默认情况就是批处理。

这个更新过程像是一套流程, 无论你通过 setState 跟新 props 去更新一个组件, 都会起
作用.

<img  src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/setState-dirty.png'/>

#### Sub-tree Rendering

调用 setState 时，component 会重新 render 包括子节点的 virtual DOM.如果在根元素
上调用 setstate，那么将重新 render 整个 react 应用程序。所有组件，即使它们没有更
改，也将调用它们的 render 方法。这听起来很可怕，效率也很低，但实际上，工作良好，
因为我们没有触及实际的 DOM。

首先，我们讨论的是显示用户界面。由于屏幕空间有限，显示的 DOM 元素是有限的
。Javascript 已经获得了足够快的业务逻辑，整个界面是可管理的。另一个重要的点是，
在编写 react 代码时，通常不会在每次发生变化时都在根节点上调用 setstate。您可以在
收到变更事件的组件或上面的两个组件上调用它，你很少一路走到 Root 根结点上，就是说
界面更新只出现在用户产生交互的局部.

<img  src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Sub-tree-Rendering.png'/>

## Selective Sub-tree Rendering

最后，您可以防止一些子树重新渲染。如果在组件上实现以下方法：

```javascript
boolean shouldComponentUpdate(object nextProps, object nextState)
```

根据组件的上一个和下一个`props/state`，可以告诉 React 这个组件没有更改，也不需要
重新 render 它。如果实现得当，这可以给您带来巨大的性能改进。

为了能够使用它，您必须能够比较 javascript 对象。存在许多问题，例如比较应该是浅的
还是深的；如果比较是深的，我们应该使用不变的数据结构或进行深度复制。这个函数将一
直被调用，所以要确保计算所花费的时间比启发式的时间要短，而不是呈现组件所花费的时
间，即使不严格需要重新呈现。

<img  src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/shouldComponentUpdate.png'/>

React 的性能成本模型也很容易理解：每个 setState 都会重新呈现整个子树。如果要挤出
性能，请尽可能低地调用 setState，并使用 ShouldComponentUpdate 防止重新呈现大型子
树。

## Event Delegation

将事件侦听器附加到 DOM 节点的速度非常慢，而且会消耗内存。react 使用`事件委托`,而
且考虑兼容到了 IE8，此时所有事件名称在浏览器中都是一致的。单个事件侦听器附加到文
档的根节点。当一个点击事件被触发时，浏览器会给我们提供目标 DOM 节点
(event.target.node)。为了通过 dom 层次结构传播事件，react 不会在虚拟 dom 层次结
构上迭代。相反，每个 react 组件都有一个唯一的 ID 来编码层次结构。可以使用简单的
字符串操作来获取所有父代的 ID。通过将事件侦听器存储在哈希图中，它的性能比将它们
附加到虚拟 DOM 要好。下面是通过虚拟 DOM 调度事件时发生的情况的示例。

```javascript
// dispatchEvent('click', 'a.b.c', event)
clickCaptureListeners['a'](event);
clickCaptureListeners['a.b'](event);
clickCaptureListeners['a.b.c'](event);
clickBubbleListeners['a.b.c'](event);
clickBubbleListeners['a.b'](event);
clickBubbleListeners['a'](event);
```

浏览器为每个事件和每个侦听器创建一个新的事件对象。这有一个很好的属性，您可以保留
事件对象的引用，甚至可以修改它。但是，这意味着要进行大量的内存分配。启动时响应分
配这些对象的池。每当需要事件对象时，都会从该池中重用它。这大大减少了垃圾收集。

---

1. [Virtual DOM and Internals - React](https://react.docschina.org/docs/faq-internals.html#%E4%BB%80%E4%B9%88%E6%98%AF%E8%99%9A%E6%8B%9Fdom%EF%BC%88virtual-dom%EF%BC%89)
2. [元素渲染 - React](https://react.docschina.org/docs/rendering-elements.html)
3. [Performance Calendar » React’s diff algorithm](https://calendar.perfplanet.com/2013/diff/)
4. [协调（Reconciliation） - React](https://react.docschina.org/docs/reconciliation.html#%E7%9B%AE%E7%9A%84)
