## attr( )

> 纯 CSS 的 tooltips

很多网站仍在用 JavaScript 创建 tooltips，但实际上，用 CSS 实现更加简单。最简单的方法是在 HTML 代码的 data 属性中提供 tooltip 文本，比如：data-tooltip="…"。这样就可以在 CSS 中添加以下代码来在 attr() 函数中显示 tooltip 文本了.

属性函数 attr( ),一般情况下，其主要配合 CSS 的伪元素`::before`、`::after` 和`content` 一起使用，可以根据 HTML 元素自定义的属性生成内容。比如 CSS 的提示框就是用这个方式来做的

```html
<span class="tooltip-toggle" aria-label="Sample text for your tooltip!" tabindex="0">
</span>
```

```css
.tooltip-toggle::before {
  content: attr(aria-label);
}
```

> 使用自定义 data 属性和 attr() 函数

```css
.tooltip::after {
  content: attr(data-tooltip);
}
```

## calc( )

> 布局:calc() 实现智能栅格.通过 CSS 预编译器，比如 Sass，利用 calc() 实现一套栅格系统 非常简单，并且易于维护。calc() 的浏览器支持性近乎完美，极力推荐使用。

[A Creative Grid System With Sass and calc() — SitePoint](https://www.sitepoint.com/creative-grid-system-sass-calc/)

<a href="../html/calc-Media-query.html"  target="_blank">查看效果</a>

> CSS calc() 对齐 position:fixed 元素

calc() 函数的另一个使用场景是对齐 fixed 定位的元素。例如，有一个左右均有空隙的 content wrapper，如果想要对 wrapper 内的一个 fixed 元素精准对齐——要算出给“right”或是“left”属性赋值多少是很困难的。用 calc() 可以结合 relative 和 absolute 的值来精准对齐元素：

```css
.wrapper {
  max-width: 1060px;
  margin: 0 auto;
}
.floating-bubble {
  position: fixed;
  right: calc(50% - 530px); /* 50% - half your wrapper width */
}
```

> 计算数字

```css
section {
  width: calc(100% / 3 - 2 * 1em - 2 * 1px);
  font-size: calc(100vw / 35);
  font-size: max(10 * (1vw + 1vh) / 2, 12px);
}
```

## min()或 max()函数

min()或 max()函数分别表示其包含的最小（最负）或最大（最正）值，
clamp()函数表示其中心计算，根据其最小和最大计算。而且这几个函数还可以相互嵌套，
比如：calc(min())、min(calc())、calc(max(min()))和 calc(max())等。
但是建议大家使用的时候还是应该尽量避免嵌套。

```css
.type {
  font-size: max(10 * (1vw + 1vh) / 2, 12px);
}
```

```css
width: min(max(100px * 2, 70vw), 500px);
```

这行代码将会告诉浏览器，尝试将 width 设置为 70vw，但不要低于 200px 或高于 500px。当然你还可以按下面这样的方式设置，达到类似的效果：

```
min(max(minN, midN), maxN);
```

---

1. [CSS Values and Units Module Level 4](https://www.w3.org/TR/css-values-4/#calc-notation)
2. [CSS 中的函数\_w3cplus](https://www.w3cplus.com/css/css-functions.html)
