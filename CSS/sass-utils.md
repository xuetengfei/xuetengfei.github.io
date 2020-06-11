> \_clearfix

```css
%clearfix {
  &:after,
  &:before {
    content: ' ';
    display: table;
  }
  &:after {
    clear: both;
  }
}
```

> \_ellipsis

文字溢出省略，仅 webkit 支持多

```css
// 文字溢出省略，仅webkit支持多
@mixin ellipsis($lines) {
  @if ($lines == 1) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: $lines;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }
}
%ellipsis {
  @include ellipsis(1);
}
```

> \_no-scrollbar

```css
%no-scrollbar {
  &::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    opacity: 0 !important;
  }
}
```

> \_one-px-border

```css
%_onepxElement {
  content: '';
  position: absolute;
}

%_onepxTopBottom {
  @extend %_onepxElement;
  left: 0;
  right: 0;
}

%_onepxLeftRight {
  @extend %_onepxElement;
  top: 0;
  bottom: 0;
}

@mixin setDprBorder($direction: tb) {
  @for $i from 1 through 4 {
    @media screen and (-webkit-min-device-pixel-ratio: $i) {
      @if ($direction == tb) {
        transform: scaleY(1 / $i);
      } @else if($direction == lr) {
        transform: scaleX(1 / $i);
      } @else if($direction == full) {
        transform: scale(1 / $i);
      }
    }
  }
}

/*
 * 一像素边框
 * $direction: 边框方向，默认底边框
 * $style: 线条样式，默认solid
 * $color: 边框颜色
 */
@mixin one-px-border($direction: bottom, $style: solid, $color: #e5e5e5) {
  position: relative;
  $border: 1px $style $color;
  @if ($direction == bottom) {
    &:after {
      @extend %_onepxTopBottom;
      @include setDprBorder(tb);
      border-top: $border;
      bottom: 0;
    }
  } @else if ($direction == top) {
    &:before {
      @extend %_onepxTopBottom;
      @include setDprBorder(tb);
      border-top: $border;
      top: 0;
    }
  } @else if ($direction == left) {
    &:before {
      @extend %_onepxLeftRight;
      @include setDprBorder(lr);
      border-left: $border;
      left: 0;
    }
  } @else if ($direction == right) {
    &:after {
      @extend %_onepxLeftRight;
      @include setDprBorder(lr);
      border-left: $border;
      right: 0;
    }
  }
}

// 默认下边框
%one-px-border {
  @include one-px-border();
}

// 四边一像素边框
@mixin full-px-border($color: #e5e5e5, $radius: 0, $zIndex: -1) {
  position: relative;
  z-index: 1;
  &:before {
    content: '';
    position: absolute;
    z-index: $zIndex;
    border: 1px solid $color;
    width: 200%;
    height: 200%;
    border-radius: inherit;
    transform: scale(0.5);
    transform-origin: top left;
    border-radius: $radius * 2;
    left: 0;
    top: 0;
  }
}
%full-px-border {
  @include full-px-border();
}
```

```css
.one-px-border-demo {
  .bottom-border {
    @include one-px-border(bottom, dashed, gold);
    width: 100px;
    margin-top: 10px;
  }
  .full-border {
    @include full-px-border(gold);
    width: 100px;
    margin-top: 10px;
  }
}
```

> \_px2rem

```css
// 去除单位并返回数值
@function strip-units($number) {
  @return $number / ($number * 0 + 1);
}
// px转rem
@mixin px2rem($attr, $num, $base: 37.5) {
  $list: (); //存储所有转换后的值

  // 遍历所有值并转换为rem单位
  @for $i from 1 through length($num) {
    // 计算单个rem值
    $value: strip-units(nth($num, $i)) / $base * 1rem;
    // 添加到列表中
    $list: append($list, $value);
  }

  // 设置属性值
  #{$attr}: $list;
}

@function px2rem($num, $base: 37.5) {
  @return strip-units($num) / $base * 1rem;
}
```

```css
.px-2-rem-demo {
  @include px2rem(height, 400px);
  @include px2rem(width, 200px);
  @include px2rem(padding, 5px 10px);
  margin: px2rem(10px);
}
```

> \_gradient

```css
@mixin background-gradient($start-color, $end-color, $orientation) {
  background: $start-color;

  @if $orientation == 'vertical' {
    background: linear-gradient(to bottom, $start-color, $end-color);
  } @else if $orientation == 'horizontal' {
    background: linear-gradient(to right, $start-color, $end-color);
  } @else {
    background: radial-gradient(ellipse at center, $start-color, $end-color);
  }
}
```

```css
.gradient-demo {
  .vertical {
    margin-top: 10px;
    width: 100px;
    height: 100px;
    border: 1px solid grey;
    @include background-gradient(
      rgba(255, 146, 156, 1),
      rgba(216, 0, 0, 1),
      vertical
    );
  }
  .horizontal {
    margin-top: 10px;
    width: 100px;
    height: 100px;
    border: 1px solid grey;
    @include background-gradient(
      rgba(255, 146, 156, 1),
      rgba(216, 0, 0, 1),
      horizontal
    );
  }
  .radius {
    margin-top: 10px;
    width: 100px;
    height: 100px;
    border: 1px solid grey;
    @include background-gradient(
      rgba(255, 146, 156, 1),
      rgba(216, 0, 0, 1),
      radius
    );
  }
}
```

> \_triangle

```css
@mixin triangle($direction: down, $size: 5px, $color: #f96001) {
  width: 0px;
  height: 0px;
  @if ($direction == left) {
    border-top: $size solid transparent;
    border-bottom: $size solid transparent;
    border-right: $size solid $color;
  } @else if ($direction == right) {
    border-top: $size solid transparent;
    border-bottom: $size solid transparent;
    border-left: $size solid $color;
  } @else if ($direction == down) {
    border-left: $size solid transparent;
    border-right: $size solid transparent;
    border-top: $size solid $color;
  } @else {
    border-left: $size solid transparent;
    border-right: $size solid transparent;
    border-bottom: $size solid $color;
  }
}
```

```css
.triangle-demo {
  margin-top: 10px;
  .left {
    @include triangle(left, 10px);
    margin-bottom: 10px;
  }
  .right {
    @include triangle(right, 10px);
    margin-bottom: 10px;
  }
  .down {
    @include triangle(down, 10px);
    margin-bottom: 10px;
  }
  .up {
    @include triangle(up, 10px);
    margin-bottom: 10px;
  }
}
```
