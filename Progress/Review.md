


### Chrome

```javascript
Chrome F12 中有一个很多同学都不知道的功能，审查元素并切换到 Styles 面板中，
按住 Ctrl 键，移到某个样式属性的值（出现下划线），然后点击即可导航到定义该样式属性的 CSS 文件中
```

```javascript
Chrome 开发者工具已支持在选中的元素上按下 h 键快速隐藏该元素（如果你不想按 Del 键直接删除该元素的话）
```

### JS 的 some() 是用来检测数组中是否存在满足某些条件的元素。

比如下面的例子是检测数组中是否有大于 10 的数的多种实现方式

```javascript
let arr = [2, 5, 8, 1, 4];

// filter 实现
let result =
  arr.filter(item => {
    return item > 10;
  }).length > 0;

// find 实现
let result =
  arr.find(item => {
    return item > 10;
  }) !== undefined;

// some 实现
let result = arr.some(item => {
  return item > 10;
});
```

可见 some 的实现方式是最简单的，JS 提供了多个集合处理的方法，我们一定要在适合的场景使用对应的方法

### 元素结构是怎么渲染的

想知道页面中的元素结构是怎么渲染的吗？只需要加入如下的样式即可

```css
* {
  outline: 4px solid yellow;
}
```

### npmplease

```javascript
alias npmplease="rm -rf node_modules/ && rm -f package-lock.json && npm install"
```

---

### 写注释

```javascript
// -> 用于显示表达式的结果。 例如：
1 + 1; // -> 2

// > 意思是 console.log 或其他输出的结果。 例如：
console.log('hello, world!'); // > hello, world!

// 只是一个解释的评论。 例：
// Assigning a function to foo constant
const foo = function() {};
```
