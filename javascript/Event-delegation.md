## 概念

通俗地来讲，就是把一个元素响应事件（click、keydown……）的函数委托到另一个元素；一般来讲，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，当事件响应到需要绑定的元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数。

举个例子，比如一个宿舍的同学同时快递到了，一种方法就是他们都傻傻地一个个去领取，还有一种方法就是把这件事情委托给宿舍长，让一个人出去拿好所有快递，然后再根据收件人一一分发给每个宿舍同学；

## 实操

之前写过一个[五子棋](http://localhost:3000/html/Gobang/index.html)的小游戏。如下图。每个交叉点上是一个 `span` 的元素，根结点是一个 Id 等于 root 的 Div 父元素。如下图。

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
root.onclick = function(ev) {
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

如果想像 CSS 选择其般做更加灵活的匹配的话，`event.target`的判断未免就太多了，并且很难做到灵活性，这里可以使用 Element.matches API 来匹配。

Element.matches API 的基本使用方法: `Element.matches(selectorString)`，selectorString 既是 CSS 那样的选择器规则，比如使用 `target.matches('li.class-1')`，他会返回一个布尔值，如果 target 元素是标签 li 并且它的类是 class-1 ，那么就会返回 true，否则返回 false；

## 事件冒泡

前面提到 DOM 中事件委托的实现是利用事件冒泡的机制，那么事件冒泡是什么呢？

在 document.addEventListener 的时候我们可以设置事件模型：事件冒泡、事件捕获，一般来说都是用事件冒泡的模型；

1. 捕获阶段：在事件冒泡的模型中，捕获阶段不会响应任何事件；
2. 目标阶段：目标阶段就是指事件响应到触发事件的最底层元素上；
3. 冒泡阶段：冒泡阶段就是事件的触发响应会从最底层目标一层层地向外到最外层（根节点），事件代理即是利用事件冒泡的机制把里层所需要响应的事件绑定到外层；

## 事件委托的优点

1. 减少内存消耗
2. 动态绑定事件

## 事件委托的局限性

当然，事件委托也是有一定局限性的；比如 focus、blur 之类的事件本身没有事件冒泡机制，所以无法委托；mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的；
