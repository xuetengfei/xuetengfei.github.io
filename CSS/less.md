# less

```css
.mixin() {
  @unique: 45;
}

#call-mixin {
  variable-value: @unique;
  .mixin();
}

.mixin() {
  @clash: 45;
  @unique: 45;
}

#call-mixin2 {
  @clash: 0;
  unique: @unique;
  clash: @clash;
  .mixin();
}
```

```css
#call-mixin {
  variable-value: 45;
}
#call-mixin2 {
  unique: 45;
  clash: 0;
}
```

---

> +\_ 代表的是 空格；+ 代表的是 逗号。

```css
.boxShadow() {
  box-shadow+: inset 0 0 10px #555;
}
.main {
  .boxShadow();
  box-shadow+: 0 0 20px black;
}
```

```css
.main {
  box-shadow: inset 0 0 10px #555, 0 0 20px black;
}
```

```css
.Animation() {
  transform+_: scale(2);
}
.main {
  .Animation();
  transform+_: rotate(15deg);
}
```

```css
.main {
  transform: scale(2) rotate(15deg);
}
```

---

```css
.average(@x, @y) {
  @average: ((@x + @y) / 2);
}

div {
  .average(20px, 50px); // 调用 方法
  padding: @average; // 使用返回值
}
```

```css
div {
  padding: 35px;
}
```

---

```css
.animation {
  transition: all 0.3s ease-out;
  .hide {
    transform: scale(0);
  }
}
#main {
  &:extend(.animation);
}
#con {
  &:extend(.animation .hide);
}
```

```css
.animation,
#main {
  transition: all 0.3s ease-out;
}
.animation .hide,
#con {
  transform: scale(0);
}
```

---

```css
each(range(10),{
    .span@{value} { width: @value * 1%; }
});
```

```css
.span1 {
  width: 1%;
}
.span2 {
  width: 2%;
}
.span3 {
  width: 3%;
}
.span4 {
  width: 4%;
}
.span5 {
  width: 5%;
}
.span6 {
  width: 6%;
}
.span7 {
  width: 7%;
}
.span8 {
  width: 8%;
}
.span9 {
  width: 9%;
}
.span10 {
  width: 10%;
}
```

---

```css
each(range(1px, 10px, 1), {
  .mb@{index} {
		margin-bottom:@value;
  }
});
```

```css
.mb1 {
  margin-bottom: 1px;
}
.mb2 {
  margin-bottom: 2px;
}
.mb3 {
  margin-bottom: 3px;
}
.mb4 {
  margin-bottom: 4px;
}
.mb5 {
  margin-bottom: 5px;
}
.mb6 {
  margin-bottom: 6px;
}
.mb7 {
  margin-bottom: 7px;
}
.mb8 {
  margin-bottom: 8px;
}
.mb9 {
  margin-bottom: 9px;
}
.mb10 {
  margin-bottom: 10px;
}
```

---

```css
@colors: #ed5565, #a0d468, #f6bb42, #5d9cec;
@names: error, success, attention, info;
@length: length(@colors);

.alert-variation(@names; @colors; @index)
  when
  (iscolor(extract(@colors, @index)))
  and
  (@index > 0) {
  .alert-variation(@names; @colors; (@index - 1)); // decrement.
  @name: extract(@names, @index);
  @color: extract(@colors, @index);
  .alert-@{name} {
    border-color: darken(@color, 10%);
    color: darken(@color, 30%);
    background-color: @color;
  }
}

.alert-variation(@names; @colors; @length);
```

```css
.alert-error {
  border-color: #e8273b;
  color: #99101f;
  background-color: #ed5565;
}
.alert-success {
  border-color: #87c940;
  color: #537f24;
  background-color: #a0d468;
}
.alert-attention {
  border-color: #f4a911;
  color: #986807;
  background-color: #f6bb42;
}
.alert-info {
  border-color: #2f80e7;
  color: #12509e;
  background-color: #5d9cec;
}
```

---

1. [Less Preview (online playground)](https://lesscss.org/less-preview/#eyJjb2RlIjoiZWFjaChyYW5nZSgxcHgsIDEwcHgsIDEpLCB7XG4gIC5tYkB7aW5kZXh9IHtcblx0XHRtYXJnaW4tYm90dG9tOkB2YWx1ZTtcbiAgfVxufSk7IiwiYWN0aXZlVmVyc2lvbiI6IjQuMS4zIn0=)
