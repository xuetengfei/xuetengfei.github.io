页面滚动为例子，直接看代码。

### 函数节流: throttle

```javascript
window.addEventListener(
  'scroll',
  throttle(() => {
    console.log(`window is scroll`);
  }, 500),
);

function throttle(fn, waitTime) {
  let flag = true;
  return function () {
    if (!flag) {
      return;
    }
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, waitTime);
  };
}
```

### 函数防抖: deBounce

```javascript
window.addEventListener(
  'scroll',
  deBounce(() => {
    console.log(`window is scroll`);
  }, 500),
);

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

?> fn.apply(this, arguments)

调用 fn 的时候都是用的`fn.apply(this, arguments)`。主要原因是为了 fn 函数内的 this 与原本的事件回调函数绑定的 this 保持一致。

---

1 .[debounce & throttle demonstrate](http://demo.nimius.net/debounce_throttle/)
