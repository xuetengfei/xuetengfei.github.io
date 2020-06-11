## 布局方案

1. 静态布局:直接使用 px 作为单位
2. 流式布局:宽度使用%百分比，高度使用 px 作为单位
3. 自适应布局:创建多个静态布局，每个静态布局对应一个屏幕分辨率范围。使用 @media 媒体查询来切换多个布局
4. 响应式布局:通常是糅合了流式布局+弹性布局，再搭配媒体查询技术使用
5. 弹性布局:通常指的是 rem 或 em 布局。
6. Flexbox
7. Grid

## 物理像素(physical pixel)

物理像素又被称为设备像素，它是显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。正是这些设备像素的微小距离欺骗了我们肉眼看到的图像效果。

## 设备独立像素(density-independent pixel)

设备独立像素也称为密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说 CSS 像素)，然后由相关系统转换为物理像素。

## CSS 像素

CSS 像素是一个抽像的单位，主要使用在浏览器上，用来精确度量 Web 页面上的内容。一般情况之下，CSS 像素称为与设备无关的像素(device-independent pixel)，简称 DIPs。

## 屏幕密度

屏幕密度是指一个设备表面上存在的像素数量，它通常以每英寸有多少像素来计算(PPI)。

## 设备像素比(device pixel ratio)

设备像素比简称为，其定义了物理像素和设备独立像素的对应关系。

```
设备像素比( dpr) ＝ 物理像素 / 设备独立像素
```

在`Javascript`中，可以通过 `window.devicePixelRatio` 获取到当前设备的`dpr`。

在`css` 中，可以通过 `-webkit-device-pixel-ratio`，`-webkit-min-device-pixel-ratio`和 -`webkit-max-device-pixel-ratio`进行媒体查询，对不同 dpr 的设备，做一些样式适配。或者使用 `resolution | min-resolution | max-resolution`这些比较新的标准方式

## 视窗 viewport

简单的理解，viewport 是严格等于浏览器的窗口。在桌面浏览器中，viewport 就是浏览器窗口的宽度高度。但在移动端设备上就有点复杂。移动端的 viewport 太窄，为了能更好为 CSS 布局服务，所以提供了两个 viewport:虚拟的 visualviewport 和布局的 layoutviewport。[viewports 剖析\_viewports](https://www.w3cplus.com/css/viewports.html)

- vw : 1vw 等于视窗宽度的 1%
- vh : 1vh 等于视窗高度的 1%
- vmin : 选取 vw 和 vh 中最小的那个
- vmax : 选取 vw 和 vh 中最大的那个

## VW 布局

使用 sass 等预编译,将`px 数字单位`转换为`vw、vh 比例单位`

```sass
/*   px2vwConfig.scss */
/* 移动端页面设计稿宽度 */
$design-width: 750;
/* 移动端页面设计稿dpr基准值 */
$design-dpr: 2;

/*
    vw与px对应关系，100vw为视窗宽度，$vw即为$px对应占多宽

        $px                    $vw
    -------------    ===    ------------
    $design-width              100vw
*/

/* 单位px转化为vw */
@function px2vw($px) {
  @return ($px / $design-width) * 100vw;
}

/* 单位vw转化为px，可用于根据vw单位快速计算原px */
@function vw2px($vw) {
  @return #{($vw / 100) * $design-width}px;
}
```

好的，我现在手里有一份设计图,`750\*1334px`,有一个 div 标注的宽度为 `187.5px`;

```sass
@import './px2vwConfig.scss';

.reac2 {
  width: px2vw(187.5);
  height: 300px;
  background-color: salmon;
}
```

```css
@charset "UTF-8";
.reac2 {
  width: 25vw;
  height: 300px;
  background-color: salmon;
}
```

那么换算过来，这个`<div class="reac2"></div>`其实是占了 1/4 的宽度,也就是`width: 25vw;`
在不同宽度的设备下都是占据 1/4 的宽度。

## VS code 插件

不想使用预编译的方式，也可以集合插件。

[liurongqing/px2vw: vscode 插件 将 px 转 vw](https://github.com/liurongqing/px2vw)

根据设计稿宽度设置大小，默认：750，之后就可以直接按设计稿大小编写。

```
px2vw.width 设计宽度
px2vw.toFixedNum 保留小数
```

<img src='https://github.com/liurongqing/px2vw/raw/master/screenshots/px2vw.gif'>
