> 无媒体查询的响应式设计

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/grid-response.gif"/>

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

```html
<div class="container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>
```

```css
.container div {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-size: 16px;
  min-height: 20px;
  line-height: 1;
  color: #414141;
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-template-rows: repeat(2, 50px);
  grid-gap: 5px;
}
```

?> 自适应,是用 `auto-fit` 取代具体固定数量

?> minmax() 函数定义 alue 的范围为 `min ≤ value ≤ max`

这样很完美。minmax() 函数定义大于或等于 min 且小于或等于 max 的大小范围。所以现在列的宽度至少 100px 。但是，如果有更多的可用空间，网格将简单地分配给每个列，因为列的值变成了一个等分单位 1fr ，而不是 100px 。

> 添加图片

我们将在每个网格项内添加一个 img 标签。

```html
<div><img src="img/forest.jpg" /></div>
```

```css
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

为了使图像适合该网格项，我们将它设置为与网格项一样宽和高，然后使用 object-fit: cover;。这将使图片覆盖整个容器，如果需要的话，浏览器会裁剪该图片。

> minmax() Function Works

```css
.grid {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr 1fr;
  /* grid-template-columns: minmax(200px, 50%) 1fr 1fr; */
  /* grid-template-columns: minmax(200px, 1fr) 1fr 1fr; */
  /* grid-template-columns: minmax(max-content, max-content) 1fr 1fr; */
  /* grid-template-columns: minmax(min-content, min-content) 1fr 1fr; */
  /* grid-template-columns: minmax(auto, auto) 1fr 1fr; */
}
```

```javascript
minmax(min, max);
// Length 丨 Percentage丨 Flexible Length丨 max-content丨 min-content丨 auto
```

<!-- <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/responsive-1554176638.gif'/> -->

---

1. [How the minmax() Function Works](https://bitsofco.de/how-the-minmax-function-works/)
