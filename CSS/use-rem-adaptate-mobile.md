## rem

表示根元素（通常为`<html>`）的字体大小,通用浏览器默认值为 16px。

```javascript
const root = document.getElementsByTagName('html')[0];
console.log(window.getComputedStyle(root, null).fontSize); //16px
```

[CSS/length#rem | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/length#rem)

rem 和 em 单位是由浏览器基于你的设计中的字体大小计算得到的像素值。

em 单位转为像素值，取决于他们使用的字体大小。 此字体大小受从父元素继承过来的字体
大小，除非显式重写与一个具体单位。 em 单位可能受任何继承的父元素字体大小影响。例
如，如果一个 div 字体大小为 18px ，10em 将等同于 180px，即 10 × 18 = 180。

rem 单位翻译为像素值是由 html 元素的字体大小决定的。 此字体大小会被浏览器中字体
大小的设置影响，除非显式重写一个具体单位。 rem 单位可以从浏览器字体设置中继承字
体大小。例如，根元素的字体大小 16px，10rem 将等同于 160px，即 10 x 16 = 160。

Chrome 默认 fontSize 是 16px,最小字体是 12px 吧

## 利用 rem 做适配

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>rem</title>
    <script src="./asset/js/calc-rem.js"></script>
    <link rel="stylesheet" href="./asset/style/px2remConfig.css" />
  </head>
  <body>
    <div>
      <h1>Lorem ipsum dolo</h1>
      <p>
        开发者都知道Chrome的最小字体是12px吧。所以当你设置html为font-size:62.5%时候,
        其实1rem=12px(算下div2的50rem12是不是600px,10rem12是不是120px)。O(∩_∩)O~~
      </p>
      <div class="box"><img src="" alt="" /></div>
    </div>
  </body>
</html>
```

```javascript
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 16 * (clientWidth / 320) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```

```sass
// font-size:16 不可修改
$font: 16;

// 按住实际的设计图尺寸修改
$screen: 750;

@function px2rem($n) {
  @return #{$n/($screen * $font/320)}rem;
}

// 不用修改
html,
body {
  font-size: 1rem;
}

// 使用 px2rem
.box {
  font-size: 0;
  img {
    width: px2rem(200);
    height: px2rem(200);
  }
}

```

在不同的屏幕尺寸下，rem 转换为 px 是不同的。在这里我们初始设置 320px
htmlfont-size:16px

| device-width(px) | root-font-size (1rem=?px)   |
| ---------------- | --------------------------- |
| 320px            | 16px                        |
| 375px            | 18.75px = 375/32016 = 18.75 |
| 750px            | 37.5px                      |

当我们拿到 750px 的设计图时候，有一个 200\*200px 的图片,那么这张图片在 375px 的
设备上显示为多少 rem？设图片在 375px 的宽度是 x,那么 750/200 = 375/ x；x = 100;
图片宽度即为 100/18.75 约为 5.33rem。交给 sass，或是 less 去换算编译。

```javascript
 img {
    width: px2rem(200);
    height: px2rem(200);
  }
```

```javascript
width: px2rem(200) ==   200/(750 * 16/320)   = 5.33333rem;
```

这个 rem 适配我们一般用到布局计算，相当于设计图在不同设置上面，放大缩小而已。字
体还是用 px 比较合适

---

rem  
使用场景：对于图片等对高度自适应有要求的场景  
rem 单位：以页面根字体的大小，也就是 html 元素字体的大小为基准，例如

```html
html{ font-size:16px; }
```

那么 1rem 等于 16px。 所以使用时，我们只要让根字体大小随屏幕大小自适应，那页面中
所有使用 rem 单位来设置宽高的元素，大小也会随屏幕大小自适应了。根据不同屏幕大小
设置根字体大小有两种方法：

## 1、css 方法设置 rem

利用媒体查询，根据不同的屏幕大小进行设置，缺点就是一般只列举一些代表性的屏幕大小
，自适应不能充分覆盖所有范围

```css
html {
  font-size: 10px;
}
@media screen and (min-width: 321px) and (max-width: 375px) {
  html {
    font-size: 11px;
  }
}
@media screen and (min-width: 376px) and (max-width: 414px) {
  html {
    font-size: 12px;
  }
}
@media screen and (min-width: 415px) and (max-width: 639px) {
  html {
    font-size: 15px;
  }
}
@media screen and (min-width: 640px) and (max-width: 719px) {
  html {
    font-size: 20px;
  }
}
@media screen and (min-width: 720px) and (max-width: 749px) {
  html {
    font-size: 22.5px;
  }
}
@media screen and (min-width: 750px) and (max-width: 799px) {
  html {
    font-size: 23.5px;
  }
}
@media screen and (min-width: 800px) {
  html {
    font-size: 25px;
  }
}
```

2、JS 方法设置 rem 利用 JS 设置根字体大小，所以若改变发生在渲染完成之后，则会引
起回流，导致闪屏现象。因此使用这种方法时，应将 JS 代码放入 head 头部中并且在 CSS
引入之前。

```javascript
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
    };
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
})(document, window);
```

上面 clientWidth 为实际屏幕的宽度，而 375 为设计稿基于的参考屏幕宽度，20 则是当
实际屏幕宽度等于参考屏幕宽度时，1rem 的大小。代码的关键参数 20 和 375 是这样设置
的：

a) 由于提供的设计稿现在基本都是以 iPhone6/7/8 为参考的，宽度为 750px，dpr 为 2，
所以计算 rem 时的参考屏幕宽度可以设置为 375。  
b) 由于 chrome 的最小字体是 12px，又为了计算方便，所以可以设置 1rem 的大小为
20px 应用过程中，比如我们拿到了一个 750 的设计稿，那么首先，将设计稿里的数值除以
2，得到按手机屏幕大小布局的数值（这也是 375 的由来）。然后，再除以 20 就可以将设
计稿中的 px 转化为 rem 了。

三、媒体查询使用场景：一般利用媒体查询来进行特殊处理，比如 1、iphoneX 这类全屏的
适配 2、在适配 dpr 为 3 的 iPhone Plus 或者 pad 横屏等超级大屏时，需要根据业务需
求设置临界值，然后展示不同内容或者替换不同分辨率图片（也就是常说的 2 倍图、3 倍
图的使用）等

四、vw、vh vw 是以屏幕宽度为基准的百分比单位，1vw=1%_ deviceWidth vh 是以屏幕高
度为基准的百分比单位，1v=1% _ deviceHeight vw,vh 确实很好用，但是目前使用时仍需
考虑兼容性的问题，在国内一些手机自带浏览器里（比如华为）会失效，并且据说碰上 X5
内核时也容易踩坑 。

---

1. [综合指南: 何时使用 Em 与 Rem](https://webdesign.tutsplus.com/zh-hans/tutorials/comprehensive-guide-when-to-use-em-vs-rem--cms-23984)
2. [了解并使用 CSS 中的 rem 单位 - 众成翻译](https://www.zcfy.cc/article/understanding-and-using-rem-units-in-css)
3. [关于移动端 rem 布局的一些总结 - 我的前端探索 - SegmentFault 思否](https://segmentfault.com/a/1190000003690140?_ea=746493)
4. [移动前端自适应适配方法总结-前端开发博客](http://caibaojian.com/mobile-responsive.html)
5. [细说移动端 REM、VW](http://www.cnblogs.com/imwtr/p/9648233.html)
6. [imwtr/rem-vw-layout: 移动端 REM 布局 与 Viewport (VW) 布局的实例运用](https://github.com/imwtr/rem-vw-layout)
7. [移动端适配大法 - 腾讯 Web 前端 IMWeb 团队社区 | blog | 团队博客](https://imweb.io/topic/5b8f6a1580495bb24c9217ac)
