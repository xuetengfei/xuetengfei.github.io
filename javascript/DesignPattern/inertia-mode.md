> 惰性模式: 减少条件分支判断

减少每次代码执行时的重复性的分支判断，通过对对象重新定义来屏蔽原对象的分支判断

```javascript
//  #el {
//      color: #ff0;
//    }
//  <div id="el">Lorem ipsum!</div>

// 浏览器性能监测，获取元素的 css 样式
let getStyle = function(elem) {
  // 也可以这样写 if (window.getComputedStyle)
  if ('getComputedStyle' in window) {
    getStyle = elem => {
      console.log(1);
      console.log(window.getComputedStyle(elem));
    };
  } else {
    getStyle = elem => {
      console.log(window.currentStyle(elem));
    };
  }
  // 原始函数在函数的最末尾重新执行一遍来绑定事件，
  // 还需要某一元素来绑定事件才能重新覆盖原函数
  getStyle(elem);
};

let a = document.getElementById('el');

getStyle(a);
// 此时，getStyle 第一次被调用，原函数被修改
// 打印出 '1' 和对应的结果 (CSSStyleDeclaration)
```

一个普通的浏览器嗅探技术，每次都要调用 addEvent 进行判断，执行 if 语句。
惰性加载函数，相当于重新封装一次 addEvent，页面一加载就加载 addEvent 函数，这个跟前面的很像，只不过是在函数内部重写 addEvent

```html
<body>
    <div id="div1">div1</div>
</body>

<script type="text/javascript">
var addEvent = function(elem, type, handler) {
    if (window.addEventListener) {
        addEvent = function(elem, type, handler) {
            console.log('chrome addEvent');
            elem.addEventListener(type, handler, false)
        }
    } else if (window.attachEvent) {
        addEvent = function(elem, type, handler) {
            console.log('ie addEvent');
            elem.attachEvent('on' + type, handler)
        }
    }
    addEvent(elem, type, handler)
}
var div = document.getElementById('div1');
addEvent(div, 'click', function() {
    alert(1);
})
addEvent(div, 'click', function() {
    alert(2)
})
</script>
```
