## 概念

通俗地来讲，就是把一个元素响应事件（click、keydown……）的函数委托到另一个元素；一
般来讲，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的
是外层元素，当事件响应到需要绑定的元素上时，会通过事件冒泡机制从而触发它的外层元
素的绑定事件上，然后在外层元素上去执行函数。

举个例子，比如一个宿舍的同学同时快递到了，一种方法就是他们都傻傻地一个个去领取，
还有一种方法就是把这件事情委托给宿舍长，让一个人出去拿好所有快递，然后再根据收件
人一一分发给每个宿舍同学；

## 实操

之前写过一个[五子棋](http://localhost:3000/html/Gobang/index.html)的小游戏。如下
图。每个交叉点上是一个 `span` 的元素，根结点是一个 Id 等于 root 的 Div 父元素。
如下图。

<div class='lightbox'>
<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Event-delegation-1.jpg" width='300px' />
<div></div>
<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Event-delegation-2.jpg" width='300px' />
</div>

下棋子的过程肯定是一个点击事件。怎么去写这个绑定事件呢？

### 第一种办法:低效的循环绑定事件

```javascript
document.querySelectorAll('span').forEach(el =>
  el.addEventListener('click', e => {
    target.setAttribute('data-available', 'false');
    target.classList.add(currentSide == BLACK ? 'black' : 'white');
  }),
);
```

### 第二种办法:使用事件委托代码

部分代码

```javascript
const root = document.getElementById('root');
root.onclick = function (ev) {
  var ev = ev || window.event;
  var target = ev.target || ev.srcElement;
  if (target.nodeName.toLowerCase() == 'span') {
    if (target.dataset.available == 'true') {
      target.setAttribute('data-available', 'false');
      target.classList.add(currentSide == BLACK ? 'black' : 'white');
    }
  }
};
```

## 使用 event.target 匹配

[Event | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)

```javascript
e.target;
e.target.id;
e.target.tagName;
e.target.nodeName;
e.target.classList;
e.target.className;
e.target.innerHTML;
e.target.innerText;
```

## 使用 Element.matches 精确匹配

如果想像 CSS 选择其般做更加灵活的匹配的话，`event.target`的判断未免就太多了，并
且很难做到灵活性，这里可以使用 Element.matches API 来匹配。

Element.matches API 的基本使用方法:
`Element.matches(selectorString)`，selectorString 既是 CSS 那样的选择器规则，比
如使用 `target.matches('li.class-1')`，他会返回一个布尔值，如果 target 元素是标
签 li 并且它的类是 class-1 ，那么就会返回 true，否则返回 false；

## 事件冒泡

前面提到 DOM 中事件委托的实现是利用事件冒泡的机制，那么事件冒泡是什么呢？

```html
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">
  FORM
  <div onclick="alert('div')">
    DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

点击内部的 <p> 会首先运行 onclick：

```bash
1.在该 <p> 上的。
2.然后是外部 <div> 上的。
3.然后是外部 <form> 上的。
4.以此类推，直到最后的 document 对象。
```

![20220304-HamAEx-440_22631010920_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220304-HamAEx-440_22631010920_.jpg)

因此，如果我们点击`<p>`，那么我们将看到 3 个 alert：`p → div → form`。

这个过程被称为“冒泡（bubbling）”，因为事件从内部元素“冒泡”到所有父级，就像在水里
的气泡一样。冒泡事件从目标元素开始向上冒泡。通常，它会一直上升到 <html>，然后再
到 document 对象，有些事件甚至会到达 window，它们会调用路径上所有的处理程序。

!> 程序都可以决定事件已经被完全处理，并停止冒泡。方法是
event.stopPropagation()。

!> 大多数事件的确都是冒泡的,focus 事件不会冒泡。这仍然是例外，而不是规则。

在 document.addEventListener 的时候我们可以设置事件模型：事件冒泡、事件捕获，一
般来说都是用事件冒泡的模型；

1. 捕获阶段：在事件冒泡的模型中，捕获阶段不会响应任何事件；
2. 目标阶段：目标阶段就是指事件响应到触发事件的最底层元素上；
3. 冒泡阶段：冒泡阶段就是事件的触发响应会从最底层目标一层层地向外到最外层（根节
   点），事件代理即是利用事件冒泡的机制把里层所需要响应的事件绑定到外层

## 事件委托的优点

1. 减少内存消耗
2. 动态绑定事件

## 事件委托的局限性

当然，事件委托也是有一定局限性的；比如 focus、blur 之类的事件本身没有事件冒泡机
制，所以无法委托；mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通
过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的；

## menu

```html
<div id="menu">
  <button data-action="save">Save</button>
  <button data-action="load">Load</button>
  <button data-action="search">Search</button>
</div>
<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this); // (*)
    }
    save() {
      alert('saving');
    }
    load() {
      alert('loading');
    }
    search() {
      alert('searching');
    }
    onClick(event) {
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
    }
  }
  new Menu(menu);
  console.log(document.getElementById('menu') === menu); // true.
</script>
```

[event-delegation-menu-usage-live-demo](https://xuetengfei.github.io/html/event-delegation-usage-demo.html)
