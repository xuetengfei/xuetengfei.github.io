# JavaScript 立即执行函数表达式(IIFE)用例

## 函数作用域 VS 块级作用域

通过 var 关键字声明的本地变量仅作用于当前闭包域，如果不存在这样的一个闭包函数，那么一个会污染全局作用域的全局变量将会被创建。为了防止这种情况出现，我们可以使用 IIFE 来创建一个包含有这个本地变量的函数。

```javascript
(function() {
  var a = 10;
  function me() {
    console.log('hello world!');
  }
})();

// IIFE 里面的 ` 变量 ` 和 ` 函数 ` 对外不可见
```

我们可以使用在 ES6 块级作用域变量来代替 IIFE，以达到相同的效果。
相比于函数级作用域，let 和 const 关键字声明的本地变量仅作用于当前所处的"块"级域。

```javascript
{
  var a = 10;
  function me() {
    console.log('hello world!');
  }
}
```

## 闭包和私有数据

```javascript
const accseeID = (num => {
  let count = num;
  let self = {
    add: function() {
      count++;
      return count;
    },
    reduce: function() {
      return count--;
    },
  };
  return self;
})(100);

const ID = accseeID.add();
console.log(ID); // 101
```

```javascript
let stopBodyScroll = (() => {
  let bodyEl = document.body;
  let topH = 0;
  return isFixed => {
    if (isFixed) {
      topH = window.scrollY;
      bodyEl.style.position = 'fixed';
      bodyEl.style.top = -topH + 'px';
    } else {
      bodyEl.style.position = '';
      bodyEl.style.top = '';
      window.scrollTo(0, topH);
    }
  };
})();

let open = () => {
  stopBodyScroll(true);
};
let close = () => {
  stopBodyScroll(false);
};
```
