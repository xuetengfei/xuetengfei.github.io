## ResizeObserver

[ResizeObserver - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)

ResizeObserver 接口可以监听到 Element 的内容区域或 SVGElement 的边界框改变。内容
区域则需要减去内边距 padding。

ResizeObserver 避免了在自身回调中调整大小，从而触发的无限回调和循环依赖。它仅通
过在后续帧中处理 DOM 中更深层次的元素来实现这一点。如果（浏览器）遵循规范，只会
在绘制前或布局后触发调用。

```javascript
// 通过观察box的宽度变化从而改变其边框圆角半径。
const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    entry.target.style.borderRadius =
      Math.max(0, 250 - entry.contentRect.width) + 'px';
  }
});
resizeObserver.observe(document.querySelector('.box:nth-child(2)'));
```

## MutationObserver

MutationObserver 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation
Events 功能的替代品，该功能是 DOM3 Events 规范的一部分。

```javascript
// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.');
    } else if (mutation.type === 'attributes') {
      console.log('The ' + mutation.attributeName + ' attribute was modified.');
    }
  }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();
```

## IntersectionObserver

[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)接
口 (从属于 IntersectionObserver API) 提供了一种异步观察目标元素与其祖先元素或顶
级文档视窗(viewport)交叉状态的方法。祖先元素与视窗 (viewport)被称为根(root)。

当一个 IntersectionObserver 对象被创建时，其被配置为监听根中一段给定比例的可见区
域。一旦 IntersectionObserver 被创建，则无法更改其配置，所以一个给定的观察者对象
只能用来监听可见区域的特定变化值；然而，你可以在同一个观察者对象中配置监听多个目
标元素。

```javascript
var intersectionObserver = new IntersectionObserver(function (entries) {
  // If intersectionRatio is 0, the target is out of view
  // and we do not need to do anything.
  if (entries[0].intersectionRatio <= 0) return;

  loadItems(10);
  console.log('Loaded new items');
});
// start observing
intersectionObserver.observe(document.querySelector('.scrollerFooter'));
```

[Learn Intersection Observer In 15 Minutes - YouTube](https://www.youtube.com/watch?v=2IbRtjez6ag&t=20s)
