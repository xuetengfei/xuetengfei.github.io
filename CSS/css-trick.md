### css-技巧(不定期更新)

> 为了增强可访问性,让自己不忘给图片加上`alt`属性,可以加入如下全局`css样式`

```css
img[alt=''],
img:not([alt]) {
  border: 5px dashed #c00;
}
```

> 想要知道页面的布局,可以加入如下全局`css样式`

```css
* {
  outline: 3px solid #000;
}
```

> css3 属性-webkit-font-smoothing.非标准属性

```css
<!---webkit-font-smoothing它有三个属性值--><!--none：对低像素的文本比较好subpixel-antialiased：默认值antialiased：抗锯齿很好-->-webkit-font-smoothing: antialiased;
```

> 如何修改 placeholder 的文字颜色？适合多种浏览器

```css
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #909;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #909;
  opacity: 1;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #909;
  opacity: 1;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #909;
}
::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #909;
}
```

> 两列右侧自适应布局

```html
<div class="g-bg">
  <div class="g-SL">
    <p>左侧固定宽度</p>
  </div>
  <div class="g-SR">
    <div class="g-SRContent">
      <p>右侧弹性宽度</p>
    </div>
  </div>
</div>
```

```css
.g-bg {
  width: 100%;
  height: 400px;
  .g-SL {
    position: relative;
    float: left;
    height: 100%;
    width: 190px;
    margin-right: -190px;
  }
  .g-SR {
    float: right;
    height: 100%;
    width: 100%;
    .g-SRContent {
      height: 100%;
      margin-left: 200px;
    }
  }
}
```

---

> 自定义滚动条

