> CSS Grid(网格) 布局（又称为 “Grid(网格)” ），是一个二维的基于网格的布局系统，它的目标是完全改变我们基于网格的用户界面的布局方式。

CSS 一直用来布局我们的网页，但一直以来都存在这样或那样的问题。一开始我们用表格（table），然后是浮动（float），再是定位（postion）和内嵌块（inline-block），但是所有这些方法本质上都是只是 hack 而已，并且遗漏了很多重要的功能（例如垂直居中）。Flexbox 的出现很大程度上改善了我们的布局方式，但它的目的是为了解决更简单的一维布局，而不是复杂的二维布局（实际上 Flexbox 和 Grid 能协同工作，而且配合得非常好）。Grid(网格) 布局是第一个专门为解决布局问题而创建的 CSS 模块。

## 网格容器(Grid Container) 网格项(Grid Item)

在这个例子中，container 就是 网格容器(Grid Container)。
网格容器（Grid Container）的子元素（例如直接子元素）。这里 item 元素就是网格项(Grid Item)，但是 sub-item 不是。

```html
<div class="container">
  <div class="item"></div>
  <div class="item"><p class="sub-item"></p></div>
  <div class="item"></div>
</div>
```

## 提前说明

方便测试，我设置所有`div`样式

```css
div {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-size: 16px;
  min-height: 20px;
  line-height: 1;
}
```

## 指定 列(columns) 行(rows)

```css
.container1 {
  display: grid;
  grid-template-columns: 40px 50px auto 50px 40px;
  grid-template-rows: 25% 100px auto;
}
```

<img src ='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/gird-layout.jpg' width="600px"/>

<img src='https://newimg88.b0.upaiyun.com/newimg88/2018/12/template-columns-rows-01.svg'/ width='400px'>
如果你的定义包含多个重复值，则可以使用 repeat() 表示法来简化定义：

```css
.container2 {
  display: grid;
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: 25% 100px auto;
}
```

<img src ='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/grid-repeat.jpg' width="600px"/>

## grid-column-gap / grid-row-gap / grid-gap

指定网格线(grid lines)的大小。你可以把它想象为设置列/行之间间距的宽度。

注意：这两个属性将删除 grid- 前缀，就是将 grid-column-gap 和 grid-row-gap 重命名为 column-gap 和 row-gap。 Chrome 68+，Safari 11.2 Release 50+ 和 Opera 54+ 已经支持无前缀的属性。

```css
.container3 {
  display: grid;
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: 25% 100px auto;
  grid-column-gap: 10px;
  grid-row-gap: 15px;
}
```

<img src ='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/gird-gap.jpg' width="600px"/>

?> `grid-gap` 是 `grid-column-gap / grid-row-gap` 合并简写写法.
`grid-gap: <grid-row-gap> <grid-column-gap>;`

```css
.container3 {
  display: grid;
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: 25% 100px auto;
  /* 
    grid-column-gap: 10px;
    grid-row-gap: 15px;       等价于    grid-gap: 15px 10px;
   */
  grid-gap: 15px 10px;
}
```

注意：这个属性将删除 grid- 前缀，就是将 grid-gap 重命名为 gap。 Chrome 68+，Safari 11.2 Release 50+ 和 Opera 54+ 已经支持无前缀的属性。

## justify-items

?> justify-items 描述的是 每一个网格内，网格项(Grid Item)在 行(row)方向对齐的方式，适用于容器内的所有网格项。

```css
.container {
  justify-items: start | end | center | stretch (默认值);
}
```

- start：将网格项对齐到其单元格的左侧起始边缘（左侧对齐）
- end：将网格项对齐到其单元格的右侧结束边缘（右侧对齐）
- center：将网格项对齐到其单元格的水平中间位置（水平居中对齐）
- stretch：填满单元格的宽度（默认值）

这些行为也可以通过每个单独网格项(grid items) 的 justify-self 属性设置。

## align-items

?> align-items 描述的是 每一个网格内，网格项(Grid Item)在 列(column)方向对齐的方式，适用于容器内的所有网格项。

```css
.container {
  align-items: start | end | center | stretch (默认值);
}
```

这些行为也可以通过每个单独网格项(grid items) 的 align-self 属性设置。

## place-items

?> place-items 是设置 align-items 和 justify-items 的简写形式。

```css
place-items: <align-items> <justify-items>;
```

第一个值设置 align-items 属性，第二个值设置 justify-items 属性。
如果省略第二个值，则将第一个值同时分配给这两个属性。

## justify-content

```html
<div class="container">
  <div class="item"></div>
  <div class="item"><p class="sub-item"></p></div>
  <div class="item"></div>
</div>
```

假设 `container` 宽度为 500px ,三个 `<div class="item"></div>`宽度为 100px,那么网格项总宽度小于网格容器`container`

在这种情况下，您可以设置网格容器内的网格的对齐方式。 此属性沿着 inline（行）轴线对齐网格（相反的属性是 align-content ，沿着 block（列）轴线对齐网格）。

用法和 flexbox 里面的 justify-content 一样的。

