使用 width,min-width,max-width,calc 来创建一个基于分隔点的宽度变化解决方案.

```css
 {
  min-width: 50%;
  width: calc((300px - 100%) * 1000);
  max-width: 100%;
  /* Change 300px to your breakpoint. */
}
```

<a href="../html/MQ-less.html"  target="_blank">查看效果</a>
