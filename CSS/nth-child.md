## :nth-child(1)

```css
p:nth-child(1) {
  color: red;
}
```

表示获取在兄弟元素中的位置为 1 的 `<p>`标签。

## 大于等于某个位置

`:nth-child(n+4)` 表示大于等于第 4 个位置。

```javascript
:nth-child(n+a)
```

## 小于等于某个位置

`:nth-child(-n+4)` 表示小于等于第 4 个位置，[1, 2, 3 ,4]

```javascript
:nth-child(-n+a)
```

## 选择一个区间

获取第 3 个到 第 7 个位置

```css
p:nth-child(n + 3):nth-child(-n + 7) {
  ...;
}
```

#### odd

奇数位，`:nth-child(odd)` 等价于 `:nth-child(2n+1)`

#### even

偶数位，`:nth-child(even)` 等价于`:nth-child(2n)`

---

:nth-child 一直是一个容易用错的伪类，选择出的结果往往会莫名其妙，不太好理解。比如有下面的 HTML 结构：

```html
<div>
  <span class="s1">txt1</span>
  <p class="p2">txt2</p>
  <p class="p3">txt3</p>
  <span class="s2"> <p class="p4">txt4</p> </span>
</div>
```

应用如下的 CSS

```css
p:nth-child(1) {
  color: blue;
}
p:nth-child(2) {
  color: red;
}
```

请问，哪些文本是蓝色，哪些文本是红色？你能回答出来吗？你是不是想说 txt2 是蓝色，txt3 是红色，因为 .p2 是第 2 个 p 标签嘛。

接下来我们就一步一步解析 :nth-child 是如何做选择的。

###### 1、确定区域

首先以当前元素的父元素为基准，找到所有的兄弟元素，形成一个要处理的数组。注意，兄弟元素并非同一类元素，而是和当前元素在一个层级（即拥有同一个父元素）的元素。

这里的 p 选择器实际上有两个区域，[.s1, .p2, .p3, .s2] 为一个区域，孤独的 [.p4] 为一个区域。

###### 2、排序选择

然后按照兄弟元素的先后位置排序，选择第 n 个为 p 的标签。注意，排序是从 1 开始，不是 0。

所以，p:nth-child(1) 的意思是选择第一个兄弟元素，并且该标签是 `<p>`（划重点）。因此 .s1 是不满足 p:nth-child(1) 的，因为它不是 p 标签，只有 .p4 满足。

p:nth-child(2) 自然就匹配到了 .p2，所以结果是

```html
<div>
  <span class="s1">nomral</span>
  <p class="p2">红色</p>
  <p class="p3">nomral</p>
  <span class="s2"> <p class="p4">蓝色</p> </span>
</div>
```

如果再加上下面的 CSS

```css
.p3:nth-child(3) {
  color: green;
}
```

那么 txt3 就变了绿色，并且，这里只能是 3，换成其它任何数字都不行，因为 .p3 确实就是排在当前兄弟元素的第 3 个。

总结
从上面的例子我们可以总结出，:nth-child 实际上是一个 and 选择器，需要同时满足前后两个条件。p:nth-child(2) 表示匹配的元素必须是 `<p>`标签，并且必须在兄弟元素的第 2 个位置上。
