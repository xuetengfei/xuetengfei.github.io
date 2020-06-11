我们最终的目的浏览器能自动根据视网膜显示屏，并自动切换为 2X 或 3X 图像。

开始之前，我们要准备 3 张图：

- images100.jpg (为 1X 大小图像,100px \_ 100px)
- images200.jpg (为 2X 大小图像, 200px \_ 200px)
- images300.jpg (为 3X 大小图像, 300px \_ 300px)

## 一: 用 CSS 的媒体查询

```css
/*默认大小*/
.photo {
  width: 100px;
  height: 100px;
  background-image: url('../asset/image/image100.png');
}
/* 如果设备像素大于等于2，则用2倍图 */
@media screen and (-webkit-min-device-pixel-ratio: 2),
  screen and (min--moz-device-pixel-ratio: 2) {
  .photo {
    background-image: url('../asset/image/image200.png');
    background-size: 100px 100px;
  }
}
/* 如果设备像素大于等于3，则用3倍图 */
@media screen and (-webkit-min-device-pixel-ratio: 3),
  screen and (min--moz-device-pixel-ratio: 3) {
  .photo {
    background-image: url('../asset/image/image300.png');
    background-size: 100px 100px;
  }
}
```

## 二:img 的 srcset 属性

```html
<img
  width="100px"
  height="100px"
  src="./asset/image/image100.png"
  srcset="./asset/image/image200.png 2x, ./asset/image/image300.png 3x"
/>
```

1. [<img> 使用 srcset 属性 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#Specifications)
2. [<img> 使用 srcset 和 sizes 属性 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#Specifications)
