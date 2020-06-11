## rem

相对长度单位 rem:单位表示根元素的字体大小（通常`<html>`）。  
在根元素字体大小内使用时，它表示其初始值（常用浏览器默认值为 16px，但用户定义的首选项可能会修改此值）。

## JS 方法设置 rem

利用 JS 设置根字体大小，所以若改变发生在渲染完成之后，则会引起回流，导致闪屏现象。因此使用这种方法时，应`将 JS 代码放入 head 头部中并且在 CSS 引入之前`。

```javascript
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
    };
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
})(document, window);
```

1. 由于提供的设计稿现在基本都是以 iPhone6/7/8 为参考的，宽度为 750px，dpr 为 2，所以计算 rem 时的参考屏幕宽度可以设置为 375 (750/2)
2. 由于 chrome 默认 fontSize 是 16px,最小字体是 12px ，又为了计算方便，所以可以设置 1rem 的大小为 20px

应用过程中，比如我们拿到了一个 750 的设计稿，那么首先，将设计稿里的数值除以 2，得到按手机屏幕大小布局的数值（这也是 375 的由来）。然后，再除以 20 就可以将设计稿中的 px 转化为 rem 了。

现在，为了方便计算，把默认根字体 16px 重新定义为 20px，那么 css 中单位尺寸该怎么写呢？

## px2remConfig.scss

```css
$font: 20; /* 默认根字体 16px 修改为 20px */
$screen: 750; /*假设现在UI妹子给的图就是750px的，按照实际情况自行修改 */

@function px2rem($n) {
  @return #{$n/($screen * $font/375)}rem;
  /* width:750px;dpr:2  */
}
* {
  margin: 0;
  padding: 0;
}
/* 不用修改 */
html,
body {
  font-size: 1rem;
}
/* 使用 px2rem */
.box {
  font-size: 0;
  img {
    width: px2rem(200);
    /* UI妹子给的设计图总宽度 750px,其中这个img标注的宽度是 200px，修改单位:px --> rem */
    height: px2rem(200);
  }
}
```

## 编译后的 css

```css
* {
  margin: 0;
  padding: 0;
}
html,
body {
  font-size: 1rem;
}
.box {
  font-size: 0;
}
.box img {
  width: 5rem;
  height: 5rem;
}
```

---

## 完整代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>test rem</title>
    <script>
      (function(doc, win) {
        var docEl = doc.documentElement,
          resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
          recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
            const root = document.getElementsByTagName('html')[0];
            const h1 = document.getElementsByTagName('h1')[0];
            h1.innerText = 'h1 fontSize is:' + window.getComputedStyle(h1, null).fontSize;
          };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
      })(document, window);
    </script>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      html,
      body {
        font-size: 1rem;
      }
      .box {
        font-size: 0;
      }
      .box img {
        width: 5rem;
        height: 5rem;
      }
    </style>
  </head>
  <body>
    <div>
      <h1 style="color:blue;font-size:1rem;"></h1>
      <p style="font-size:0.5rem;">
        Maecenas velit habitant nascetur purus consectetur laoreet posuere, proin nec nam
        mollis lorem vestibulum enim dolor, arcu mus a hendrerit iaculis orci.
      </p>
      <div class="box">
        <img src="https://ss1.bdstatic.com/70cFvXSh.jpg" alt="img" />
      </div>
    </div>
  </body>
</html>
```

## 截图说明

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/remUnit-1554395523.jpg'/>

---

1. [关于移动端适配，必须要知道的](https://segmentfault.com/a/1190000019207842#articleHeader14)
