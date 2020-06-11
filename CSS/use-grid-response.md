使用 CSS Grid(网格) 布局来创建一个超酷的图像网格，它会根据屏幕的宽度改变列的数量，以实现响应式布局。

添加一行 CSS 代码即可实现响应式布局。

这意味着我们不必通过丑陋的类名（即 col-sm-4，col-md-8）来混淆 HTML ，或者为每一个屏幕尺寸创建媒体查询。

效果如下

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/grid-response.gif"/>

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

## 添加图片

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

---

1 .[使用 Grid 实现的响应式布局 一行 CSS 代码实现](https://www.css88.com/archives/8706)
