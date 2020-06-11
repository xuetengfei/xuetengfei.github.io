Shadow DOM 听说过么

```html
<input type="range" />
```

然后在 Chrome 中打开开发者工具，在设置中勾选 Show user agent shadow DOM 选项，看一下 Elements 文档结构

```html
<input type="range">
  #shadow-root (user-agent)
  <div>
    <div pseudo="-webkit-slider-runnable-track" id="track">
      <div id="thumb" />
    </div>
  </div>
</input>
```

很奇怪，我们只写了一个 input 标签，为什么会多出来这么多 div 呢？唯一的解释就是，这些标签都是浏览器帮我们自动加上的。

细心的同学可能会发现新加的标签上面有一个标识 shadow-root (user-agent)，这些标签也就是所谓的 Shadow DOM （影子 DOM），字面意思理解就是，看不见摸不着的 DOM，无法直接操作。

那么浏览器为什么要这么做呢？很明显是想让我们在写代码的时候更简单，如果你再试一下下面的代码

```html
<video controls="">
  <source src="https://mdn.mozillademos.org/files/2587/AudioTest%20(1).ogg" type="audio/ogg">
</video
```

会发现多了太多的标签了，所以，实际上浏览器是对某些复杂的标签做了一层类似组件的封装，把我们可能无需关心的部分都隐藏起来了，使用的时候就少了很多代码。

我们会发现在上面滑块的 Shadow DOM 里面有 pseudo 这样的属性

```html
<div pseudo="-webkit-slider-runnable-track" id="track">
```

因此，我们可以通过 CSS 选中该元素，然后修改其样式

```css
input::-webkit-slider-runnable-track {
  background-color: red;
}
```

可以发现，整个滑块背景都变成了红色。当然，这也许并非是我们想要的效果，但这确实是该 Shadow DOM 开放给我们选择的，而且虽然很多浏览器都支持 Shadow DOM，但是目前只有 Chrome 支持对其审查和附加选择器。

除了原生的 Shadow DOM，我们可不可以创建自己的呢？比如有下面的一个 div 标签，我们想为他加上 Shadow DOM 使其更加强大

```html
<div id="box" />
```

其实是有这样一组 API 来实现的，通过 `attachShadow()` 方法为元素挂载一个 Shadow DOM

```javascript
var ele = document.querySelector('#box');
var shadow = ele.attachShadow({
  mode: 'open',
});
```

这里的 mode 用来指定 Shadow DOM 封装的模式，可取值有

open 开放的封装模式
closed 关闭的封装模式
看上去好像没什么变化，继续下面的代码

```javascript
shadow.innerHTML = '<p>This is a Shadow DOM</p>';
```

可以看到页面出现了上面的文本，该标签的结构变成了

```html
<div id="box">
  #shadow-root (open)
  <p>This is a Shadow DOM</p>
</div>
```

证明我们确实是通过 attachShadow() 方法成功为某个元素创建了 Shadow DOM。

如果想加样式，可以通过下面的方式来实现

```javascript
shadow.innerHTML += '<style>p { color: red; }</style>';
```

Shadow DOM API 其实是 Web Components 的一部分，用来封装组件的 DOM 和 CSS，区别于 Vue.js 这样的组件化框架，Web Components 是浏览器原生的组件化方式，不过目前还处于初期，只有 Chrome 和 Safari 极少数浏览器支持。
