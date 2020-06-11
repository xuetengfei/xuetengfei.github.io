下面这样 sass 设计模式，可以解决 Sass 媒体查询的重复问题。各个组件的样式里面包含了该组件在不同断点的样式，比如下面所示的`banner.scss`里面的**@mixin banner--sm**声明的那样。然后，项目全局只有一个`media-queries.scss`文件，引入各个组件的样式，并且在不同断点处，**@include** 之前声明好的**@mixin**。

```md
.
├── sass
├── banner.scss
├── header.scss
└── media-queries.scss
```

`banner.scss`

```scss
.banner {
  text-align: center;
  font-size: 20px;
  background-color: rgb(240, 162, 162);
}

@mixin banner--sm() {
  .banner {
    font-size: 20px;;
  }
}
@mixin banner--md() {
  .banner {
    font-size: 40px;
  }
}
```

`media-queries.scss`

```scss
@import './banner.scss';
@import './header.scss';

/* small screen size (sm) */
@media (min-width: 500px) {
  @include banner--sm();
  @include header--sm();
}

/* medium screen size (md) */
@media (min-width: 900px) {
  @include banner--md();
  @include header--sm();
}
```

编译后，生成的媒体查询样式文件:`media-queries.css`

```css
@charset "UTF-8";
.banner {
  background-color: #f0a2a2;
}
.banner,
.header {
  text-align: center;
  font-size: 20px;
}
.header {
  background-color: #eee;
}
@media (min-width: 500px) {
  .banner {
    font-size: 20px;;
  }
  .header {
    font-size: 30px;;
  }
}
@media (min-width: 900px) {
  .banner {
    font-size: 40px;
  }
  .header {
    font-size: 30px;;
  }
}
/*# sourceMappingURL=/0016-sass-media-queries.9294c4fe.css.map */
```

在每个断点处会调用很多个 mixin，这样编译后的 CSS 文件就不会变得臃肿，也很清楚所有的响应式样式片段在什么地方.  
而且可以在媒体查询区域寻找元素，如果没有，那么这个元素不会对任何的断点作出响应

## sass 的 mixin 用法

```sass
@mixin font-size($n) {
  font-size: $n * 1.2em;
}
body {
  @include font-size(2);
}
```

---

1. [解决 Sass 媒体查询的重复问题](https://www.w3cplus.com/preprocessor/the-solution-to-media-queries-in-sass.html)
