页面滚动为例子，直接看代码。

![20220307-1mnAT6-Xnip2022-03-07_09-52-49](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220307-1mnAT6-Xnip2022-03-07_09-52-49.jpg)

## 函数防抖: deBounce

Debounce 是将多个连续调用“组合”在一个中，每次触发事件时都取消之前的延时调用方法
。 触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新
计算时间。

```javascript
window.addEventListener(
  'scroll',
  deBounce(() => {
    console.log(`window is scroll`);
  }, 500),
);

function sayHi() {
  console.log('deBounce');
}

var inp = document.getElementById('inp');
inp.addEventListener('input', debounce(sayHi)); // 防抖

function deBounce(fn, interval) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, interval);
  };
}
```

## 函数节流: throttle

高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率。每次触发事
件时都判断当前是否有等待执行的延时函数

```javascript
window.addEventListener(
  'scroll',
  throttle(() => {
    console.log(`window is scroll`);
  }, 500),
);

function throttle(fn,waitTime) {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
    canRun = false; // 立即设置为false
    setTimeout(() => {
      fn.apply(this, arguments);
      // 将外部传入的函数的执行放在setTimeout中
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
      // 当定时器没有执行的时候标记永远是false，在开头被return掉
      canRun = true;
    }, waitTime);
  };
}

function sayHi() {
  console.log('throttle');
}

window.addEventListener('resize', throttle(sayHi，300));
```

## fn.apply

?> fn.apply(this, arguments)

调用 fn 的时候都是用的`fn.apply(this, arguments)`。主要原因是为了 fn 函数内的
this 与原本的事件回调函数绑定的 this 保持一致。

## requestAnimationFrame

rAF

<!-- 节流替代品，当函数重新计算和渲染元素在屏幕上，想保证平滑的变化或动画。 -->

window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在
`下次重绘之前`调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该
回调函数会在浏览器下一次重绘之前执行。

![20220404-iA65D2-9f86c81e18fd5bc4](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220404-iA65D2-9f86c81e18fd5bc4.png)

### Simplest Example

```javascript
function repeatOften() {
  // Do whatever
  requestAnimationFrame(repeatOften);
}
requestAnimationFrame(repeatOften);
// 调用一次即可启动它，函数会递归调用自身
```

<a target='_blank' href='./html/requestAnimationFrame.html'>requestAnimationFrame
scroll html</a>

---

1. [Debouncing and Throttling Explained Through Examples | CSS-Tricks - CSS-Tricks](https://css-tricks.com/debouncing-throttling-explained-examples/)
2. [Scroll comparison requestAnimationFrame vs throttle](https://codepen.io/dcorb/pen/pgOKKw)
3. [window.requestAnimationFrame - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)
4. [Using requestAnimationFrame | CSS-Tricks - CSS-Tricks](https://css-tricks.com/using-requestanimationframe/)