[链接](http://f2ex.cn/customize-the-browser-scrollbar-with-css/)

```css
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 16px;
  height: 16px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
```

---

> 现在很多 for Mobile 的 HTML5 网页内都有快速滚动和回弹的效果，看上去和原生 app
> 的效率都有得一拼。要实现这个效果很简单，只需要加一行 css 代码即可：

```css
-webkit-overflow-scrolling: touch;
/* auto| touch */
```

[mozilla 的解释](https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-overflow-scrolling)

---

> 移动端网页点击链接出现蓝色背景修复

```css
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```

---

> CSS 实现单行、多行文本溢出显示省略号（…）

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

---

> 多行文本溢出显示省略号

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

---

> CSS3 技巧：fit-content 水平居中

```html
<ul>
  <li><a href="/">首页</a></li>
  <li><a href="/">关于我们</a></li>
  <li><a href="/">产品展示</a></li>
  <li><a href="/">客户支持</a></li>
  <li><a href="/">联系我们</a></li>
</ul>
```

```css
ul {
  width: -moz-fit-content;
  width: -webkit-fit-content;
  width: fit-content;
  margin: auto;
}

li {
  float: left;
}
```

---

> lorem + 单词数量即可生成大量假乱字符

`lorem 10` 然后 `tab` 键

---

> ul 里面的 li 加下边框,又想去掉最后一个 li 的下边框,我们可以使用:not()伪类

```css
.nav li:not(:last-child) {
  border-bottom: 1px solid #eee;
}
```

---

> 给网页加上好看的顶部阴影

```css
body::before {
  content: '';
  position: fixed;
  top: -10px;
  left: 0;
  width: 100%;
  height: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}
```

---

> css 选择器

```css
li {
  display: none;
}

/* 选择 1 到 3  */

li:nth-child(-n + 3) {
  display: block;
}
```

---

> 表格单元格等宽

```css
.calendar {
  table-layout: fixed;
}
```

---

> a 链接没有文本,填入 url

```css
a[href^='http']:empty::before {
  content: attr(href);
}
```

---

> 样式处理横行滚动时，宽度问题

```html
<div class="content">
  <div class="inner">
    <div class="slide-item"></div>
    <div class="slide-item"></div>
    <div class="slide-item"></div>
    <div class="slide-item"></div>
    <div class="slide-item"></div>
  </div>
</div>
```

`.content`是 100%宽度，是固定宽度，也就是手机设备宽度。设置`overflow-x:scroll`让
其可以水平滚动。`.inner`的宽度继承`.content`的宽度，宽度不够情况下，没有办法完全
包裹内部的子元素。我们需要给`.inner`添加`float: left;`目的时让其脱离父级元素文档
流，宽度不再有限制，那么此时宽度是由子元素撑开的。刚开始，我还是用 sass 来计算一
个宽度`width: ($size + $margin *2)*5;`好笨的方法啊。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/overflowX.jpg?imageMogr2/thumbnail/!100p"  data-action="zoom">

```css
/* 或者这样 */
display: flex;
flex-wrap: nowrap;
overflow-x: scroll;
```

---

> 粘性布局做：吸顶条（吸底条）常用作法：在页面打开的时候是 relative 的，向下滑动
> 的时候 fixed 并且 top：0 为零。有新的做法：position: sticky

1.[position: sticky 详解（防坑指南） - flashback - SegmentFault 思否](https://segmentfault.com/a/1190000007183209) 2.[使用 position:sticky 实现粘性布局 - ChokCoco - 博客园](https://www.cnblogs.com/coco1s/p/6402723.html) 3.[JS 解决 position:sticky 的兼容性问题 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000011589375)

## 文本单行居中,多行右对齐且多余省略

1. 文本单行居中 2. 多行右对齐且 3. 多余省略

```css
p {
  text-align: center;
  margin-bottom: 30px;
  display: block;
}

p span {
  display: inline-block;
  text-align: left;
}

p span em {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

```html
<div>
  <p>
    <span
      ><em
        >日前，教育部印发《高等学校人工智能创新行动计划》（简称《计划》），要求推进“新工科”建设，重视人工智能与计算机、控制、数学、统计学、物理学、生物学、心理学、社会学、法学等学科专业教育的交叉融合，形成“人工智能
        +X”复合专业培养新模式，到 2020 年建设 100 个“人工智能
        +X”复合特色专业、建立 50
        家人工智能学院、研究院或交叉研究中心。日前，教育部印发《高等学校人工智能创新行动计划》（简称《计划》），要求推进“新工科”建设，重视人工智能与计算机、控制、数学、统计学、物理学、生物学、心理学、社会学、法学等学科专业教育的交叉融合，形成“人工智能+X”复合专业培养新模式，到
        2020 年建设 100 个“人工智能 +X”复合特色专业、建立 50
        家人工智能学院、研究院或交叉研究中心</em
      ></span
    >
  </p>
  <p>
    <span><em>研究院或交叉研究中心。</em></span>
  </p>
  <p>
    <span
      ><em>日前，教育部印发高等学校人工智能创新行动计划简称计划简称</em></span
    >
  </p>
</div>
```

标签 p 作用：text-align: center 单行居中。标签 span 作用：display:
inline-block;text-align: left; 强制居右对齐。标签 em 作用：display: -webkit-box
使得多余显示省略号。

---

```css
* {
  background-color: rgba(255, 0, 0, 0.2);
}
* * {
  background-color: rgba(0, 255, 0, 0.2);
}
* * * {
  background-color: rgba(0, 0, 255, 0.2);
}
* * * * {
  background-color: rgba(255, 0, 255, 0.2);
}
* * * * * {
  background-color: rgba(0, 255, 255, 0.2);
}
* * * * * * {
  background-color: rgba(255, 255, 0, 0.2);
}
* * * * * * * {
  background-color: rgba(255, 0, 0, 0.2);
}
* * * * * * * * {
  background-color: rgba(0, 255, 0, 0.2);
}
* * * * * * * * * {
  background-color: rgba(0, 0, 255, 0.2);
}
```

## Forgot the `alt` attritube

```css
img[alt=''],
img:not([alt]) {
  border: 5px dashed #c00;
}
```

---

aria-hidden="true"是什么意思 aria 代表什么？

现代的辅助技术能够识别并朗读由 CSS 生成的内容和特定的 Unicode 字符。为了避免 屏
幕识读设备抓取非故意的和可能产生混淆的输出内容（尤其是当图标纯粹作为装饰用途时）
，我们为这些图标设置了 aria-hidden="true" 属性。

残障人士如失明的人使用识读设备（自动读取内容并自动播放出来），播放到带此属性的内
容时会自动跳过，以免残障人士混淆！

---

focus-within `:focus`这个伪类，表示当前元素获取焦点。比如有下面是一个表单

```html
<form>
  <input type="text" />
</form>
```

应用下面的 CSS

```css
input:focus {
  border: blue 1px solid;
}
```

表示该文本框获取焦点的时候，边框变成蓝色。有些时候，我们可能想让文本框获取焦点的
时候，外面的 form 标签也能被选中，并应用上一些样式，那又该怎么实现呢？

我们的原则是，能够用 CSS 的地方就别用 JS，但是现有的选择器好像还没有能够选择到父
元素的。

其实不然，这个时候就该 `:focus-within`出场了，先看代码

```css
form:focus-within {
  background-color: yellow;
}
```

`:focus-within` 是一个伪类，表示自身或自身的某个后代获取焦点，即匹配 :focus，这
些后代也就是我们前面一期讲过的能够获取焦点的元素。这很像 JS 里面的事件冒泡，某个
元素获取焦点，能够将 :focus-within 一直冒泡到 html 标签

我们将 :focus-within 应用到了父元素 form 标签上，所以当子元素 input 获取到焦点的
时候，外层的 form 也就激活了。

当然，:focus-within 还有很多有意思的用法，就等待你的发现了。除了 IE，其它浏览器
对 :focus-within 的支持都还不错。

---

CSS mask 遮罩实现任意颜色的小图标

<img
src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/css-mask-changge-color.jpg"/
width="450px">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>CSS mask遮罩实现任意颜色的小图标实例页面</title>
    <link rel="stylesheet" href="./asset/css/normalize.css" />
    <link rel="stylesheet" href="./style/layout.css" />
  </head>

  <body>
    <section><span class="icon-deleted normal "></span></section>
    <section><span class="icon-deleted colorful"></span></section>
    <section class="black-bg"><span class="icon-deleted white"></span></section>
  </body>
</html>
```

```sass
%icon {
  display: inline-block;
  width: 100px;
  height: 100px;
}

.icon-deleted {
  @extend %icon;
  mask: url("../asset/svg/deleted.svg") no-repeat;
  mask-size: 100% 100%;
}
.normal {
  background-color: #000;
}
.colorful {
  background-color: #f4615c;
}
.white {
  background-color: #fff;
}

.black-bg {
  background-color: #000;
}
```

[CSS 遮罩 CSS3 mask/masks 详细介绍 ](https://www.zhangxinxu.com/wordpress/2017/11/css-css3-mask-masks/)
