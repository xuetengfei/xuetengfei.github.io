> 如何实现一个主题切换功能？

比如:我们有黑白两个主题，怎么切换呢？常规的做法是：编写两套 css 主题文件，然后借助 JS 来切换加载。可以使用 CSS 变量来实现我们的功能。

### CSS 变量用法

定义变量使用**--AttributeName**，使用变量需要用到**var(--AttributeName)**. css 变量分为：**局部变量**和**全局变量**

#### 局部变量:适用范围是当前元素及其子元素。

```css
.div {
  --color: #ddd;
  background-color: var(--color);
}
```

#### 全局变量:适用于所有的元素。

```css
/* 在外部的伪类`:root{}`中定义 */
:root {
  --color: #ff0;
}

/* 使用 */
span {
  color: var(--color);
}
```

还是需要主要的是：层叠的优先级的问题。当前元素的自定义元素会覆盖祖先元素(包括全局元素)

### 切换函数

切换主题颜色。首先定义一个全局样式

```css
:root {
  --black: #000;
  --white: #fff;
}
```

```javascript
function swithTheme(theme) {
  let _root = document.documentElement.style;
  _root.setProperty('--black', theme.black);
}

swithTheme({ black: '#ddd' });
```

兼容性:移动端完全适用，pc 端根据自己的需求来决定，查询 Can I Use

### 在项目中结合 less 使用

```css
/* background-color: var(--color, #8cacea); 定义 CSS 变量出来,添加默认值。 */
.wrap {
  padding: 100px;
}
.BlueContent {
  width: 100px;
  height: 100px;
  color: #fff;
  background-color: var(--color, #8cacea);
  border: 3px solid #666;
}

.RedContent {
  &: extend(.BlueContent);
  --color: red;
}
```

<!-- <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/CssVariable-1556355403.jpg'/> -->
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/css-varible-1574387671.jpg'/>

---

1. [关于 CSS 变量](https://www.zcfy.cc/article/everything-you-need-to-know-about-css-variables#)
