使用 calc()给元素的 border、margin、pading、font-size 和 width 等属性设置动态值。为何说是动态值呢?因为我们使用的表达式来得到的值。不过 calc()最大的好处就是用在流体布局上，可以通过 calc()计算得到元素的宽度。

## calc()能做什么？

calc()能让你给元素的做计算，你可以给一个 div 元素，使用百分比、em、px 和 rem 单位值计算出其宽度或者高度，比如说“width:calc(50% + 2em)”，这样一来你就不用考虑元素 DIV 的宽度值到底是多少，而把这个烦人的任务交由浏览器去计算。

## calc()语法

calc() 语法非常简单，就像我们小时候学加 （+）、减（-）、乘（\*）、除（/）一样

```javascript
width: calc(expression);
```

## calc()运算规则

- 计算方式：四则运算 “+”、“-”、“\*”、“/”
- 计算单位：%、px、em、rem 等，并且可以混合使用各种单位进行计算。
- 表达式中有“+”和“-”时，其前后必须要有空格，widht: calc(12% + 5em)
- 表达式中有“\*”和“/”时，其前后可以没有空格，但建议留有空格。

```html
<body>
  <div class="box">
    <ul class="clear">
      <li />
      <li />
      <li />
    </ul>
  </div>
</body>
```

```css
* {
  padding: 0;
  margin: 0;
}
.clear:after {
  content: '';
  display: block;
  clear: both;
}

.clear {
  zoom: 1;
}
.box {
  width: 100%;
  border: 1px solid #000;
}
.box ul {
  margin-right: -15px;
}
.box ul li {
  float: left;
  height: 40px;
  background: #ff6666;
  border: 5px solid #dac8a7;
  list-style: none;
  width: 33.3333%;
  padding: 10px;
  margin-right: 15px;
  width: calc(33.3333% - (10px + 5px) * 2 - 15px);
}
```

效果如下，响应式的一个网格布局。
![](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/2017-17-10-19-24608495.jpg)

<a href="../html/calc-Media-query.html"  target="_blank">查看效果</a>
