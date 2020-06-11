# React 优势

<!--

react 生命周期
react saga
react redux
dva
父调子方法
react context
react 路由

---

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/react-logo.svg'/ width='300px'>



<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/react-logo-1558182432.png'/>

---

2. [学习 React 之前你需要知道的的 JavaScript 基础知识 ](https://www.zcfy.cc/article/javascript-fundamentals-before-learning-react#)
3. [adam-golab/react-developer-roadmap: Roadmap to becoming a React developer in 2018](https://github.com/adam-golab/react-developer-roadmap)
4. [Introduction · React-Bits 中文版](https://hateonion.me/books/react-bits-cn/)
5. [vasanthk/react-bits: ✨ React patterns, techniques, tips and tricks ✨](https://github.com/vasanthk/react-bits)



 -->

## virtual dom

react 并不直接对 DOM 进行操作，引入了一个叫做 virtual dom 的概念，安插在 javascript 逻辑和实际的 DOM 之间，好处是减少 DOM 操作，减少 DOM 操作的目的是提高浏览器的渲染性能，因为它解决的是底层的 dom 渲染，IO 开销问题。

实际上 React 和 Vue 其实也在操作 DOM，只是比较高效地在操作 DOM 而已，虚拟 DOM 其实最终也会映射到真实 DOM，虽然虚拟 DOM 只会将变化的部分更新到真实 DOM.

## JSX

学会了 react 以及这个 JSX 语法，你不光可以通过 react 写 web；也可以通过 react-native 写 ios 或者 android 的应用；可以通过 react-blessed 写 terminal 可视化应用；当然也可以通过 react-native-desktop 写桌面应用。因为 JSX 这种声明式语法实际是在构建一个抽象的视图层，这种抽象可以通过不同适配器适配到各种显示终端.

## unidirectional data flow 单向数据流

React 倡导使用 Flux 模式来进行组件间数据传输，这种做法叫 unidirectional data flow (单向数据流)，单向数据流的好处是与之前 angularJS / Vue 提出的 two way data binding 相比较而言，因为单向，所以各种变化都是可预计、可控制的。不像 two way data binding 那样，变化一但复杂起来，大家都互相触发变化，到最后一个地方变了，根本猜不出来她还会导致其他什么地方跟着一起变。这个需要大量实践才能有所感受。

## react 项目结构更加清晰：

componen、css、redux、action，分门别类地存放,易维护,出了问题好找原因

<!-- virtual dom、redux、action，分部分别存放，就象 java 写后台查数据本来用 jdbc 一条 sql 就搞定,但分成 action service dao 分门别类地存放,易维护,出了问题好找原因。 -->

## component

一切都是 component：代码更加模块化，重用代码更容易，可维护性高。

<!--
总结下，看看一个人的组件化水准，

pure component
functional component
smart, dumb component
higher order component
hoc render hijacking
会用 props.children React.children cloneElement
提供 instance method
context
并理解react 内部实现原理

懂 setState  是异步的
懂 synthetic event
懂 react-dom 分层和 react 没有关系
懂 reconciler
懂 fiber
 -->

<!-- setState()函数在任何情况下都会导致组件重渲染吗？如果setState()中参数还是原来没有发生任何变化的state呢？

对setState用得深了，就容易犯错，所以我们开门见山先把理解setState的关键点列出来。

setState不会立刻改变React组件中state的值；
setState通过引发一次组件的更新过程来引发重新绘制；
多次setState函数调用产生的效果会合并
setState后，知道reader时，才真正改变state的值
shouldComponentUpdate函数返回false，因为更新被中断，所以不调用render，但是React不会放弃掉对this.state的更新的，依然会更新this.state
传入 setState 函数的第二个参数的作用是什么？

该函数会在setState函数调用完成并且组件开始重渲染的时候被调用，我们可以用该函数来监听渲染是否完成（一般没有什么卵用）

 调用 setState 之后发生了什么？

 在代码中调用setState函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个UI界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

用shouldComponentUpdate做优化的意义大吗？shouldComponentUpdate将带来可测量和可感知的提升？

如果不能，那就别用：你可能应该避免用它。据React团队的说，shouldComponentUpdate是一个保证性能的紧急出口，意思就是你不到万不得已就别用它。具体参考：什么时候使用shouldComponentUpdate方法?

一般情况下setState() 确立后总是触发一次重绘，除非在 shouldComponentUpdate() 中实现了条件渲染逻辑。如果使用可变的对象，但是又不能在 shouldComponentUpdate() 中实现这种逻辑，仅在新 state 和之前的 state 存在差异的时候调用 setState() 可以避免不必要的重新渲染。

react异步数据如ajax请求应该放在哪个生命周期？

对于同步的状态改变，是可以放在componentWillMount，对于异步的，最好好放在componentDidMount。但如果此时有若干细节需要处理，比如你的组件需要渲染子组件，而且子组件取决于父组件的某个属性，那么在子组件的componentDidMount中进行处理会有问题：因为此时父组件中对应的属性可能还没有完整获取，因此就让其在子组件的componentDidUpdate中处理。

具体参考：《react异步数据如ajax请求应该放在哪个生命周期？》

React 中的 keys 是什么，为什么它们很重要？

在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 Key 的重要性。

keys 是帮助 React 跟踪哪些项目已更改、添加或从列表中删除的属性。

每个keys 在兄弟元素之间是独一无二的。我们已经谈过几次关于一致化处理（reconciliation）的过程，而且这个一致化处理过程（reconciliation）中的一部分正在执行一个新的元素树与最前一个的差异。keys 使处理列表时更加高效，因为 React 可以使用子元素上的 keys 快速知道元素是新的还是在比较树时才被移动的。

而且 keys 不仅使这个过程更有效率，而且没有keys，React 不知道哪个本地状态对应于移动中的哪个项目。所以当你 map 的时候，不要忽略了 keys 。

受控组件( controlled component )与不受控制的组件( uncontrolled component )有什么区别？

React 的很大一部分是这样的想法，即组件负责控制和管理自己的状态（任何改变代用setSate处理)

那么不受控组件呢？组件数据不全部是setState来处理，还有DOM交互，比如refs这玩意来操控真实DOM

虽然不受控制的组件通常更容易实现，因为您只需使用引用从DOM获取值，但是通常建议您通过不受控制的组件来支持受控组件。

主要原因是受控组件支持即时字段验证，允许您有条件地禁用/启用按钮，强制输入格式，并且更多的是 『the React way』。 -->

<!--
[重谈react优势——react技术栈回顾 - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1177447)
 -->