```css
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

start：将网格对齐到 网格容器(grid container) 的左侧起始边缘（左侧对齐）

end：将网格对齐到 网格容器 的右侧结束边缘（右侧对齐）

center：将网格对齐到 网格容器 的水平中间位置（水平居中对齐）

stretch：调整 网格项(grid items) 的宽度，允许该网格填充满整个 网格容器 的宽度

space-around：在每个网格项之间放置一个均匀的空间，左右两端放置一半的空间

space-between：在每个网格项之间放置一个均匀的空间，左右两端没有空间

space-evenly：在每个网格项目之间放置一个均匀的空间，左右两端放置一个均匀的空间

## align-content

align-content ，沿着 block（列）轴线对齐网格

```css
.container {
  align-content: start | end | center | stretch | space-around | space-between |
    space-evenly;
}
```

## place-content

place-content 是设置 align-content 和 justify-content 的简写形式。

```css
place-content: <align-content> <justify-content>;
```

第一个值设置 align-content 属性，第二个值设置 justify-content 属性。如果省略第二个值，则将第一个值同时分配给这两个属性。

## grid-auto-flow

?> 描述网格项排序方式:默认是`Z`字排序

如果你有一些没有明确放置在网格上的网格项(grid items)，自动放置算法 会自动放置这些网格项。该属性控制自动布局算法如何工作。

```css
.container {
  grid-auto-flow: row （默认） | column | row dense | column dense;
}
```

- row：告诉自动布局算法依次填充每行，根据需要添加新行 （默认）`Z`字排序
- column：告诉自动布局算法依次填入每列，根据需要添加新列 `Ɯ`字排序
- dense：告诉自动布局算法在稍后出现较小的网格项时，尝试填充网格中较早的空缺

请注意，dense 只会更改网格项的可视顺序，并可能导致它们出现乱序，这对可访问性不利。

```css
.container6 {
  display: grid;
  height: 300px;
  grid-template-columns: repeat(6, 100px);
  grid-template-rows: 50px 150px auto;
  grid-auto-flow: column;
}
```

<img src ='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/grid-auto-flow.jpg' width="600px"/>

## grid

在一个声明中设置所有以下属性的简写： grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, 和 grid-auto-flow 。（注意：您只能在单个网格声明中指定显式或隐式网格属性）。

[grid Syntax | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid#Syntax)属性顺序问题 特别容易出错。

```css
.container {
  grid: 100px 300px / 3fr 1fr;
}
```

等价

```css
.container {
  grid-template-rows: 100px 300px;
  grid-template-columns: 3fr 1fr;
}
```

## 子元素 网格项(Grid Items) 属性

!> float，display: inline-block，display: table-cell，vertical-align 和 column-\* 属性对网格项无效。

```css
.item {
  grid-column-start: <number> | <name> | span <number> | span <name> | auto
  grid-column-end: <number> | <name> | span <number> | span <name> | auto
  grid-row-start: <number> | <name> | span <number> | span <name> | auto
  grid-row-end: <number> | <name> | span <number> | span <name> | auto
}
```

- <line> ：可以是一个数字引用一个编号的网格线，或者一个名字来引用一个命名的网格线
- span <number> ：该网格项将跨越所提供的网格轨道数量
- span <name> ：该网格项将跨越到它与提供的名称位置
- auto：表示自动放置，自动跨度，默认会扩展一个网格轨道的宽度或者高度

```css
.item-a {
  grid-column-start: 2;
  grid-column-end: five;
  grid-row-start: row1-start
  grid-row-end: 3;
}
```

<img src ='https://newimg88.b0.upaiyun.com/newimg88/2018/12/grid-column-row-start-end-01.svg'>

```css
.item-b {
  grid-column-start: 1;
  grid-column-end: span col4-start;
  grid-row-start: 2
  grid-row-end: span 2
}
```

<img src='https://newimg88.b0.upaiyun.com/newimg88/2018/12/grid-column-row-start-end-02.svg'>

#### 实现一个九宫格布局

```html
<div class="container11">
  <div class="aaa">11-1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>
```

```css
.container11 {
  width: 300px;
  height: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: column;
  .aaa {
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 3;
    background-color: rgba(0, 128, 0, 0.472);
  }
}
```

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/nine-layout.jpg"/ width='400px'>

## justify-self

```css
.item {
  justify-self: start | end | center | stretch （默认值）;
}
```

<img src='https://newimg88.b0.upaiyun.com/newimg88/2018/12/justify-self-start.svg'>

## align-self

```css
.item {
  align-self: start | end | center | stretch （默认值）;
}
```

<img src='https://newimg88.b0.upaiyun.com/newimg88/2018/12/align-self-start.svg'>

## place-self

place-self 是设置 align-self 和 justify-self 的简写形式。

---

1. [CSS Grid 图解](https://www.css88.com/archives/8510#prop-grid)
2. [CSS3 Flexbox 图解](https://www.css88.com/archives/8629)
3. [如何使用 CSS Grid 快速而又灵活的布局](https://www.css88.com/archives/8512)
4. [5 分钟学会 CSS Grid 布局](https://www.css88.com/archives/8506)
5. [从零开始学 CSS Grid 布局 – F2EX](http://f2ex.cn/css-grid-layout-guide/)
6. [horseshoe/flex.md at master · veedrin/horseshoe](https://github.com/veedrin/horseshoe/blob/master/flex/flex.md)
