`React.Component`是一个抽象基础类，因此直接引用`React.Component`几乎没意义。相反，你通常会`继承`自它，并至少定义一个`render()`方法。每一个组件都有几个你可以重写以让代码在处理环节的特定时期运行的`生命周期方法`。方法中带有前缀 `will-` 的在特定环节`之前`被调用，而带有前缀 `did-` 的方法则会在特定环节`之后`被调用。

## 常用的生命周期

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/life-cycle-1-1550997219.jpg'/>

## 完整的生命周期(包括不常用)

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/life-cycle-2-1550997219.jpg'/>

---

1. [React lifecycle methods diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
